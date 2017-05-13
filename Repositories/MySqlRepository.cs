using System;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

using WesternPlains.App.Models;

using WesternPlains.App.Exceptions;

using static BCrypt.Net.BCrypt;
using static WesternPlains.App.Extensions.Utilities;

using Microsoft.Extensions.Configuration;
using WesternPlains.App.Adapters;

namespace WesternPlains.App.Repositories
{
    public class MySqlRepository: IDatabaseRepository
    {
        #region Fields
        // public static string MYSQL_CONN = "server=localhost;user=westernplains;password=Welcome1;database=westernplains;port=3306";
        private MySqlConnection _conn;

        private const string ALL_USERS = "SELECT * FROM `user_info`";
        private const string INSERT_ANNOUNCEMENT = "INSERT INTO `announcements` VALUES (NULL, @Timestamp, @Text, @Category, @UserID)";
        private const string GET_USER_INFO = "SELECT * FROM `user_info` WHERE `Username` = @uname";
        private const string ANNOUNCEMENT_INFO = "SELECT * FROM `all_announcements_with_users`";
        private const string ALL_ROLES = "SELECT * FROM `roles`";
        private const string USER_INFO_FROM_ID = "SELECT * FROM `user_info` WHERE `User_ID` = @id";
        private const string GET_PRIVILEGES_FROM_ROLE = "SELECT * FROM `privileges_and_roles` WHERE `Role_Name`=@role";
        private const string UPDATE_USER_INFO = "update_user_info";
        private const string ADD_USER_ACTION = "Add_User_Action";
        private const string GET_ACTIONS_FOR_USER = "get_actions_for_user";
        #endregion

        #region Constructors
        public MySqlRepository(IConfigurationRoot config)
        {
            _conn = new MySqlConnection(config["Data:ConnectionString"]);
            _conn.Open();
        }
        #endregion

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // Dispose managed state (managed objects).
                    _conn?.Dispose();
                }

                disposedValue = true;
            }
        }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
        }

        #endregion

        public int AddAnnouncement(Announcement announcement)
        {
            ThrowIfArgumentNull(announcement, nameof(announcement));

            var sql = INSERT_ANNOUNCEMENT;

            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();
                BindNewAnnouncement(command, announcement);

                return command.ExecuteNonQuery();
            }
        }

        public async Task<int> AddAnnouncmentAsync(Announcement announcement)
        {
            ThrowIfArgumentNull(announcement, nameof(announcement));

            var sql = INSERT_ANNOUNCEMENT;

            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();
                BindNewAnnouncement(command, announcement);

                return await command.ExecuteNonQueryAsync();
            }
        }

        public int AddUser(User user, string password)
        {
            ThrowIfArgumentNull(user, nameof(user));
            ThrowIfArgumentNull(password, nameof(password));

            var salt = GenerateSalt();
            var hash = HashPassword(password, salt);
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "Employee";
            }

            var sql = "Add_User";
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                BindNewUser(command, user, hash, salt);
                return command.ExecuteNonQuery();
            }
        }

        public async Task<int> AddUserAsync(User user, string password)
        {
            ThrowIfArgumentNull(user, nameof(user));
            ThrowIfArgumentNull(password, nameof(password));

            var salt = GenerateSalt();
            var hash = HashPassword(password, salt);
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "Employee";
            }

            var sql = "Add_User";
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                BindNewUser(command, user, hash, salt);
                return await command.ExecuteNonQueryAsync();
            }
        }

        public User AuthenticateCredentials(string username, string password)
        {
            ThrowIfArgumentNull(username, nameof(username));
            ThrowIfArgumentNull(password, nameof(password));

            var sql = GET_USER_INFO;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();
                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@uname",
                    DbType = DbType.String,
                    Value = username
                });
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.HasRows)
                    {
                        throw new AuthenticationException();
                    }
                    var adapter = new MySqlReaderAdapter(reader);
                    if (!adapter.Read())
                    {
                        throw new AuthenticationException();
                    }
                    var user = CreateUserFromReader(adapter);
                    var hash = adapter.GetString("Password_Hash");
                    if (!Verify(password, hash))
                    {
                        throw new AuthenticationException();
                    }

                    return user;
                }
            }
            
        }

        public Announcement CreateAnnouncementFromReader(IReaderAdapter reader)
        {
            ThrowIfArgumentNull(reader, nameof(reader));

            var text = reader.GetString("Text");
            var timestamp = reader.GetDateTime("Timestamp");
            var category = reader.GetString("Category");
            var user = CreateUserFromReader(reader);
            var announcement = Announcement.Create(timestamp, user, text, category);

            return announcement;
        }

        public User CreateUserFromReader(IReaderAdapter reader)
        {
            ThrowIfArgumentNull(reader, nameof(reader));

            var id = reader.GetInt("User_ID");
            var username = reader.GetString("Username");
            var firstName = reader.GetString("First_Name");
            var lastName = reader.GetString("Last_Name");
            var role = reader.GetString("Role");
            var email = reader.GetString("Email");
            return new User(id, firstName, lastName, username, role, email);
        }

        public IEnumerable<Announcement> GetAllAnnouncements()
        {
            var sql = ANNOUNCEMENT_INFO;
            using (var command = new MySqlCommand(sql, _conn))
            using (var reader = command.ExecuteReader())
            {
                var adapter = new MySqlReaderAdapter(reader);
                while (adapter.Read())
                {
                    yield return CreateAnnouncementFromReader(adapter);
                }
            }
        }

        public async Task<IEnumerable<Announcement>> GetAllAnnouncementsAsync()
        {
            var sql = ANNOUNCEMENT_INFO;
            using (var command = new MySqlCommand(sql, _conn))
            using (var reader = await command.ExecuteReaderAsync())
            {
                var adapter = new MySqlReaderAdapter(reader);
                var announcements = new List<Announcement>();
                while (adapter.Read())
                {
                    announcements.Add(CreateAnnouncementFromReader(adapter));
                }

                return announcements;
            }
        }

        public IEnumerable<User> GetAllUsers()
        {
            var sql = ALL_USERS;
            using (var command = new MySqlCommand(sql, _conn))
            using (var reader = command.ExecuteReader())
            {
                var adapter = new MySqlReaderAdapter(reader);
                while (reader.Read())
                {
                    yield return CreateUserFromReader(adapter);
                }
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var sql = ALL_USERS;
            using (var command = new MySqlCommand(sql, _conn))
            using (var reader = command.ExecuteReader())
            {
                var adapter = new MySqlReaderAdapter(reader);
                var users = new List<User>();
                while (await adapter.ReadAsync())
                {
                    users.Add(CreateUserFromReader(adapter));
                }

                return users;
            }
        }

        public User GetUserFromId(int id)
        {
            var sql = USER_INFO_FROM_ID;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();

                command.Parameters.Add(id);
                using (var reader = command.ExecuteReader())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    if (reader.Read())
                    {
                        return CreateUserFromReader(adapter);
                    }
                    else
                    {
                        throw new UserNotFoundException(id);
                    }
                }
            }
        }

        public async Task<User> GetUserFromIdAsync(int id)
        {
            var sql = USER_INFO_FROM_ID;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();

                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@id",
                    DbType = DbType.Int32,
                    Value = id
                });

                using (var reader = await command.ExecuteReaderAsync())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    if (await reader.ReadAsync())
                    {
                        return CreateUserFromReader(adapter);
                    }
                    else
                    {
                        throw new UserNotFoundException(id);
                    }
                }
            }
        }

        public async Task<int> UpdateUserAsync(User user)
        {
            ThrowIfArgumentNull(user, nameof(user));

            var sql = UPDATE_USER_INFO;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                BindUpdateUser(command, user);
                return await command.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> ResetPasswordAsync(User user, string hash, string salt)
        {
            ThrowIfArgumentNull(user, nameof(user));
            ThrowIfArgumentNull(hash, nameof(hash));
            ThrowIfArgumentNull(salt, nameof(salt));

            var sql = "UPDATE `user` SET `Password_Hash`=@hash, `Password_Salt`=@salt WHERE `User_ID`=@id";

            using (var command = new MySqlCommand(sql, _conn))
            {
                command.Prepare();

                command.Parameters.AddRange(new MySqlParameter[]
                {
                    new MySqlParameter
                    {
                        ParameterName = "@id",
                        DbType = DbType.Int32,
                        Value = user.Id
                    },
                    new MySqlParameter
                    {
                        ParameterName = "@hash",
                        DbType = DbType.String,
                        Value = hash
                    },
                    new MySqlParameter
                    {
                        ParameterName = "@salt",
                        DbType = DbType.String,
                        Value = salt
                    }
                });

                return await command.ExecuteNonQueryAsync();
            }
        }

        public int StoreSession(Session session)
        {
            ThrowIfArgumentNull(session, nameof(session));

            var sql = "Store_Session";

            using (var command = new MySqlCommand(sql, _conn))
            {
                BindStoreSession(command, session);

                return command.ExecuteNonQuery();
            }
        }

        public async Task<int> StoreSessionAsync(Session session)
        {
            ThrowIfArgumentNull(session, nameof(session));

            var sql = "Store_Session";

            using (var command = new MySqlCommand(sql, _conn))
            {
                BindStoreSession(command, session);

                return await command.ExecuteNonQueryAsync();
            }
        }

        // TODO: Remove these, since we're having ASP to handle the sessions in memory
        private static void BindStoreSession(MySqlCommand command, Session session)
        {
            ThrowIfArgumentNull(command, nameof(command));
            ThrowIfArgumentNull(session, nameof(session));

            command.CommandType = CommandType.StoredProcedure;

            // @Token
            command.Parameters.Add(session.Token.ToString());
            command.Parameters["@Token_"].Direction = ParameterDirection.Input;

            // @Timestamp_
            command.Parameters.Add(session.Timestamp);
            command.Parameters["@Timestamp_"].Direction = ParameterDirection.Input;

            // @User_ID_
            command.Parameters.Add(session.User.Id);
            command.Parameters["@User_ID_"].Direction = ParameterDirection.Input;
        }

        public int RevokeSession(Session session)
        {
            var sql = "Revoke_Session";

            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                // @Token
                command.Parameters.Add(session.Token);
                command.Parameters["@Token"].Direction = ParameterDirection.Input;

                // @User_ID_
                command.Parameters.Add(session.User.Id);
                command.Parameters["@User_ID"].Direction = ParameterDirection.Input;

                return command.ExecuteNonQuery();
            }
        }

        public int UpdateAction(ActionType type, User user)
        {
            ThrowIfArgumentNull(user, nameof(user));

            var action = ActionToString(type);
            var sql = ADD_USER_ACTION;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;
                BindUpdateAction(command, user, action);

                return command.ExecuteNonQuery();
            }
        }

        public async Task<int> UpdateActionAsync(ActionType type, User user)
        {
            ThrowIfArgumentNull(user, nameof(user));

            var action = ActionToString(type);
            var sql = ADD_USER_ACTION;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;
                BindUpdateAction(command, user, action);

                return await command.ExecuteNonQueryAsync();
            }
        }

        public IEnumerable<string> GetAllRoles()
        {
            var sql = ALL_ROLES;
            using (var command = new MySqlCommand(sql, _conn))
            {
                using (var reader = command.ExecuteReader())
                {
                    var adapter = new MySqlReaderAdapter(reader);

                    while (adapter.Read())
                    {
                        yield return adapter.GetString("Role_Name");
                    }
                }
            }
        }

        public async Task<IEnumerable<string>> GetAllRolesAsync()
        {
            var sql = ALL_ROLES;
            using (var command = new MySqlCommand(sql, _conn))
            using (var reader = await command.ExecuteReaderAsync())
            {
                var adapater = new MySqlReaderAdapter(reader);
                var names = new List<string>();
                while (await adapater.ReadAsync())
                {
                    names.Add(adapater.GetString("Role_Name"));
                }

                return names;
            }
        }

        public IEnumerable<string> GetPrivilegesForRole(string role)
        {
            ThrowIfArgumentNull(role, nameof(role));

            var sql = GET_PRIVILEGES_FROM_ROLE;
            using (var command = _conn.CreateCommand() as MySqlCommand)
            {
                command.CommandText = sql;
                command.Prepare();
                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@role",
                    DbType = DbType.String,
                    Value = role
                });
                using (var reader = command.ExecuteReader())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    while (adapter.Read())
                    {
                        yield return adapter.GetString("Privilege_Name");
                    }
                }
            }
        }

        public async Task<IEnumerable<string>> GetPrivilegesForRoleAsync(string role)
        {
            ThrowIfArgumentNull(role, nameof(role));

            var sql = GET_PRIVILEGES_FROM_ROLE;
            using (var command = _conn.CreateCommand() as MySqlCommand)
            {
                command.CommandText = sql;
                command.Prepare();
                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@role",
                    DbType = DbType.String,
                    Value = role
                });
                using (var reader = await command.ExecuteReaderAsync())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    var privileges = new List<string>();
                    while (await adapter.ReadAsync())
                    {
                        privileges.Add(adapter.GetString("Privilege_Name"));
                    }

                    return privileges;
                }
            }
        }

        public async Task<IEnumerable<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>>
            GetActionsForUserAsync(User user)
        {
            ThrowIfArgumentNull(user, nameof(user));

            var sql = GET_ACTIONS_FOR_USER;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = user.Id
                });

                var result = new List<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    while (await adapter.ReadAsync())
                    {
                        var userId = adapter.GetInt(0);
                        var firstName = adapter.GetString(1);
                        var lastName = adapter.GetString(2);
                        var username = adapter.GetString(3);
                        var actionName = adapter.GetString(4);
                        var timestamp = adapter.GetDateTime(5);

                        result.Add((userId, firstName, lastName, username, actionName, timestamp));
                    }
                }

                return result;
            }
        }

        public IEnumerable<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>
            GetActionsForUser(User user)
        {
            ThrowIfArgumentNull(user, nameof(user));

            var sql = GET_ACTIONS_FOR_USER;
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = user.Id
                });

                var result = new List<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>();

                using (var reader = command.ExecuteReader())
                {
                    var adapter = new MySqlReaderAdapter(reader);
                    while (adapter.Read())
                    {
                        var userId = adapter.GetInt(0);
                        var firstName = adapter.GetString(1);
                        var lastName = adapter.GetString(2);
                        var username = adapter.GetString(3);
                        var actionName = adapter.GetString(4);
                        var timestamp = adapter.GetDateTime(5);

                        result.Add((userId, firstName, lastName, username, actionName, timestamp));
                    }
                }

                return result;
            }
        }

        public async Task<int> RevokeUserAsync(int id)
        {
            var sql = "revoke_user";
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = id
                });

                return await command.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> RestoreUserAsync(int id)
        {
            var sql = "restore_user";
            using (var command = new MySqlCommand(sql, _conn))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = id
                });

                return await command.ExecuteNonQueryAsync();
            }
        }
        
        #region private methods

        private static void BindNewAnnouncement(MySqlCommand command, Announcement announcement)
        {
            // @Timestamp
            command.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Timestamp",
                DbType = DbType.Time,
                Value = announcement.TimeStamp
            });
            command.Parameters["@Timestamp"].Direction = ParameterDirection.Input;

            // @Text
            command.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Text",
                DbType = DbType.String,
                Value = announcement.Text
            });
            command.Parameters["@Text"].Direction = ParameterDirection.Input;

            // @Category
            command.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Category",
                DbType = DbType.String,
                Value = announcement.Category
            });
            command.Parameters["@Category"].Direction = ParameterDirection.Input;

            // @ UserID
            command.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@UserID",
                DbType = DbType.Int32,
                Value = announcement.User.Id
            });
            command.Parameters["@UserID"].Direction = ParameterDirection.Input;
        }

        private static void BindUpdateAction(MySqlCommand command, User user, string action)
        {
            var parameters = new MySqlParameter[]
            {
                new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = user.Id
                },
                new MySqlParameter
                {
                    ParameterName = "Action_",
                    DbType = DbType.String,
                    Value = action
                },
                new MySqlParameter
                {
                    ParameterName = "Timestamp_",
                    DbType = DbType.DateTime,
                    Value = DateTime.Now
                }
            };

            command.Parameters.AddRange(parameters);
        }

        private static void BindNewUser(MySqlCommand command, User user, string hash, string salt)
        {
            var parameters = new MySqlParameter[]
            {
                new MySqlParameter
                {
                    ParameterName = "Username_",
                    DbType = DbType.String,
                    Value = user.Username
                },
                new MySqlParameter
                {
                    ParameterName = "First_Name_",
                    DbType = DbType.String,
                    Value = user.FirstName
                },
                new MySqlParameter
                {
                    ParameterName = "Last_Name_",
                    DbType = DbType.String,
                    Value = user.LastName
                },
                new MySqlParameter
                {
                    ParameterName = "Email_",
                    DbType = DbType.String,
                    Value = user.Email ?? ""
                },
                new MySqlParameter
                {
                    ParameterName = "Password_Hash_",
                    DbType = DbType.String,
                    Value = hash
                },
                new MySqlParameter
                {
                    ParameterName = "Password_Salt_",
                    DbType = DbType.String,
                    Value = salt
                },
                new MySqlParameter
                {
                    ParameterName = "Role_",
                    DbType = DbType.String,
                    Value = user.Role
                },
            };

            command.Parameters.AddRange(parameters);
        }

        private static void BindUpdateUser(MySqlCommand command, User user)
        {
            var parameters = new MySqlParameter[]
            {
                new MySqlParameter
                {
                    ParameterName = "User_ID_",
                    DbType = DbType.Int32,
                    Value = user.Id
                },
                new MySqlParameter
                {
                    ParameterName = "Username_",
                    DbType = DbType.String,
                    Value = user.Username
                },
                new MySqlParameter
                {
                    ParameterName = "First_Name_",
                    DbType = DbType.String,
                    Value = user.FirstName
                },
                new MySqlParameter
                {
                    ParameterName = "Last_Name_",
                    DbType = DbType.String,
                    Value = user.LastName
                },
                new MySqlParameter
                {
                    ParameterName = "Email_",
                    DbType = DbType.String,
                    Value = user.Email ?? ""
                },
                new MySqlParameter
                {
                    ParameterName = "Role_",
                    DbType = DbType.String,
                    Value = user.Role
                },
            };

            command.Parameters.AddRange(parameters);
        }

        private static string ActionToString(ActionType type)
        {
            switch (type)
            {
                case ActionType.LOGIN:
                    return "Log_In";
                case ActionType.LOGOUT:
                    return "Log_Out";
                case ActionType.VIEW_ANNOUNCEMENTS:
                    return "View_Announcements";
                case ActionType.OPEN_AVM:
                    return "Open_AVM";
                case ActionType.OPEN_TRELLO:
                    return "Open_Trello";
                case ActionType.OPEN_GSUITE:
                    return "Open_Google";
                case ActionType.OPEN_EZTIMES:
                    return "Open_EZTime";
                case ActionType.RESET_PASSWORD:
                    return "Reset_Password";
                default:
                    return string.Empty;
            }
        }
        #endregion
    }
}

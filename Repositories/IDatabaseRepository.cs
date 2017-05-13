using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WesternPlains.App.Adapters;
using WesternPlains.App.Models;

namespace WesternPlains.App.Repositories
{
    public interface IDatabaseRepository: IDisposable
    {
        User CreateUserFromReader(IReaderAdapter reader);
        int AddUser(User user, string password);
        Task<int> AddUserAsync(User user, string password);
        User GetUserFromId(int id);
        Task<User> GetUserFromIdAsync(int id);
        IEnumerable<User> GetAllUsers();
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<int> UpdateUserAsync(User user);
        Task<int> ResetPasswordAsync(User user, string hash, string salt);
        User AuthenticateCredentials(string username, string password);
        Task<int> RevokeUserAsync(int id);
        Task<int> RestoreUserAsync(int id);

        // NOTE: Have Alec make a view that joins the User+Announcement table
        Announcement CreateAnnouncementFromReader(IReaderAdapter reader);
        int AddAnnouncement(Announcement announcement);
        Task<int> AddAnnouncmentAsync(Announcement announcement);
        IEnumerable<Announcement> GetAllAnnouncements();
        Task<IEnumerable<Announcement>> GetAllAnnouncementsAsync();

        int StoreSession(Session session);
        Task<int> StoreSessionAsync(Session session);

        int RevokeSession(Session session);

        int UpdateAction(ActionType type, User user);
        Task<int> UpdateActionAsync(ActionType type, User user);
        IEnumerable<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>
            GetActionsForUser(User user);
        Task<IEnumerable<(int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp)>>
            GetActionsForUserAsync(User user);

        IEnumerable<string> GetAllRoles();
        Task<IEnumerable<string>> GetAllRolesAsync();

        IEnumerable<string> GetPrivilegesForRole(string role);
        Task<IEnumerable<string>> GetPrivilegesForRoleAsync(string role);
    }
}

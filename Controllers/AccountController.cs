using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WesternPlains.App.Exceptions;
using WesternPlains.App.Extensions;
using WesternPlains.App.Models;
using WesternPlains.App.Repositories;
using WesternPlains.App.ViewModels;

using static BCrypt.Net.BCrypt;

using static WesternPlains.App.Models.Privileges;
using static WesternPlains.App.Models.Roles;

namespace WesternPlains.App.Controllers
{
    public class AccountController : Controller
    {
        #region fields
        private readonly IDatabaseRepository _repo;
        #endregion

        #region constructors
        public AccountController(IDatabaseRepository repository)
        {
            _repo = repository;
        }
        #endregion

        #region routes
        public IActionResult Index()
        {
            if (!IsUserValid())
                return RedirectToAction("Index", "Home");

            var user = HttpContext.Session.GetCurrentUser();
            var privileges = user.Privileges.ToList();
            var vm = new AdminPanelViewModel
            {
                IsAdmin = user.Role == ADMIN || user.Role == SUDO || user.Role == EMPLOYEE,
                CanCreateUser = privileges.Contains(CREATE_USER),
                CanCreateAnnouncement = privileges.Contains(CREATE_ANNOUNCMENT),
                CanUpdateUser = privileges.Contains(UPDATE_USER),
                CanUpdateAnnoucnement = privileges.Contains(UPDATE_ANNOUNCEMENT),
                CanGenerateReports = privileges.Contains(GENERATE_REPORTS),
                CanCreatePrivileges = privileges.Contains(CREATE_PRIVILEGES),
                CanCreateRoles = privileges.Contains(CREATE_ROLES),
                CanOpenAVM = privileges.Contains(OPEN_AVM),
                CanOpenTrello = privileges.Contains(OPEN_TRELLO),
                CanOpnEZClock = privileges.Contains(OPEN_EZCLOCK),
                CanOpenGSuite = privileges.Contains(OPEN_GSUITE)
            };

            return View(vm);
        }

        public IActionResult Login(string redirectTo = null)
        {
            if (HttpContext.Session?.GetCurrentUser() != null)
                return RedirectToAction("Announcements");
            var vm = new LoginViewModel
            {
                ReturnUrl = redirectTo
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel login)
        {
            if (!ModelState.IsValid)
                return RedirectToAction("Index", "Home", login);
            try
            {
                var user = _repo.AuthenticateCredentials(login.Username, login.Password);

                // Don't even try to establish a session, just return to login
                if (user.Role == REVOKED)
                    return View(new LoginViewModel());

                user.Privileges = await _repo.GetPrivilegesForRoleAsync(user.Role);
                HttpContext.Session.Set("UID", Guid.NewGuid());
                HttpContext.Session.Set("User", user);

                await _repo.UpdateActionAsync(ActionType.LOGIN, user);

                if (string.IsNullOrEmpty(login.ReturnUrl))
                    return RedirectToAction("Announcements", "Home");

                return Redirect(login.ReturnUrl);
            }
            catch (AuthenticationException authEx)
            {
                Debug.WriteLine("AuthenticationException: {0}", authEx);
                ModelState.AddModelError("Authentication", "Username or password is not correct");
                return View(login);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            var user = HttpContext.Session.GetCurrentUser();
            if (user != null)
                await _repo.UpdateActionAsync(ActionType.LOGOUT, user);

            HttpContext.Session.Clear();

            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Register()
        {
            var user = HttpContext.Session.GetCurrentUser();
            if (user is null)
                return RedirectToAction("Index", "Home");

            if (!user.Privileges.Contains(CREATE_USER) && user.Role != ADMIN && user.Role != SUDO)
                return RedirectToAction("Index", "Home");

            var roles = (await _repo.GetAllRolesAsync()).ToList();
            roles.Remove(REVOKED);
            if (user.Role != SUDO)
            {
                roles.Remove(SUDO);
            }
            var vm = new RegisterViewModel()
            {
                Role = "Employee",
                Roles = new SelectList(roles),
                Email = ""
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel registration)
        {
            if (!ModelState.IsValid)
            {
                return View(registration);
            }
            if (registration.Password != registration.PasswordConfirmation)
            {
                ModelState.AddModelError("PasswordsNoMatch", "Passwords do not match");
                return View(registration);
            }

            var role = string.IsNullOrEmpty(registration.Role) ? EMPLOYEE : registration.Role;
            var email = string.IsNullOrEmpty(registration.Email) ? "" : registration.Email;
            var user = new User
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Username = registration.Username,
                Email = email,
                Role = role
            };

            await _repo.AddUserAsync(user, registration.Password);

            return RedirectToAction("RegistrationSuccess");
        }

        public IActionResult RegistrationSuccess()
        {
            var vm = new RegistrationSuccessViewModel
            {
                AdminPanelUrl = Url.Action("Index", "Admin"),
                RegistrationUrl = Url.Action("Register")
            };
            return View(vm);
        }

        public async Task<IActionResult> Update(int id = -1)
        {
            if (id is -1)
            {
                var users = await _repo.GetAllUsersAsync();
                var links =
                  users.Select(user => {
                      return new UserLinkVm {
                          User = user,
                          Link = Url.Action("Update", "Account") + "/" + user.Id.ToString()
                      };
                  });
                var vm = new UpdateUserListViewModel
                {
                    Users = users,
                    Links = links
                };
                return View("UpdateList", vm);
            }
            else
            {
                var user = await _repo.GetUserFromIdAsync(id);
                var roleList = new SelectList(await _repo.GetAllRolesAsync(), selectedValue: user.Role);
                var vm = new UpdateUserViewModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Username = user.Username,
                    Email = user.Email,
                    IsRevoked = user.Role is REVOKED,
                    Role = user.Role,
                    Roles = roleList
                };
                return View(vm);
            }
        }

        public IActionResult ResetPassword()
        {
            var user = HttpContext.Session.GetCurrentUser();
            var vm = new UpdateUserViewModel
            {
                Id = user.Id
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(UpdateUserViewModel submission)
        {
            var user = await _repo.GetUserFromIdAsync(submission.Id);
            var salt = GenerateSalt();
            var hash = HashPassword(submission.Password);
            await _repo.ResetPasswordAsync(user, hash, salt);
            await _repo.UpdateActionAsync(ActionType.RESET_PASSWORD, user);
            var vm = new UpdateSuccessViewModel
            {
                Fullname = user.FullName,
                DashboardUrl = Url.Action("Index"),
                UpdateUrl = Url.Action("Update", user.Id)
            };
            return View("UpdateSuccess", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(UpdateUserViewModel submission)
        {
            var user = submission.ToUser();
            await _repo.UpdateUserAsync(user);

            var vm = new UpdateSuccessViewModel
            {
                Fullname = user.FullName,
                DashboardUrl = Url.Action("Index", "Account"),
                UpdateUrl = Url.Action("Update", "Account", user.Id)
            };
            return View("UpdateSuccess", vm);
        }

        public async Task<IActionResult> Revoke(UpdateUserViewModel submission)
        {
            var id = submission.Id;
            await _repo.RevokeUserAsync(id);

            return RedirectToAction("Update", id);
        }

        public async Task<IActionResult> Restore(UpdateUserViewModel submission)
        {
            var id = submission.Id;
            await _repo.RestoreUserAsync(id);

            return RedirectToAction("Update", id);
        }
        #endregion

        #region private methods
        private bool IsUserValid()
        {
            var user = HttpContext.Session.GetCurrentUser();
            if (user == null)
                return false;
            else
                return user.Role == Roles.ADMIN || user.Role == Roles.SUDO;
        }
        #endregion
    }
}

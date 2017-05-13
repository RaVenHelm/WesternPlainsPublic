using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WesternPlains.App.Repositories;
using WesternPlains.App.ViewModels;

namespace WesternPlains.App.Controllers
{
  public class ReportController: Controller
    {
        #region fields
        private readonly IDatabaseRepository _repo;
        #endregion

        #region constructors
        public ReportController(IDatabaseRepository repo)
        {
            _repo = repo;
        }
        #endregion

        #region routes
        public async Task<IActionResult> Index()
        {
            var users = from user in await _repo.GetAllUsersAsync()
                        select (Id: user.Id, Name: user.FullName);

            var vm = new ReportViewModel
            {
                Users = from user in users
                        select new SelectListItem { Value = user.Id.ToString(), Text = user.Name }
            };

            return View(vm);
        }

        public async Task<IActionResult> UserActions()
        {
            var userActions = from user in await _repo.GetAllUsersAsync()
                              from ua in _repo.GetActionsForUser(user)
                              select ua;

            return Json(new
            {
                Data = (from ua in userActions select MapObject(ua)).ToList()
            });

            object MapObject((int UserID, string FirstName, string LastName, string Username, string ActionName, DateTime Timestamp) userAction)
            {
                return new
                {
                    userAction.UserID,
                    userAction.FirstName,
                    userAction.LastName,
                    userAction.Username,
                    userAction.ActionName,
                    userAction.Timestamp
                };
            }
        }
        #endregion
    }
}

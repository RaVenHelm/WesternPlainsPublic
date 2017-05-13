using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WesternPlains.App.Extensions;
using WesternPlains.App.Repositories;
using WesternPlains.App.Models;

namespace WesternPlains.App.Controllers
{
    public class ApplicationController: Controller
    {
        #region fields
        private readonly IDatabaseRepository _repo;
        #endregion

        #region constructors
        public ApplicationController(IDatabaseRepository repo)
        {
            _repo = repo;
        }
        #endregion

        #region routes
        public async Task<IActionResult> Google()
        {
            var user = HttpContext.Session?.GetCurrentUser();
            if (user is null)
                return RedirectHome();
            await _repo.UpdateActionAsync(ActionType.OPEN_GSUITE, user);

            return Redirect("https://drive.google.com");
        }

        public async Task<IActionResult> Trello()
        {
            var user = HttpContext.Session?.GetCurrentUser();
            if (user is null)
                return RedirectHome();
            await _repo.UpdateActionAsync(ActionType.OPEN_TRELLO, user);
            return Redirect("https://www.trello.com/login");
        }

        public async Task<IActionResult> Avm()
        {
            var user = HttpContext.Session?.GetCurrentUser();
            if (user is null)
                return RedirectHome();
            await _repo.UpdateActionAsync(ActionType.OPEN_AVM, user);

            return Redirect("wp:open");
        }

        public async Task<IActionResult> TimeClock()
        {
            var user = HttpContext.Session?.GetCurrentUser();
            if (user is null)
                return RedirectHome();
            await _repo.UpdateActionAsync(ActionType.OPEN_EZTIMES, user);
            return Redirect("https://www.easytimeclock.com/Login.aspx");
        }


        #endregion

        #region private methods
        private IActionResult RedirectHome()
        {
            return RedirectToAction("Index", "Home");
        }
        #endregion
    }
}

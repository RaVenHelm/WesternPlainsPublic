using Microsoft.AspNetCore.Mvc;
using WesternPlains.App.Extensions;
using WesternPlains.App.Repositories;

namespace WesternPlains.App.Controllers
{
  public class HomeController : Controller
    {
        private readonly IDatabaseRepository _repo;

        public HomeController(IDatabaseRepository repo)
        {
            _repo = repo;
        }

        public IActionResult Index(string returnUrl)
        {
            if (HttpContext.Session?.GetCurrentUser() != null)
                return RedirectToAction("Announcements");

            return RedirectToAction("Login", "Account");
        }

        public IActionResult Announcements()
        {
            if (HttpContext.Session?.GetCurrentUser() == null)
                return RedirectToAction("Index");

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult Except()
        {
            throw new System.Exception("Bang!");
        }
    }
}

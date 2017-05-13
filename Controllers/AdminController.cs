using Microsoft.AspNetCore.Mvc;

namespace WesternPlains.App.Controllers
{
    public class AdminController: Controller
    {
        public AdminController()
        {
        }

        public IActionResult Index()
        {
            return RedirectToAction("Index", "Account");
        }

        public IActionResult AddUser()
        {
            return RedirectToAction("Register", "Account");
        }

        public IActionResult AddAnnouncement()
        {
            return RedirectToAction("Create", "Announcement");
        }
    }
}

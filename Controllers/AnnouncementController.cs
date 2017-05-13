using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WesternPlains.App.ViewModels;
using WesternPlains.App.Repositories;
using WesternPlains.App.Extensions;
using System;
using System.Linq;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WesternPlains.App.Controllers
{
    public class AnnouncementController : Controller
    {
        #region fields
        private readonly IDatabaseRepository _repo;
        #endregion

        #region constructors
        public AnnouncementController(IDatabaseRepository repo)
        {
            _repo = repo;
        }
        #endregion

        public IActionResult Create()
        {
            // TODO: Change to error route (flash message?)
            var user = HttpContext.Session?.GetCurrentUser();

            // TODO: Add more checks here
            if (user is null)
                return RedirectToAction("Index", "Home");
            var vm = new AnnoucementCreateViewModel();

            return View(vm);
        }

        // POST /Announcements/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AnnoucementCreateViewModel vm)
        {
            if (!ModelState.IsValid)
                return View(vm);
            var announcement = vm.ToAnnouncement();
            announcement.TimeStamp = DateTime.Now;
            announcement.User = HttpContext.Session.GetCurrentUser();

            await _repo.AddAnnouncmentAsync(announcement);

            return RedirectToAction("CreateSuccess");
        }

        public IActionResult CreateSuccess()
        {
            var vm = new CreateSuccessViewModel
            {
                HomeLink = Url.Action("Index", "Home"),
                CreateLink = Url.Action("Create", "Annoucement")
            };
            return View(vm);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var announcements = await _repo.GetAllAnnouncementsAsync();
            var result = announcements.OrderByDescending(announ => announ.TimeStamp).ToList();

            return Json(new
            {
                Data = result
            });
        }
    }
}

using System.ComponentModel.DataAnnotations;
using WesternPlains.App.Models;

namespace WesternPlains.App.ViewModels
{
  public class AnnoucementCreateViewModel
    {
        [Required]
        public string Text { get; set; }

        [Required]
        public string Category { get; set; }

        public Announcement ToAnnouncement()
        {
            return Announcement.Create(Text, Category);
        }
    }
}

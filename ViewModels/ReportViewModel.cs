using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace WesternPlains.App.ViewModels
{
  public class ReportViewModel
    {
        public IEnumerable<SelectListItem> Users { get; set; }
    }
}

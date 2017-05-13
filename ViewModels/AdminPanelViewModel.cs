namespace WesternPlains.App.ViewModels
{
  public class AdminPanelViewModel
    {
        public bool IsAdmin { get; set; }
        public bool CanCreateUser { get; set; }
        public bool CanCreateAnnouncement { get; set; }
        public bool CanUpdateUser { get; set; }
        public bool CanUpdateAnnoucnement { get; set; }
        public bool CanGenerateReports { get; set; }
        public bool CanCreateRoles { get; set; }
        public bool CanCreatePrivileges { get; set; }
        public bool CanOpenAVM { get; set; }
        public bool CanOpenTrello { get; set; }
        public bool CanOpenGSuite { get; set; }
        public bool CanOpnEZClock { get; set; }
    }
}

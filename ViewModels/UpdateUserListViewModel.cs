using System.Collections.Generic;
using WesternPlains.App.Models;

namespace WesternPlains.App.ViewModels
{
    public class UserLinkVm
    {
        public User User;
        public string Link;
    }

    public class UpdateUserListViewModel
    {
        public IEnumerable<User> Users { get; set; }
        public IEnumerable<UserLinkVm> Links { get; set; }
    }
}

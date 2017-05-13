using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using WesternPlains.App.Models;

namespace WesternPlains.App.ViewModels
{
    public class UpdateUserViewModel
    {
        [Required]
        public int Id { get; set; }

        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string Username { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string PasswordConfirmation { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public SelectList Roles { get; set; }

        public string Role { get; set; }

        public bool IsRevoked { get; set; }

        public User ToUser() => new User(Id, FirstName, LastName, Username, Role, Email);
    }
}

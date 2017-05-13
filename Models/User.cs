using System.Collections.Generic;

namespace WesternPlains.App.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public IEnumerable<string> Privileges { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        public User(int id = -1, string firstName = "", string lastName = "", string username = "", string role = "", string email = null)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Username = username;
            Role = role;
            Email = email;
        }

        public override string ToString()
        {
            if (Id == -1)
            {
                return "<Unknown User>";
            }
            else
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}

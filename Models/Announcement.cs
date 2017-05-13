using System;
using WesternPlains.App.Extensions;

namespace WesternPlains.App.Models
{
    public class Announcement
    {
        public DateTime TimeStamp { get; set; }
        public User User { get; set; }
        public string Text { get; set; }
        public string Category { get; set; }

        public Announcement(DateTime timestamp, User user, string text, string category)
        {
            TimeStamp = timestamp;
            User = user;
            Text = text;
            Category = category;
        }

        public override string ToString()
        {
            return $"{TimeStamp.ToShortDateString()} -- {User.FullName}";
        }

        public static Announcement Create()
        {
            return new Announcement(DateTime.Now, new User(), "", "General");
        }

        public static Announcement Create(string text, string category)
        {
            return Create(DateTime.Now, new User(), text, category);
        }

        public static Announcement Create(DateTime timestamp, User user, string text, string category)
        {
            return new Announcement(timestamp, user, text, category);
        }
    }
}

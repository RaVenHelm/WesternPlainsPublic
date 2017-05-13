using System;

namespace WesternPlains.App.Models
{
    public class Session
    {
        public readonly Guid Token;
        public readonly User User;
        public readonly DateTime Timestamp;

        protected Session(User user, DateTime timestamp)
        {
            Token = Guid.NewGuid();
            User = user;
            Timestamp = timestamp;
        }

        public static Session CreateNew(User user)
        {
            return new Session(user, DateTime.Now);
        }

        public static Session CreateNew(User user, DateTime timestamp)
        {
            return new Session(user, timestamp);
        }

        public bool HasExpired()
        {
            var diff = DateTime.Now - Timestamp;
            return diff.TotalHours > 2;
        }
    }
}

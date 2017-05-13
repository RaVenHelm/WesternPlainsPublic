using System;

namespace WesternPlains.App.Extensions
{
    public class Utilities
    {
        public static void ThrowIfArgumentNull(object arg, string name = "")
        {
            if (arg is null)
            {
                throw new ArgumentNullException(name);
            }
        }
    }
}

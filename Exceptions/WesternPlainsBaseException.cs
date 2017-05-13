using System;

namespace WesternPlains.App.Exceptions
{
    public class WesternPlainsBaseException: Exception
    {
        public WesternPlainsBaseException(string message)
            : base(message)
        {
        }
    }
}

namespace WesternPlains.App.Exceptions
{
    public class AuthenticationException : WesternPlainsBaseException
    {
        public AuthenticationException(string message = "Username or password is incorrect") : base(message)
        {
        }
    }
}

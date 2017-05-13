namespace WesternPlains.App.Exceptions
{
    public class UserNotFoundException: WesternPlainsBaseException
    {
        public UserNotFoundException(int id)
            : base($"User with ID = {id} not found")
        {
        }
    }
}

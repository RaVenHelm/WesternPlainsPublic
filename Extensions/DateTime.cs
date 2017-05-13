namespace WesternPlains.App.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToShortDateString(this System.DateTime dt)
        {
            return dt.ToString("d");
        }
    }
}

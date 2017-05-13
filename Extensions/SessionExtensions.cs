using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WesternPlains.App.Models;

namespace WesternPlains.App.Extensions
{
    // From Microsoft
    // @link: https://github.com/aspnet/Docs/blob/master/aspnetcore/fundamentals/app-state/sample/src/WebAppSession/Extensions/SessionExtensions.cs
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) :
                                   JsonConvert.DeserializeObject<T>(value);
        }

        public static User GetCurrentUser(this ISession session)
        {
            return session.Get<User>("User");
        }
    };
}

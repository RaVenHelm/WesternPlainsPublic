using System;
using System.IO;
using System.Threading.Tasks;

namespace WesternPlains.App.Adapters
{
    public interface IReaderAdapter
    {
        bool Read();
        Task<bool> ReadAsync();
        bool HasRows { get; }
        int GetInt(int index);
        int GetInt(string colName);
        string GetString(int index);
        string GetString(string colName);
        DateTime GetDateTime(int index);
        DateTime GetDateTime(string colName);
        Stream GetStream(int index);
        Stream GetStream(string colName);
        long GetBytes(int index, long offset, byte[] buffer, int bufferOffset, int length);
        long GetBytes(string colName, long offset, byte[] buffer, int bufferOffset, int length);
        object this[string key] { get; }
        object this[int index] { get; }
    }
}

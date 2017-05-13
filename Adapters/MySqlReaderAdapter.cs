using System;
using System.Data.Common;
using System.IO;
using System.Threading.Tasks;

namespace WesternPlains.App.Adapters
{
    public class MySqlReaderAdapter : IReaderAdapter
    {
        private readonly DbDataReader _reader;

        public MySqlReaderAdapter(DbDataReader reader)
        {
            _reader = reader;
        }

        public object this[int index] => _reader[index];

        public object this[string key] => _reader[key];

        public bool HasRows => _reader.HasRows;

        public bool Read() => _reader.Read();

        public Task<bool> ReadAsync() => _reader.ReadAsync();

        public DateTime GetDateTime(string colName) => _reader.GetDateTime(_reader.GetOrdinal(colName));

        public DateTime GetDateTime(int index) => _reader.GetDateTime(index);

        public int GetInt(string colName) => _reader.GetInt32(_reader.GetOrdinal(colName));

        public int GetInt(int index) => _reader.GetInt32(index);

        public string GetString(string colName) => _reader.GetString(_reader.GetOrdinal(colName));

        public string GetString(int index) => _reader.GetString(index);

        public Stream GetStream(int index) => _reader.GetStream(index);

        public Stream GetStream(string colName) => _reader.GetStream(_reader.GetOrdinal(colName));

        public long GetBytes(int index, long offset, byte[] buffer, int bufferOffset, int length) =>
            _reader.GetBytes(index, offset, buffer, bufferOffset, length);

        public long GetBytes(string colName, long offset, byte[] buffer, int bufferOffset, int length) =>
            GetBytes(_reader.GetOrdinal(colName), offset, buffer, bufferOffset, length);
    }
}

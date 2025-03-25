using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Services
{
    public interface IS3Service
    {
        Task<string> UploadFileAsync(Stream stream, string fileName);
        Task<Stream> DownloadFileAsync(string fileName);
        Task<List<string>> ListFilesAsync();
        Task<bool> DeleteFileAsync(string fileName);
    }
}

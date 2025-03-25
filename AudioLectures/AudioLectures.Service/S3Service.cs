using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon.S3;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon;
using AudioLectures.Core.Services;

namespace AudioLectures.Service
{
    public class S3Service : IS3Service
    {
    private readonly AmazonS3Client _s3Client;
    private readonly string _bucketName;

    public S3Service(IConfiguration configuration)
    {
      _bucketName = configuration["AWS:S3:BucketName"]; // שם ה-Bucket מתוך appsettings.json
      string accessKey = configuration["AWS:AccessKey"];
      string secretKey = configuration["AWS:SecretKey"];
      string region = configuration["AWS:Region"];

      _s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));
    }

    // ✅ פונקציה להעלאת קובץ ל-S3
    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
      var request = new TransferUtilityUploadRequest
      {
        InputStream = fileStream,
        Key = fileName,
        BucketName = _bucketName,
        CannedACL = S3CannedACL.PublicRead // מאפשר גישה ציבורית לקובץ (לא חובה)
      };

      var transferUtility = new TransferUtility(_s3Client);
      await transferUtility.UploadAsync(request);

      return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
    }

    // ✅ פונקציה להורדת קובץ מ-S3
    public async Task<Stream> DownloadFileAsync(string fileName)
    {
      var request = new GetObjectRequest
      {
        BucketName = _bucketName,
        Key = fileName
      };

      var response = await _s3Client.GetObjectAsync(request);
      return response.ResponseStream;
    }

    // ✅ פונקציה לקבלת רשימת הקבצים ב-S3
    public async Task<List<string>> ListFilesAsync()
    {
      var request = new ListObjectsV2Request
      {
        BucketName = _bucketName
      };

      var response = await _s3Client.ListObjectsV2Async(request);
      var fileNames = new List<string>();

      foreach (var obj in response.S3Objects)
      {
        fileNames.Add(obj.Key);
      }

      return fileNames;
    }

  }
}

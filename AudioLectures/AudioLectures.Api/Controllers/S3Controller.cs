using Amazon.S3;
using AudioLectures.Core.Services;
using AudioLectures.Service;
using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace AudioLectures.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class S3Controller : ControllerBase
    {
        private readonly IS3Service _s3Service;

        public S3Controller(IS3Service s3Service)
        {
            _s3Service = s3Service;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty.");
            Console.WriteLine($"Received file: {file.FileName}, Size: {file.Length}");
            using var stream = file.OpenReadStream();
            var url = await _s3Service.UploadFileAsync(stream, file.FileName);
            Console.WriteLine("I Am in upload!!!!");
            return Ok(new { Url = url });
        }

        //[HttpGet("download/{fileName}")]
        //public async Task<IActionResult> DownloadFile(string fileName)
        //{
        //    // ���� �� �� ����� (����� ����� ����� �������)
        //    string decodedFileName = HttpUtility.UrlDecode(fileName);

        //    // ���� �� ����� ��-S3 ������� ��� �������
        //    var stream = await _s3Service.DownloadFileAsync(decodedFileName);

        //    // ���� �� ����� �����
        //    return File(stream, "application/octet-stream", decodedFileName);
        //}
        [HttpGet("download/{fileName}")]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            // ���� �� �� ����� (����� ����� ����� �������)
            string decodedFileName = HttpUtility.UrlDecode(fileName);

            // ���� �� ����� ��-S3
            var stream = await _s3Service.DownloadFileAsync(decodedFileName);

            // ����� Content-Disposition ����� �����
            var contentDisposition = new System.Net.Mime.ContentDisposition
            {
                FileName = decodedFileName, // �� ����� �� ������
                Inline = false // �� ���� ��� ���� ������ ��� ����� ������
            };

            // ���� �� ����� �� ������ ������
            Response.Headers.Add("Content-Disposition", contentDisposition.ToString());
            return File(stream, "application/octet-stream");
        }



        [HttpGet("files")]
        public async Task<IActionResult> ListFiles()
        {
            var files = await _s3Service.ListFilesAsync();
            return Ok(files);
        }
        [HttpDelete("delete/{fileName}")]
        public async Task<IActionResult> DeleteFile(string fileName)
        {
            var success = await _s3Service.DeleteFileAsync(fileName);

            if (!success)
                return NotFound("File not found.");

            return Ok("File deleted successfully.");
        }


    }
}

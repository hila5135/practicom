using Amazon.S3;
using AudioLectures.Core.Services;
using AudioLectures.Service;
using Microsoft.AspNetCore.Mvc;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3Controller : ControllerBase
    {
        private readonly IS3Service _s3Service;
        private readonly IAmazonS3 amazonS3Client;

        public S3Controller(IS3Service s3Service)
        {
            _s3Service = s3Service;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty.");

            using var stream = file.OpenReadStream();
            var url = await _s3Service.UploadFileAsync(stream, file.FileName);

            return Ok(new { Url = url });
        }

        [HttpGet("download/{fileName}")]

        public async Task<IActionResult> DownloadFile(string fileName)
        {
            var stream = await _s3Service.DownloadFileAsync(fileName);
            return File(stream, "application/octet-stream", fileName);
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

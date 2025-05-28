//using AudioLectures.Core.Models;
//using AudioLectures.Data;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Text.Json;

//namespace AudioLectures.Api.Controllers
//{ 
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ChatApiController : Controller
//    {



//        //private readonly DataContext _dbContext;

//        //public ChatApiController(DataContext dbContext)
//        //{
//        //    _dbContext = dbContext;
//        //}


//        [HttpGet]
//        public async Task<IActionResult> Get()
//        {
//            try
//            {
//                var prompt = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = new[] {
//                    new { role = "system", content = "אתה מומחה מרצים ושעורי תורה" },
//                    new { role = "user", content = "מה השעור הראשון של הרב בסיס" }
//                }
//                };

//                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(prompt)
//                };
//                request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//                var response = await client.SendAsync(request);

//                if (!response.IsSuccessStatusCode)
//                {
//                    var errorDetails = await response.Content.ReadAsStringAsync();
//                    return StatusCode((int)response.StatusCode, $"שגיאה מה-API: {errorDetails}");
//                }

//                // חילוץ תוכן התשובה
//                var json = await response.Content.ReadFromJsonAsync<JsonElement>();
//                var content = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

//                return Ok(content);
//            }
//            catch (HttpRequestException httpEx)
//            {
//                Console.WriteLine($"שגיאת רשת: {httpEx.Message}");
//                return StatusCode(500, "בעיה בחיבור ל-API.");
//            }
//            catch (JsonException jsonEx)
//            {
//                Console.WriteLine($"שגיאה בפרסום JSON: {jsonEx.Message}");
//                return StatusCode(500, "שגיאה בפענוח הנתונים.");
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"שגיאה כללית: {ex.Message}");
//                return StatusCode(500, "שגיאה כללית במהלך הבקשה.");
//            }
//        }

//        //[HttpPost("chat")]
//        //public async Task<IActionResult> Chat([FromBody] string userMessage)
//        //{
//        //    try
//        //    {
//        //        // הוספת השאלה החדשה להיסטוריית השיחה
//        //        _chatHistory.Messages.Add(new { role = "user", content = userMessage });

//        //        // בודקים אם השיחה מתחילה ומוסיפים את התגובה של המערכת אם צריך
//        //        if (_chatHistory.Messages.Count == 1)
//        //        {
//        //            _chatHistory.Messages.Insert(0, new { role = "system", content = "אתה מומחה מרצים ושעורי תורה" });
//        //        }

//        //        // הכנת המודל לשליחה
//        //        var prompt = new
//        //        {
//        //            model = "gpt-4o-mini",
//        //            messages = _chatHistory.Messages
//        //        };

//        //        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//        //        {
//        //            Content = JsonContent.Create(prompt)
//        //        };
//        //        request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//        //        // שליחת הבקשה ל-API
//        //        var response = await client.SendAsync(request);

//        //        if (!response.IsSuccessStatusCode)
//        //        {
//        //            var responseContent = await response.Content.ReadAsStringAsync();
//        //            throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
//        //        }

//        //        var responseContent1 = await response.Content.ReadAsStringAsync();

//        //        // מוסיפים את התשובה להיסטוריה של השיחה
//        //        _chatHistory.Messages.Add(new { role = "assistant", content = responseContent1 });

//        //        return Ok(responseContent1); // החזרת התוכן כהצלחה
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        Console.WriteLine($"שגיאה: {ex.Message}");
//        //        return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
//        //    }
//        //}
//        [HttpPost("chat")]
//        //public async Task<IActionResult> Chat([FromBody] string userMessage)
//        //{
//        //    try
//        //    {
//        //        // שליפת שיעורים רלוונטיים מה-DB
//        //        //var lessons = await _dbContext.Lessons
//        //        //    .OrderBy(l => l.LessonId)
//        //        //    .Take(10)
//        //        //    .Select(l => new { l.LessonTitle, l.LessonLecturer, l.LessonName })
//        //        //    .ToListAsync();
//        //        var lessons = await _dbContext.Lessons
//        //        .Where(l => l.LessonTitle.Contains(userMessage) ||
//        //        l.LessonLecturer.Contains(userMessage) ||
//        //        l.LessonName.Contains(userMessage))
//        //       .Take(10)
//        //       .ToListAsync();

//        //        var lessonsSummary = string.Join("\n", lessons.Select(l =>
//        //            $"- {l.LessonTitle} מאת {l.LessonLecturer}: {l.LessonName}"
//        //        ));

//        //        var systemMessage = $"אתה מומחה מרצים ושעורי תורה. הנה רשימת שיעורים:\n{lessonsSummary}";

//        //        // בניית ההיסטוריה של השיחה
//        //        var messages = new List<object>
//        //{
//        //    new { role = "system", content = systemMessage },
//        //    new { role = "user", content = userMessage }
//        //};

//        //        var prompt = new
//        //        {
//        //            model = "gpt-4o-mini",
//        //            messages = messages
//        //        };

//        //        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//        //        {
//        //            Content = JsonContent.Create(prompt)
//        //        };
//        //        request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//        //        var response = await client.SendAsync(request);

//        //        if (!response.IsSuccessStatusCode)
//        //        {
//        //            var responseContent = await response.Content.ReadAsStringAsync();
//        //            return StatusCode((int)response.StatusCode, responseContent);
//        //        }

//        //        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
//        //        var answer = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

//        //        return Ok(new { answer });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, $"שגיאה: {ex.Message}");
//        //    }
//        //}
//        public async Task<IActionResult> Chat([FromBody] string userMessage)
//        {
//            try
//            {
//                if (string.IsNullOrWhiteSpace(userMessage))
//                    return BadRequest("יש להזין טקסט לחיפוש");

//                var lessons = await _dbContext.Lessons  
//    .Where(l =>
//        l.LessonTitle.Contains(userMessage) ||
//        l.LessonName.Contains(userMessage) ||
//        l.LessonLecturer.LecturerName.Contains(userMessage)
//    )
//    .Take(10)
//    .ToListAsync();

//                var lessonsSummary = string.Join("\n", lessons.Select(l =>
//                    $"- {l.LessonTitle} מאת {l.LessonLecturer}: {l.LessonName}"
//                ));

//                var systemMessage = $"אתה מומחה מרצים ושעורי תורה. הנה רשימת שיעורים:\n{lessonsSummary}";

//                var messages = new List<object>
//        {
//            new { role = "system", content = systemMessage },
//            new { role = "user", content = userMessage }
//        };

//                var prompt = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = messages
//                };

//                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(prompt)
//                };
//                request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//                var response = await client.SendAsync(request);

//                if (!response.IsSuccessStatusCode)
//                {
//                    var responseContent = await response.Content.ReadAsStringAsync();
//                    return StatusCode((int)response.StatusCode, responseContent);
//                }

//                var json = await response.Content.ReadFromJsonAsync<JsonElement>();
//                var answer = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

//                return Ok(new { answer });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"שגיאה: {ex.Message}");
//            }
//        }


//    }
//}

//using AudioLectures.Core.Models;
//using AudioLectures.Data;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Text.Json;

//namespace AudioLectures.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ChatApiController : Controller
//    {
//        private readonly string _apiKey;
//        private readonly HttpClient client = new HttpClient();
//        private readonly string myApiKey = "";
//        private static ChatHistory _chatHistory = new ChatHistory();
//        private static DataContext _dbContext = new DataContext();
//        public ChatApiController(IConfiguration configuration)
//        {
//            _apiKey = configuration["OpenAI:ApiKey"];
//        }

//        [HttpGet]
//        public async Task<IActionResult> Get()
//        {
//            try
//            {
//                var prompt = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = new[] {
//                    new { role = "system", content = "אתה מומחה מרצים ושעורי תורה" },
//                    new { role = "user", content = "מה השעור הראשון של הרב בסיס" }
//                }
//                };

//                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(prompt)
//                };
//                request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//                var response = await client.SendAsync(request);

//                if (!response.IsSuccessStatusCode)
//                {
//                    var errorDetails = await response.Content.ReadAsStringAsync();
//                    return StatusCode((int)response.StatusCode, $"שגיאה מה-API: {errorDetails}");
//                }

//                // חילוץ תוכן התשובה
//                var json = await response.Content.ReadFromJsonAsync<JsonElement>();
//                var content = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

//                return Ok(content);
//            }
//            catch (HttpRequestException httpEx)
//            {
//                Console.WriteLine($"שגיאת רשת: {httpEx.Message}");
//                return StatusCode(500, "בעיה בחיבור ל-API.");
//            }
//            catch (JsonException jsonEx)
//            {
//                Console.WriteLine($"שגיאה בפרסום JSON: {jsonEx.Message}");
//                return StatusCode(500, "שגיאה בפענוח הנתונים.");
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"שגיאה כללית: {ex.Message}");
//                return StatusCode(500, "שגיאה כללית במהלך הבקשה.");
//            }
//        }


//        public async Task<IActionResult> Chat([FromBody] string userMessage)
//        {
//            try
//            {
//                if (string.IsNullOrWhiteSpace(userMessage))
//                    return BadRequest("יש להזין טקסט לחיפוש");

//                var lessons = await _dbContext.Lessons
//                .Where(l =>
//                    l.LessonTitle.Contains(userMessage) ||
//                    l.LessonName.Contains(userMessage) ||
//                    l.LessonLecturer.LecturerName.Contains(userMessage)
//                )
//                .Take(10)
//                .ToListAsync();

//                var lessonsSummary = string.Join("\n", lessons.Select(l =>
//                    $"- {l.LessonTitle} מאת {l.LessonLecturer}: {l.LessonName}"
//                ));

//                var systemMessage = $"אתה מומחה מרצים ושעורי תורה. הנה רשימת שיעורים:\n{lessonsSummary}";

//                var messages = new List<object>
//        {
//            new { role = "system", content = systemMessage },
//            new { role = "user", content = userMessage }
//        };

//                var prompt = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = messages
//                };

//                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(prompt)
//                };
//                request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//                var response = await client.SendAsync(request);

//                if (!response.IsSuccessStatusCode)
//                {
//                    var responseContent = await response.Content.ReadAsStringAsync();
//                    return StatusCode((int)response.StatusCode, responseContent);
//                }

//                var json = await response.Content.ReadFromJsonAsync<JsonElement>();
//                var answer = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

//                return Ok(new { answer });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"שגיאה: {ex.Message}");
//            }
//        }
//    }
//}

using AudioLectures.Core.Models;
using AudioLectures.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AudioLectures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatApiController : ControllerBase
    {
        //    private readonly string _apiKey;
        //    private readonly HttpClient _client;
        //    private readonly DataContext _dbContext;

        //    public ChatApiController(IConfiguration configuration, DataContext dbContext)
        //    {
        //        _apiKey = configuration["OpenAI:ApiKey"] ?? throw new Exception("OpenAI API key missing from configuration.");
        //        _client = new HttpClient();
        //        _dbContext = dbContext;
        //    }

        //    [HttpGet]
        //    public async Task<IActionResult> Get()
        //    {
        //        try
        //        {
        //            var prompt = new
        //            {
        //                model = "gpt-4o-mini",
        //                messages = new[] {
        //                    new { role = "system", content = "אתה מומחה מרצים ושעורי תורה" },
        //                    new { role = "user", content = "מה השעור הראשון של הרב בסיס" }
        //                }
        //            };

        //            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        //            {
        //                Content = JsonContent.Create(prompt)
        //            };
        //            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

        //            var response = await _client.SendAsync(request);

        //            if (!response.IsSuccessStatusCode)
        //            {
        //                var errorDetails = await response.Content.ReadAsStringAsync();
        //                return StatusCode((int)response.StatusCode, $"שגיאה מה-API: {errorDetails}");
        //            }

        //            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        //            var content = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

        //            return Ok(content);
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, $"שגיאה: {ex.Message}");
        //        }
        //    }

        //    [HttpPost("chat")]
        //    public async Task<IActionResult> Chat([FromBody] string userMessage)
        //    {
        //        try
        //        {
        //            if (string.IsNullOrWhiteSpace(userMessage))
        //                return BadRequest("יש להזין טקסט לחיפוש");

        //            var lessons = await _dbContext.Lessons
        //                .Include(l => l.LessonLecturer)
        //                .Where(l =>
        //                    l.LessonTitle.Contains(userMessage) ||
        //                    l.LessonName.Contains(userMessage) ||
        //                    l.LessonLecturer.LecturerName.Contains(userMessage)
        //                )
        //                .Take(10)
        //                .ToListAsync();

        //            var lessonsSummary = string.Join("\n", lessons.Select(l =>
        //                $"- {l.LessonTitle} מאת {l.LessonLecturer.LecturerName}: {l.LessonName}"
        //            ));

        //            var systemMessage = $"אתה מומחה מרצים ושעורי תורה. הנה רשימת שיעורים:\n{lessonsSummary}";

        //            var messages = new List<object>
        //            {
        //                new { role = "system", content = systemMessage },
        //                new { role = "user", content = userMessage }
        //            };

        //            var prompt = new
        //            {
        //                model = "gpt-4o-mini",
        //                messages = messages
        //            };

        //            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        //            {
        //                Content = JsonContent.Create(prompt)
        //            };
        //            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

        //            var response = await _client.SendAsync(request);

        //            if (!response.IsSuccessStatusCode)
        //            {
        //                var responseContent = await response.Content.ReadAsStringAsync();
        //                return StatusCode((int)response.StatusCode, responseContent);
        //            }

        //            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        //            var answer = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

        //            return Ok(new { answer });
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, $"שגיאה: {ex.Message}");
        //        }
        //    }


       
            private readonly string _apiKey;
            private readonly HttpClient _client;
            private readonly DataContext _dbContext;

            public ChatApiController(IConfiguration configuration, DataContext dbContext)
            {
                _apiKey = configuration["OpenAI:ApiKey"] ?? throw new Exception("OpenAI API key missing from configuration.");
                _client = new HttpClient();
                _dbContext = dbContext;
            }

            [HttpGet]
            public async Task<IActionResult> Get()
            {
                try
                {
                    var prompt = new
                    {
                        model = "gpt-4o-mini",
                        messages = new[] {
                        new { role = "system", content = "אתה מומחה מרצים ושעורי תורה" },
                        new { role = "user", content = "מה השעור הראשון של הרב בסיס" }
                    }
                    };

                    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                    {
                        Content = JsonContent.Create(prompt)
                    };
                    request.Headers.Add("Authorization", $"Bearer {_apiKey}");

                    var response = await _client.SendAsync(request);

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorDetails = await response.Content.ReadAsStringAsync();
                        return StatusCode((int)response.StatusCode, $"שגיאה מה-API: {errorDetails}");
                    }

                    var json = await response.Content.ReadFromJsonAsync<JsonElement>();
                    var content = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

                    return Ok(content);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"שגיאה: {ex.Message}");
                }
            }

            [HttpPost("chat")]
            public async Task<IActionResult> Chat([FromBody] string userMessage)
            {
                try
                {
                    if (string.IsNullOrWhiteSpace(userMessage))
                        return BadRequest("יש להזין טקסט לחיפוש");

                    var lessons = await _dbContext.Lessons
                        .Include(l => l.LessonLecturer)
                        .Where(l =>
                            l.LessonTitle.Contains(userMessage) ||
                            l.LessonName.Contains(userMessage) ||
                            l.LessonLecturer.LecturerName.Contains(userMessage)
                        )
                        .Take(10)
                        .ToListAsync();

                    var lessonsSummary = string.Join("\n", lessons.Select(l =>
                        $"- {l.LessonTitle} מאת {l.LessonLecturer.LecturerName}: {l.LessonName}"
                    ));

                    var systemMessage = $"אתה מומחה מרצים ושעורי תורה. הנה רשימת שיעורים:\n{lessonsSummary}";

                    var messages = new List<object>
                {
                    new { role = "system", content = systemMessage },
                    new { role = "user", content = userMessage }
                };

                    var prompt = new
                    {
                        model = "gpt-4o-mini",
                        messages = messages
                    };

                    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                    {
                        Content = JsonContent.Create(prompt)
                    };
                    request.Headers.Add("Authorization", $"Bearer {_apiKey}");

                    var response = await _client.SendAsync(request);

                    if (!response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();
                        return StatusCode((int)response.StatusCode, responseContent);
                    }

                    var json = await response.Content.ReadFromJsonAsync<JsonElement>();
                    var answer = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

                    return Ok(new { answer });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"שגיאה: {ex.Message}");
                }
            }
        }
    }








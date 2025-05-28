using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Models
{
    public class ChatRequest
    {
        public string Message { get; set; }
        public string SystemRole { get; set; }
    }
    public class ChatHistory
    {

        public List<dynamic> Messages { get; set; } = new List<dynamic>();

    }
    public class ChatResponse
    {
        public string Message { get; set; }
    }

    public class MusicRecommendationRequest
    {
        public string Preferences { get; set; }
    }

}

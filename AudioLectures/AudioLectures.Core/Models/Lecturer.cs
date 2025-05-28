using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Models
{
    public class Lecturer
    {
        [Key]
        public int LecturerId { get; set; }
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string LecturerName { get; set; }
        public List<Lesson> LecturerLessons { get; set; }
      
    }
}

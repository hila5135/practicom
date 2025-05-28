using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Core.Models
{
    public class RegisterModel
    {
     public string UserName { get; set; }
    public string UserPassword { get; set; }
    public string UserEmail { get; set; }
    }
}

using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AudioLectures.Core.Models;
using System.Runtime;

namespace AudioLectures.Service
{
    public class EmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var mail = new MailMessage();
            mail.From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName); ;
            mail.To.Add(to);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port)
            {
                Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.Password),
                EnableSsl = true
            };

            await smtp.SendMailAsync(mail);
        }

    }
}

using AudioLectures.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public DbSet<Lecturer> lecturers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_db");
        }
    }
}

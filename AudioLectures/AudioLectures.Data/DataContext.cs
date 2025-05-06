using AudioLectures.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AudioLectures.Data
{
    //public class DataContext : DbContext
    //{
    //    public DbSet<Lecturer> Lecturers { get; set; }  
    //    public DbSet<User> Users { get; set; }
    //    public DbSet<Lesson> Lessons { get; set; }
    //    public DataContext(DbContextOptions<DataContext> options) : base(options)
    //    {
    //    }



    //    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    //{
    //    //    optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_db");
    //    //}

    //}

    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<UserLesson> UserLessons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserLesson>()
                .HasKey(ul => new { ul.UserId, ul.LessonId });

            modelBuilder.Entity<UserLesson>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.UserLessons)
                .HasForeignKey(ul => ul.UserId);

            modelBuilder.Entity<UserLesson>()
                .HasOne(ul => ul.Lesson)
                .WithMany(l => l.LessonUsers)
                .HasForeignKey(ul => ul.LessonId);
        }
    }

}

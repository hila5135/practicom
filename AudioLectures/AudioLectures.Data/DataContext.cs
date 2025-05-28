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
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Lecturer>(builder =>
            {
                builder.Property(l => l.LecturerName)
                       .HasColumnType("varchar(255)")  // מתאם ל-MySQL
                       .IsRequired();
            });
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_db");
        //}

    }
}

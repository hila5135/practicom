﻿// <auto-generated />
using System;
using AudioLectures.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20250319172320_AddLessonNameColumn")]
    partial class AddLessonNameColumn
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AudioLectures.Core.Models.Lecturer", b =>
                {
                    b.Property<int>("LecturerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LecturerId"));

                    b.Property<string>("LecturerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LecturerId");

                    b.ToTable("Lecturers");
                });

            modelBuilder.Entity("AudioLectures.Core.Models.Lesson", b =>
                {
                    b.Property<int>("LessonId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LessonId"));

                    b.Property<int>("LessonDownloadCount")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("LessonDuration")
                        .HasColumnType("time");

                    b.Property<int>("LessonLecturerId")
                        .HasColumnType("int");

                    b.Property<int>("LessonListenersCount")
                        .HasColumnType("int");

                    b.Property<string>("LessonName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LessonReleaseDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LessonTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LessonUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LessonId");

                    b.HasIndex("LessonLecturerId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("AudioLectures.Core.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserRole")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LessonUser", b =>
                {
                    b.Property<int>("LessonUsersUserId")
                        .HasColumnType("int");

                    b.Property<int>("UserLessonsLessonId")
                        .HasColumnType("int");

                    b.HasKey("LessonUsersUserId", "UserLessonsLessonId");

                    b.HasIndex("UserLessonsLessonId");

                    b.ToTable("LessonUser");
                });

            modelBuilder.Entity("AudioLectures.Core.Models.Lesson", b =>
                {
                    b.HasOne("AudioLectures.Core.Models.Lecturer", "LessonLecturer")
                        .WithMany("LecturerLessons")
                        .HasForeignKey("LessonLecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LessonLecturer");
                });

            modelBuilder.Entity("LessonUser", b =>
                {
                    b.HasOne("AudioLectures.Core.Models.User", null)
                        .WithMany()
                        .HasForeignKey("LessonUsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AudioLectures.Core.Models.Lesson", null)
                        .WithMany()
                        .HasForeignKey("UserLessonsLessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AudioLectures.Core.Models.Lecturer", b =>
                {
                    b.Navigation("LecturerLessons");
                });
#pragma warning restore 612, 618
        }
    }
}

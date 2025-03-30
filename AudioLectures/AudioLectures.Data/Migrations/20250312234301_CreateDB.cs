using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "lecturers",
                columns: table => new
                {
                    LecturerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LecturerName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lecturers", x => x.LecturerId);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserRole = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "lessons",
                columns: table => new
                {
                    LessonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LessonTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LessonLecturerId = table.Column<int>(type: "int", nullable: false),
                    LessonUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LessonRealeaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LessonListenersCount = table.Column<int>(type: "int", nullable: false),
                    DownloadCount = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lessons", x => x.LessonId);
                    table.ForeignKey(
                        name: "FK_lessons_lecturers_LessonLecturerId",
                        column: x => x.LessonLecturerId,
                        principalTable: "lecturers",
                        principalColumn: "LecturerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_lessons_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_lessons_LessonLecturerId",
                table: "lessons",
                column: "LessonLecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_lessons_UserId",
                table: "lessons",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "lessons");

            migrationBuilder.DropTable(
                name: "lecturers");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}

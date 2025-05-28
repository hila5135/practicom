using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Lecturers",
                columns: table => new
                {
                    LecturerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LecturerName = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.LecturerId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserEmail = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserPassword = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserRole = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    LessonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LessonName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LessonTitle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LessonDuration = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    LessonReleaseDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LessonListenersCount = table.Column<int>(type: "int", nullable: false),
                    LessonDownloadCount = table.Column<int>(type: "int", nullable: false),
                    LessonUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LessonLecturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.LessonId);
                    table.ForeignKey(
                        name: "FK_Lessons_Lecturers_LessonLecturerId",
                        column: x => x.LessonLecturerId,
                        principalTable: "Lecturers",
                        principalColumn: "LecturerId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LessonUser",
                columns: table => new
                {
                    LessonUsersUserId = table.Column<int>(type: "int", nullable: false),
                    UserLessonsLessonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonUser", x => new { x.LessonUsersUserId, x.UserLessonsLessonId });
                    table.ForeignKey(
                        name: "FK_LessonUser_Lessons_UserLessonsLessonId",
                        column: x => x.UserLessonsLessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonUser_Users_LessonUsersUserId",
                        column: x => x.LessonUsersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_LessonLecturerId",
                table: "Lessons",
                column: "LessonLecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonUser_UserLessonsLessonId",
                table: "LessonUser",
                column: "UserLessonsLessonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonUser");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Lecturers");
        }
    }
}

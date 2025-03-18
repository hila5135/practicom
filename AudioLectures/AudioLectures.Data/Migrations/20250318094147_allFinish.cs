using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    /// <inheritdoc />
    public partial class allFinish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lessons_lecturers_LessonLecturerId",
                table: "lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_lessons_users_UserId",
                table: "lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lessons",
                table: "lessons");

            migrationBuilder.DropIndex(
                name: "IX_lessons_UserId",
                table: "lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lecturers",
                table: "lecturers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "lessons");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "lessons",
                newName: "Lessons");

            migrationBuilder.RenameTable(
                name: "lecturers",
                newName: "Lecturers");

            migrationBuilder.RenameColumn(
                name: "LessonRealeaseDate",
                table: "Lessons",
                newName: "LessonReleaseDate");

            migrationBuilder.RenameIndex(
                name: "IX_lessons_LessonLecturerId",
                table: "Lessons",
                newName: "IX_Lessons_LessonLecturerId");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "LessonDuration",
                table: "Lessons",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons",
                column: "LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lecturers",
                table: "Lecturers",
                column: "LecturerId");

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
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonUser_UserLessonsLessonId",
                table: "LessonUser",
                column: "UserLessonsLessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Lecturers_LessonLecturerId",
                table: "Lessons",
                column: "LessonLecturerId",
                principalTable: "Lecturers",
                principalColumn: "LecturerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Lecturers_LessonLecturerId",
                table: "Lessons");

            migrationBuilder.DropTable(
                name: "LessonUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lecturers",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "LessonDuration",
                table: "Lessons");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Lessons",
                newName: "lessons");

            migrationBuilder.RenameTable(
                name: "Lecturers",
                newName: "lecturers");

            migrationBuilder.RenameColumn(
                name: "LessonReleaseDate",
                table: "lessons",
                newName: "LessonRealeaseDate");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_LessonLecturerId",
                table: "lessons",
                newName: "IX_lessons_LessonLecturerId");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "lessons",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_lessons",
                table: "lessons",
                column: "LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_lecturers",
                table: "lecturers",
                column: "LecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_lessons_UserId",
                table: "lessons",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_lessons_lecturers_LessonLecturerId",
                table: "lessons",
                column: "LessonLecturerId",
                principalTable: "lecturers",
                principalColumn: "LecturerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessons_users_UserId",
                table: "lessons",
                column: "UserId",
                principalTable: "users",
                principalColumn: "UserId");
        }
    }
}

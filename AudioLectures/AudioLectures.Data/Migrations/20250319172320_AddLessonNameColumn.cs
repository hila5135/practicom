using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddLessonNameColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LessonName",
                table: "Lessons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LessonName",
                table: "Lessons");
        }
    }
}

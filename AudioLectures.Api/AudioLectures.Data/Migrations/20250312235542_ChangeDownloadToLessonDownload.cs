using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioLectures.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDownloadToLessonDownload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DownloadCount",
                table: "lessons",
                newName: "LessonDownloadCount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LessonDownloadCount",
                table: "lessons",
                newName: "DownloadCount");
        }
    }
}

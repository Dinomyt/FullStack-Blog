using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Tag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "UserInfo");

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "BlogInfo",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tag",
                table: "BlogInfo");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "UserInfo",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

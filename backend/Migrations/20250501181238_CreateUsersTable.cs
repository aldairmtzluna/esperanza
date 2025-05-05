using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateUsersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id_user = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name_user = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    last_name_user = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email_user = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telephone_number_user = table.Column<long>(type: "bigint", nullable: true),
                    created_at_user = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at_user = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id_user);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

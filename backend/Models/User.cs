using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("id_user")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("first_name_user")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        [Column("last_name_user")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [Column("email_user")]
        public string Email { get; set; }

        [Column("telephone_number_user")]
        public long? TelephoneNumber { get; set; } 

        [Required]
        [Column("created_at_user")]
        public DateTime CreatedAt { get; set; }

        [Required]
        [Column("updated_at_user")]
        public DateTime UpdatedAt { get; set; }
    }
}

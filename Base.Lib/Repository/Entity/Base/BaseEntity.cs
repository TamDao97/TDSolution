using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.Lib.Repository.Entity.Base
{
    public class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModify { get; set; }
        public Guid CreatedUserId { get; set; }
        public Guid ModifyUserId { get; set; }
        public bool IsDeleted { get; set; }
        public int Order { get; set; }
    }
}
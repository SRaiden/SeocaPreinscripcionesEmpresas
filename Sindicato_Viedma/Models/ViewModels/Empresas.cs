using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class Empresas
    {
        [Key, Column("IdEmpresa")]
        public int IdEmpresa { get; set; }

        [Display(Name = "CUIT")]
        public string CUIT { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Sucursal")]
        public int Sucursal { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Cuenta")]
        public int Cuenta { get; set; }

        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "RazonSocial")]
        public string RazonSocial { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "NombreFantasia")]
        public string NombreFantasia { get; set; }

        [Display(Name = "Domicilio")]
        public string Domicilio { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Provincia")]
        public string Provincia { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Localidad")]
        public string Localidad { get; set; }

        [Display(Name = "CP")]
        public int CP { get; set; }

        [Display(Name = "Telefono")]
        public string Telefono { get; set; }

        [Display(Name = "Contacto")]
        public string Contacto { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Email")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Formato Incorrecto")]
        public string Email { get; set; }

        [Display(Name = "HorarioAtencion")]
        public string HorarioAtencion { get; set; }

        [Display(Name = "Comentario")]
        public string Comentario { get; set; }
    }
}
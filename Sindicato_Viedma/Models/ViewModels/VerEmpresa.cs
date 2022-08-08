using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class VerEmpresa
    {

        [Display(Name = "CUIT")]
        public string CUIT { get; set; }

        [Display(Name = "Sucursal")]
        public int Sucursal { get; set; }

        [Display(Name = "Cuenta")]
        public int Cuenta { get; set; }

        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RazonSocial")]
        public string RazonSocial { get; set; }

        [Display(Name = "NombreFantasia")]
        public string NombreFantasia { get; set; }

        [Display(Name = "Domicilio")]
        public string Domicilio { get; set; }

        [Display(Name = "Provincia")]
        public string Provincia { get; set; }

        [Display(Name = "Localidad")]
        public string Localidad { get; set; }

        [Display(Name = "CP")]
        public int CP { get; set; }

        [Display(Name = "Telefono")]
        public string Telefono { get; set; }

        [Display(Name = "Contacto")]
        public string Contacto { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "HorarioAtencion")]
        public string HorarioAtencion { get; set; }

        [Display(Name = "Comentario")]
        public string Comentario { get; set; }


    }
}
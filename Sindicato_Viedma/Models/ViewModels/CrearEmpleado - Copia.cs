using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class CrearEmpleado
    {
        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Apellido")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "TipoDoc")]
        public int TipoDoc { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "CUIL")]
        public string CUIL { get; set; }

        [Display(Name = "Sexo")]
        public string Sexo { get; set; }

        [Display(Name = "Fecha_Nacimiento")]
        public DateTime Fecha_Nacimiento { get; set; }

        [Display(Name = "Categoria")]
        public int Categoria { get; set; }

        [Display(Name = "SubCategoria")]
        public int SubCategoria { get; set; }

        [Display(Name = "Fecha_Ingreso")]
        public DateTime Fecha_Ingreso { get; set; }

        [Display(Name = "Remuneracion")]
        public decimal Remuneracion { get; set; }

        [Display(Name = "NoRemuneracion")]
        public decimal NoRemuneracion { get; set; }

        [Display(Name = "Afiliado")]
        public bool Afiliado { get; set; }

        [Display(Name = "Estado")]
        public int Estado { get; set; }

        [Display(Name = "Activo")]
        public Boolean Activo { get; set; }

        [Display(Name = "Fecha_Baja")]
        public string Fecha_Baja { get; set; }
    }
}
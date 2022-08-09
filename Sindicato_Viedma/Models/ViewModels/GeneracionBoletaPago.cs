using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class GeneracionBoletaPago
    {
        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Localidad")]
        public string Localidad { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Empleador")]
        public string Empleador { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Cuit")]
        public string Cuit { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Domicilio")]
        public string Domicilio { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Telefono")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "Obligatorio")]
        [Display(Name = "Mail")]
        public string Mail { get; set; }



        // CuotaMensual
        [Display(Name = "Jornada8Total")]
        public string Jornada8Total { get; set; }
        [Display(Name = "Jornada8Cantidad")]
        public string Jornada8Cantidad { get; set; }
        [Display(Name = "Jornada8TotalAfiliado")]
        public string Jornada8TotalAfiliado { get; set; }
        [Display(Name = "Jornada8CantidadAfiliado")]
        public string Jornada8CantidadAfiliado { get; set; }

        [Display(Name = "Jornada6Total")]
        public string Jornada6Total { get; set; }
        [Display(Name = "Jornada6Cantidad")]
        public string Jornada6Cantidad { get; set; }
        [Display(Name = "Jornada6TotalAfiliado")]
        public string Jornada6TotalAfiliado { get; set; }
        [Display(Name = "Jornada6CantidadAfiliado")]
        public string Jornada6CantidadAfiliado { get; set; }

        [Display(Name = "Jornada4Total")]
        public string Jornada4Total { get; set; }
        [Display(Name = "Jornada4Cantidad")]
        public string Jornada4Cantidad { get; set; }
        [Display(Name = "Jornada4TotalAfiliado")]
        public string Jornada4TotalAfiliado { get; set; }
        [Display(Name = "Jornada4CantidadAfiliado")]
        public string Jornada4CantidadAfiliado { get; set; }


        [Display(Name = "Art100")]
        public string Art100 { get; set; }
        [Display(Name = "TurRec")]
        public string TurRec { get; set; }
        [Display(Name = "SeguroSepelio")]
        public string SeguroSepelio { get; set; }

        [Display(Name = "Periodo")]
        public DateTime Periodo { get; set; }
        [Display(Name = "DiasMora")]
        public string DiasMora { get; set; }
        [Display(Name = "MontoInteres")]
        public string MontoInteres { get; set; }

        [Display(Name = "Total")]
        public string Total { get; set; }



        // Acta
        [Display(Name = "NroActa")]
        public DateTime NroActa { get; set; }
        [Display(Name = "Cuenta")]
        public string Cuenta { get; set; }
        [Display(Name = "NroCuota")]
        public string NroCuota { get; set; }
        [Display(Name = "DiaMoraActa")]
        public string DiaMoraActa { get; set; }
        [Display(Name = "TotalActa")]
        public string TotalActa { get; set; }

    }
}
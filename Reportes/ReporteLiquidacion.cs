using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class ReporteLiquidacion
    {
        [Display(Name = "CUIT")]
        public string CUIT { get; set; }

        [Display(Name = "Domicilio")]
        public string Domicilio { get; set; }

        [Display(Name = "RazonSocial")]
        public string RazonSocial { get; set; }

        [Display(Name = "Periodo")]
        public DateTime Periodo { get; set; }

        [Display(Name = "CantAfiliado")]
        public int CantAfiliado { get; set; }

        [Display(Name = "Total_Afiliado")]
        public decimal Total_Afiliado { get; set; }

        [Display(Name = "Cuota_Sindical")]
        public decimal Cuota_Sindical { get; set; }

        [Display(Name = "Seguro_Sepelio")]
        public decimal Seguro_Sepelio { get; set; }

        [Display(Name = "CantEmpleados")]
        public int CantEmpleados { get; set; }

        [Display(Name = "Total")]
        public decimal Total { get; set; }

        [Display(Name = "Convenio")]
        public decimal Convenio { get; set; }

        [Display(Name = "RecargoMora")]
        public decimal RecargoMora { get; set; }

        [Display(Name = "InteresMora")]
        public decimal InteresMora { get; set; }

        [Display(Name = "Total_Depositar")]
        public decimal Total_Depositar { get; set; }

    }
}
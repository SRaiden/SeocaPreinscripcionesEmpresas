using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class Empresa
    {
        [Display(Name = "RazonSocial")]
        public string RazonSocial { get; set; }

        [Display(Name = "NombreFantasia")]
        public string NombreFantasia { get; set; }

        [Display(Name = "Cuit")]
        public string Cuit { get; set; }

        [Display(Name = "DomicilioReal")]
        public string DomicilioReal { get; set; }

        [Display(Name = "LocalidadReal")]
        public string LocalidadReal { get; set; }

        [Display(Name = "TelefonoReal")]
        public string TelefonoReal { get; set; }

        [Display(Name = "DomicilioLegal")]
        public string DomicilioLegal { get; set; }

        [Display(Name = "LocalidadLegal")]
        public string LocalidadLegal { get; set; }

        [Display(Name = "TelefonoLegal")]
        public string TelefonoLegal { get; set; }

        [Display(Name = "Actividad")]
        public string Actividad { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "PaginaWeb")]
        public string PaginaWeb { get; set; }

        [Display(Name = "Sucursal1")]
        public string Sucursal1 { get; set; }

        [Display(Name = "Sucursal2")]
        public string Sucursal2 { get; set; }

        [Display(Name = "Sucursal3")]
        public string Sucursal3 { get; set; }



        // TITULARES
        [Display(Name = "ApellidoNombreTitular")]
        public string ApellidoNombreTitular { get; set; }

        [Display(Name = "DomicilioParticularTitular")]
        public string DomicilioParticularTitular { get; set; }

        [Display(Name = "DocumentoTitular")]
        public string DocumentoTitular { get; set; }

        [Display(Name = "CargoEmpresaTitular")]
        public string CargoEmpresaTitular { get; set; }

        [Display(Name = "RepetirCuitEmpresaTitular")]
        public string RepetirCuitEmpresaTitular { get; set; }




        // EMPLEADOS
        [Display(Name = "ApellidoNombreEmpleado")]
        public string ApellidoNombreEmpleado { get; set; }

        [Display(Name = "ApellidoNombreTitular")]
        public string CuilEmpleado { get; set; }

        [Display(Name = "FechaIngresoEmpleado")]
        public string FechaIngresoEmpleado { get; set; }

        [Display(Name = "CategoriaEmpleado")]
        public string CategoriaEmpleado { get; set; }

        [Display(Name = "TotRemuneracionEmpleado")]
        public string TotRemuneracionEmpleado { get; set; }

        [Display(Name = "RepetirCuitEmpresaEmpleado")]
        public string RepetirCuitEmpresaEmpleado { get; set; }



        // ANTECEDENTES
        [Display(Name = "SucesoraAntecedente")]
        public string SucesoraAntecedente { get; set; }

        [Display(Name = "NumeroEmpresaAntecedente")]
        public string NumeroEmpresaAntecedente { get; set; }

        [Display(Name = "FechaTransferenciaAntecedente")]
        public string FechaTransferenciaAntecedente { get; set; }

        [Display(Name = "CalleAntecedente")]
        public string CalleAntecedente { get; set; }

        [Display(Name = "PisoAntecedente")]
        public string PisoAntecedente { get; set; }

        [Display(Name = "LocalidadAntecedente")]
        public string LocalidadAntecedente { get; set; }

        [Display(Name = "CPAntecedente")]
        public string CPAntecedente { get; set; }

        [Display(Name = "ProvinciaAntecedente")]
        public string ProvinciaAntecedente { get; set; }

        [Display(Name = "TelefonoAntecedente")]
        public string TelefonoAntecedente { get; set; }

        [Display(Name = "RepetirCuitEmpresaAntecedente")]
        public string RepetirCuitEmpresaAntecedente { get; set; }





        // CONTADORES
        [Display(Name = "NombreEstudioContador")]
        public string NombreEstudioContador { get; set; }

        [Display(Name = "DireccionContador")]
        public string DireccionContador { get; set; }

        [Display(Name = "TelefonoContador")]
        public string TelefonoContador { get; set; }

        [Display(Name = "EmailContador")]
        public string EmailContador { get; set; }

        [Display(Name = "RepetirCuitEmpresaContador")]
        public string RepetirCuitEmpresaContador { get; set; }

    }
}
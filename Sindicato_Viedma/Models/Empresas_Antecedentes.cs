//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sindicato_Viedma.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Empresas_Antecedentes
    {
        public int Id { get; set; }
        public string Sucesora { get; set; }
        public Nullable<int> NumeroEmpresa { get; set; }
        public Nullable<System.DateTime> FechaTransferencia { get; set; }
        public string Calle { get; set; }
        public string Piso { get; set; }
        public string Localidad { get; set; }
        public string CodigoPostal { get; set; }
        public string Provincia { get; set; }
        public string Telefono { get; set; }
        public Nullable<int> IdEmpresa { get; set; }
    }
}
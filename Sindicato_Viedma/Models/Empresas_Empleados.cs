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
    
    public partial class Empresas_Empleados
    {
        public int Id { get; set; }
        public string ApellidoNombre { get; set; }
        public string Cuil { get; set; }
        public Nullable<System.DateTime> FechaIngreso { get; set; }
        public string Categoria { get; set; }
        public Nullable<decimal> TotalRemuneracion { get; set; }
        public Nullable<decimal> Art_100 { get; set; }
        public Nullable<decimal> Sind { get; set; }
        public Nullable<decimal> Sepelio { get; set; }
        public string Jornada { get; set; }
        public int IdEmpresa { get; set; }
    }
}

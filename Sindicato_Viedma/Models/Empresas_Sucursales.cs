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
    
    public partial class Empresas_Sucursales
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> IdEmpresa { get; set; }
        public Nullable<int> CodigoPostal { get; set; }
        public string Localidad { get; set; }
        public string Calle { get; set; }
        public string Altura { get; set; }
        public string Telefono { get; set; }
    }
}

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
    
    public partial class SubCategoria
    {
        public int IdSubcategoria { get; set; }
        public Nullable<int> IdCategoria { get; set; }
        public string NombreSubcategoria { get; set; }
    
        public virtual Categorias Categorias { get; set; }
    }
}

﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SeocaPreinscripcionesEntities : DbContext
    {
        public SeocaPreinscripcionesEntities()
            : base("name=SeocaPreinscripcionesEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Empresas> Empresas { get; set; }
        public virtual DbSet<Empresas_Actividades> Empresas_Actividades { get; set; }
        public virtual DbSet<Empresas_Antecedentes> Empresas_Antecedentes { get; set; }
        public virtual DbSet<Empresas_Contadores> Empresas_Contadores { get; set; }
        public virtual DbSet<Empresas_Empleados> Empresas_Empleados { get; set; }
        public virtual DbSet<Empresas_Sucursales> Empresas_Sucursales { get; set; }
        public virtual DbSet<Empresas_Titulares> Empresas_Titulares { get; set; }
        public virtual DbSet<General_Localidades> General_Localidades { get; set; }
    }
}

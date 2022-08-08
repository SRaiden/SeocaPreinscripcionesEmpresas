using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Sindicato_Viedma.Models.ViewModels
{
    public class ObtenerEmpresas
    {
        public int IdEmpresa { get; set; }
        public string CUIT { get; set; }
        public int Sucursal { get; set; }
        public int Cuenta { get; set; }
        public string Password { get; set; }
        public string RazonSocial { get; set; }
        public string NombreFantasia { get; set; }
        public string Domicilio { get; set; }
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public int CP { get; set; }
        public string Telefono { get; set; }
        public string Contacto { get; set; }
        public string Email { get; set; }
        public string HorarioAtencion { get; set; }
        public string Comentario { get; set; }
    }
}
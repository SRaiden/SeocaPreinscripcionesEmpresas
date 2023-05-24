using Newtonsoft.Json.Linq;
using Sindicato_Viedma.Models;
using Sindicato_Viedma.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Sindicato_Viedma.Controllers
{
    public class HomeController : Controller
    {
        public static string codigo = "";

        //---------------------------------------//

        [HttpGet]
        public ActionResult Empresa()
        {
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities()) {
                List<Empresas_Actividades> Empresas_Actividades = db.Empresas_Actividades.ToList<Empresas_Actividades>();
                ViewData["Empresas_Actividades"] = Empresas_Actividades;

                List<General_Localidades> Localidades = db.General_Localidades.ToList<General_Localidades>();
                ViewData["Localidades"] = Localidades;

                List<General_Calificacion> CalifProf = db.General_Calificacion.ToList<General_Calificacion>();
                ViewData["CalifProf"] = CalifProf;

            }
                

            return View();
        }

        [HttpPost]
        public ActionResult Empresa(string matrizEmpresa, string matrizAntecedente = null, string matrizContador = null, string matrizEmpleado = null, string matrizTitular = null, string matrizSucursal = null)
        {
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                // EMPRESAS
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizEmpresa);
                    string RazonSocial = "", NombreFantasia = "", Cuit = "", DomicilioReal = "", LocalidadReal = "", TelefonoReal = "", Actividad = "", Email = "", PaginaWeb = "", DomicilioLegal = "", LocalidadLegal = "", TelefonoLegal = ""/*, Sucursal1 = "", Sucursal2 = "", Sucursal3 = ""*/;
                    foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                    {
                        foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                        {
                            string propiedad = jsonOPropiedades.Name;
                            if (propiedad.Equals("RazonSocial")) RazonSocial = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("NombreFantasia")) NombreFantasia = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Cuit")) Cuit = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("DomicilioReal")) DomicilioReal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("LocalidadReal")) LocalidadReal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("TelefonoReal")) TelefonoReal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Actividad")) Actividad = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Email")) Email = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("PaginaWeb")) PaginaWeb = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("DomicilioLegal")) DomicilioLegal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("LocalidadLegal")) LocalidadLegal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("TelefonoLegal")) TelefonoLegal = jsonOPropiedades.Value.ToString();

                        }
                    }

                    // Validar si se preinscribio anteriormente
                    try{
                        var Inscripcion = db.Empresas.Where(d => d.Cuit == Cuit).First();
                        if (Inscripcion != null)
                        {
                            return Json(new { success = true, responseText = "Ya hay una empresa con este mismo numero de CUIT." }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    catch (Exception)
                    {

                    }

                    string hoy = DateTime.Now.ToString("yyyy/MM/dd");

                    // GUARDAR EN LA TABLA DE EMPRESAS
                    var emp = new Empresas
                    {
                        RazonSocial = RazonSocial,
                        NombreFantasia = NombreFantasia,
                        Cuit = Cuit,
                        DomicilioReal = DomicilioReal,
                        LocalidadReal = Int32.Parse(LocalidadReal),
                        TelefonoReal = TelefonoReal,
                        Actividad = Int32.Parse(Actividad),
                        Email = Email,
                        PaginaWeb = PaginaWeb,
                        DomicilioLegal = DomicilioLegal,
                        LocalidadLegal = LocalidadLegal,
                        TelefonoLegal = TelefonoLegal,
                        Fecha = DateTime.Parse(hoy),
                        Ingresada = false,
                        Estado = "Pendiente",
                        NroEmpresa = 0
                    };

                    db.Empresas.Add(emp);
                    db.SaveChanges();

                    // Guardar Sucursales
                    // Buscar Ultimo ID Empresa
                    var idEmpresa = db.Empresas.OrderByDescending(d => d.Id).First().Id;

                    //if (Sucursal1 != "")
                    //{

                    //    var Suc = new Empresas_Sucursales
                    //    {
                    //        IdEmpresa = idEmpresa,
                    //        Nombre = Sucursal1
                    //    };

                    //    db.Empresas_Sucursales.Add(Suc);
                    //    db.SaveChanges();
                    //}
                    //if (Sucursal2 != "")
                    //{

                    //    var Suc = new Empresas_Sucursales
                    //    {
                    //        IdEmpresa = idEmpresa,
                    //        Nombre = Sucursal2
                    //    };

                    //    db.Empresas_Sucursales.Add(Suc);
                    //    db.SaveChanges();
                    //}
                    //if (Sucursal3 != "")
                    //{

                    //    var Suc = new Empresas_Sucursales
                    //    {
                    //        IdEmpresa = idEmpresa,
                    //        Nombre = Sucursal3
                    //    };

                    //    db.Empresas_Sucursales.Add(Suc);
                    //    db.SaveChanges();
                    //}
                }
                catch(Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Empresa." }, JsonRequestBehavior.AllowGet);
                }

                var ultimoId = db.Empresas.OrderByDescending(d => d.Id).First().Id;

                // ANTECEDENTES
                try {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizAntecedente);
                    }
                    catch (Exception)
                    {

                    }
                    
                    string SucesoraAntecedente = "", NumeroEmpresaAntecedente = "", FechaTransferenciaAntecedente = "", CalleAntecedente = "", PisoAntecedente = "", LocalidadAntecedente = "", CPAntecedente = "", ProvinciaAntecedente = "", TelefonoAntecedente = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("SucesoraAntecedente")) SucesoraAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("NumeroEmpresaAntecedente")) NumeroEmpresaAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("FechaTransferenciaAntecedente")) FechaTransferenciaAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CalleAntecedente")) CalleAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("PisoAntecedente")) PisoAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("LocalidadAntecedente")) LocalidadAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CPAntecedente")) CPAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("ProvinciaAntecedente")) ProvinciaAntecedente = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("TelefonoAntecedente")) TelefonoAntecedente = jsonOPropiedades.Value.ToString();
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Antecedentes
                            {
                                Sucesora = SucesoraAntecedente,
                                NumeroEmpresa = Int32.Parse(NumeroEmpresaAntecedente),
                                FechaTransferencia = DateTime.Parse(FechaTransferenciaAntecedente),
                                Calle = CalleAntecedente,
                                Piso = PisoAntecedente,
                                Localidad = LocalidadAntecedente,
                                CodigoPostal = CPAntecedente,
                                Provincia = ProvinciaAntecedente,
                                Telefono = TelefonoAntecedente,
                                IdEmpresa = ultimoId
                            };

                            db.Empresas_Antecedentes.Add(emp);
                            db.SaveChanges();
                        }

                    }
                    
                }
                catch(Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Antecedente." }, JsonRequestBehavior.AllowGet);
                }


                // CONTADORES
                try{
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizContador);
                    }
                    catch (Exception)
                    {

                    }
                    string NombreEstudioContador = "", DireccionContador = "", TelefonoContador = "", EmailContador = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("NombreEstudioContador")) NombreEstudioContador = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("DireccionContador")) DireccionContador = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("TelefonoContador")) TelefonoContador = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("EmailContador")) EmailContador = jsonOPropiedades.Value.ToString();
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Contadores
                            {
                                NomreEstudio = NombreEstudioContador,
                                Direccion = DireccionContador,
                                Telefono = TelefonoContador,
                                Email = EmailContador,
                                IdEmpresa = ultimoId
                            };

                            db.Empresas_Contadores.Add(emp);
                            db.SaveChanges();
                        }
                    }

                    
                }
                catch(Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Contador." }, JsonRequestBehavior.AllowGet);
                }


                // EMPLEADOS
                try
                {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizEmpleado);
                    }
                    catch (Exception)
                    {

                    }

                    string ApellidoNombreEmpleado = "", CuilEmpleado = "", FechaIngresoEmpleado = "", CategoriaEmpleado = "", TotRemuneracionEmpleado = "", Afiliado = "", JornadaEmpleado = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("ApellidoNombreEmpleado")) ApellidoNombreEmpleado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CuilEmpleado")) CuilEmpleado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("FechaIngresoEmpleado")) FechaIngresoEmpleado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CategoriaEmpleado")) CategoriaEmpleado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("TotRemuneracionEmpleado")) TotRemuneracionEmpleado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("Afiliado")) Afiliado = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("JornadaEmpleado")) JornadaEmpleado = jsonOPropiedades.Value.ToString();
                            }

                            if (JornadaEmpleado == "MEDIA") JornadaEmpleado = "1/2 JORNADA";
                            else JornadaEmpleado = "JORNADA COMPLETA";

                            bool afi = false;
                            if (Afiliado == "SI") afi = true;


                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Empleados
                            {
                                ApellidoNombre = ApellidoNombreEmpleado,
                                Cuil = CuilEmpleado,
                                FechaIngreso = DateTime.Parse(FechaIngresoEmpleado),
                                Categoria = Int32.Parse(CategoriaEmpleado),
                                TotalRemuneracion = decimal.Parse(TotRemuneracionEmpleado),
                                Afiliado = afi,
                                Jornada = JornadaEmpleado,
                                IdEmpresa = ultimoId
                            };

                            db.Empresas_Empleados.Add(emp);
                            db.SaveChanges();
                        }
                    }
                    
                }
                catch (Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Empleados." }, JsonRequestBehavior.AllowGet);
                }


                // TITULARES
                try
                {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizTitular);
                    }
                    catch (Exception)
                    {

                    }

                    string ApellidoNombreTitular = "", DomicilioParticularTitular = "", DocumentoTitular = "", CargoEmpresaTitular = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("ApellidoNombreTitular")) ApellidoNombreTitular = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("DomicilioParticularTitular")) DomicilioParticularTitular = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("DocumentoTitular")) DocumentoTitular = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CargoEmpresaTitular")) CargoEmpresaTitular = jsonOPropiedades.Value.ToString();
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Titulares
                            {
                                ApellidoNombre = ApellidoNombreTitular,
                                DomicilioParticular = DomicilioParticularTitular,
                                Documento = DocumentoTitular,
                                Cargo = CargoEmpresaTitular,
                                TipoDni = 1,
                                IdEmpresa = ultimoId
                            };

                            db.Empresas_Titulares.Add(emp);
                            db.SaveChanges();
                        }
                    }
                    
                }
                catch (Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Titulares." }, JsonRequestBehavior.AllowGet);
                }


                // ANTECEDENTES
                try
                {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizSucursal);
                    }
                    catch (Exception)
                    {

                    }

                    string NombreSucursal = "", CPSucursal = "", LocalidadSucursal = "", CalleSucursal = "", AlturaSucursal = "", TelefonoSucursal = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("NombreSucursal")) NombreSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CPSucursal")) CPSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("LocalidadSucursal")) LocalidadSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CalleSucursal")) CalleSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("AlturaSucursal")) AlturaSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("TelefonoSucursal")) TelefonoSucursal = jsonOPropiedades.Value.ToString();
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Sucursales
                            {
                                Nombre = NombreSucursal,
                                CodigoPostal = Int32.Parse(CPSucursal),
                                Localidad = LocalidadSucursal,
                                Calle = CalleSucursal,
                                Altura = AlturaSucursal,
                                Telefono = TelefonoSucursal,
                                IdEmpresa = ultimoId
                            };

                            db.Empresas_Sucursales.Add(emp);
                            db.SaveChanges();
                        }

                    }

                }
                catch (Exception)
                {
                    return Json(new { success = true, responseText = "Error al Preinscribir Sucursales." }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(new { success = true, responseText = "Preinscripcion Exitosa." }, JsonRequestBehavior.AllowGet);
        }
    }
}
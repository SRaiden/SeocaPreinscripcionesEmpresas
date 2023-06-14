using MimeKit;
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

                List<General_Provincias> Provincia = db.General_Provincias.Where(d => d.Id != 0).ToList<General_Provincias>();
                ViewData["Provincia"] = Provincia;

            }
                

            return View();
        }



        [HttpPost]
        public ActionResult Empresa(string matrizEmpresa, string matrizAntecedente = null, string matrizContador = null, string matrizEmpleado = null, string matrizTitular = null, string matrizSucursal = null)
        {
            string Email = "";
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                string Cuit = "";
                // EMPRESAS
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizEmpresa);
                    string RazonSocial = "", NombreFantasia = "", DomicilioReal = "", LocalidadReal = "", TelefonoReal = "", 
                        Actividad = "", PaginaWeb = "", DomicilioLegal = "", LocalidadLegal = "", TelefonoLegal = "",
                        NroReal = "", NroLegal = "";
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
                            if (propiedad.Equals("NroReal")) NroReal = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("NroLegal")) NroLegal = jsonOPropiedades.Value.ToString();
                        }
                    }

                    Cuit = Cuit.Replace("-", "");

                    // Validar si se preinscribio anteriormente
                    try
                    {
                        var Inscripcion = db.Empresas.Where(d => d.Cuit == Cuit).First();
                        if (Inscripcion != null)
                        {
                            ViewBag.error = "Ya hay una empresa cargada con este mismo numero de CUIT.";
                            return View();
                            //return Json(new { success = true, responseText = "Ya hay una empresa con este mismo numero de CUIT." }, JsonRequestBehavior.AllowGet);
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
                        Confirmada = false,
                        NroEmpresa = 0,
                        NroReal = NroReal, 
                        NroLegal = NroLegal
                    };

                    db.Empresas.Add(emp);
                    db.SaveChanges();

                    // Guardar Sucursales
                    var idEmpresa = db.Empresas.OrderByDescending(d => d.Id).First().Id;
                }
                catch(Exception)
                {
                    ViewBag.error = "Error al Preinscribir Empresa.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Empresa." }, JsonRequestBehavior.AllowGet);
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
                    
                    string SucesoraAntecedente = "", NumeroEmpresaAntecedente = "", FechaTransferenciaAntecedente = "", CalleAntecedente = "", PisoAntecedente = "", LocalidadAntecedente = "", ProvinciaAntecedente = "", TelefonoAntecedente = "";
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
                                CodigoPostal = LocalidadAntecedente,
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
                    ViewBag.error = "Error al Preinscribir Antecedente.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Antecedente." }, JsonRequestBehavior.AllowGet);
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
                    ViewBag.error = "Error al Preinscribir Contador.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Contador." }, JsonRequestBehavior.AllowGet);
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

                            CuilEmpleado = CuilEmpleado.Replace("-", "");
                            int horas = 0;

                            if (JornadaEmpleado == "MEDIA") {
                                JornadaEmpleado = "1/2 JORNADA";
                                horas = 100;
                            } 
                            else {
                                JornadaEmpleado = "JORNADA COMPLETA";
                                horas = 200;
                            } 

                            bool afi = false;
                            if (Afiliado == "True") afi = true;


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
                                IdEmpresa = ultimoId,
                                Horas = horas
                            };

                            db.Empresas_Empleados.Add(emp);
                            db.SaveChanges();
                        }
                    }
                    
                }
                catch (Exception)
                {
                    ViewBag.error = "Error al Preinscribir Empleados.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Empleados." }, JsonRequestBehavior.AllowGet);
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

                    string ApellidoNombreTitular = "", DomicilioParticularTitular = "", DocumentoTitular = "", CargoEmpresaTitular = "", LocalidadEmpresaTitular = "";
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
                                if (propiedad.Equals("LocalidadEmpresaTitular")) LocalidadEmpresaTitular = jsonOPropiedades.Value.ToString();

                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Titulares
                            {
                                ApellidoNombre = ApellidoNombreTitular,
                                DomicilioParticular = DomicilioParticularTitular,
                                Documento = DocumentoTitular,
                                Cargo = CargoEmpresaTitular,
                                Localidad = LocalidadEmpresaTitular,
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
                    ViewBag.error = "Error al Preinscribir Titulares.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Titulares." }, JsonRequestBehavior.AllowGet);
                }


                // SUCURSALES
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

                    string NombreSucursal = "", LocalidadSucursal = "", CalleSucursal = "", AlturaSucursal = "", TelefonoSucursal = "";
                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                if (propiedad.Equals("NombreSucursal")) NombreSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("LocalidadSucursal")) LocalidadSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("CalleSucursal")) CalleSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("AlturaSucursal")) AlturaSucursal = jsonOPropiedades.Value.ToString();
                                if (propiedad.Equals("TelefonoSucursal")) TelefonoSucursal = jsonOPropiedades.Value.ToString();
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                            var emp = new Empresas_Sucursales
                            {
                                Nombre = NombreSucursal,
                                CodigoPostal = Int32.Parse(LocalidadSucursal),
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
                    ViewBag.error = "Error al Preinscribir Sucursales.";
                    return View();
                    //return Json(new { success = true, responseText = "Error al Preinscribir Sucursales." }, JsonRequestBehavior.AllowGet);
                }


                // Enviar E-Mail de Codigo de Validacion
                try
                {
                    try
                    {
                        MailKit.Net.Smtp.SmtpClient smtp2 = new MailKit.Net.Smtp.SmtpClient();
                        smtp2.Connect("vps-2676239-x.dattaweb.com", 465, MailKit.Security.SecureSocketOptions.SslOnConnect);
                        smtp2.Authenticate("afiliaciones@seocaweb.com.ar", "XhkW@bK7cJ");

                        MimeMessage email = new MimeMessage();
                        email.From.Add(MailboxAddress.Parse("afiliaciones@seocaweb.com.ar"));
                        email.To.Add(MailboxAddress.Parse(Email));
                        email.Subject = "Confirmacion de Preinscripcion Afiliado";
                        email.Body = new TextPart("html") { Text = "Haga click en este enlace para confirmar su preinscripcion. http://seoca-preinscripciones.geosoft-web.com.ar/Home/Codigo?cuit=" + Cuit };

                        smtp2.Send(email);
                        smtp2.Disconnect(true);
                    }
                    catch (Exception)
                    {
                        ViewBag.message = "Error al registrarse.";
                        return View("IniciarSesion");
                    }
                }
                catch (Exception ex)
                {
                }
                
            }

            ViewBag.Email = Email;
            return View();
            //return Json(new { success = true, responseText = "Preinscripcion Exitosa. Revise su casilla de Email" + Email }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Codigo(string Cuit)
        {
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                try
                {
                    var val = db.Empresas.Where(d => d.Cuit == Cuit).First();

                    Models.Empresas adp = db.Empresas.Find(val.Id);
                    adp.Confirmada = true;

                    db.Empresas.Attach(adp);
                    db.Entry(adp).State = EntityState.Modified;//this is for modiying/update existing entry
                    db.SaveChanges();

                    codigo = "Codigo valido";
                }
                catch (Exception)
                {
                    codigo = "Codigo invalido";
                }
            }

            return View();
        }
    }
}
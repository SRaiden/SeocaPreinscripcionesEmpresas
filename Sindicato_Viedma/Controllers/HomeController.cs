using MimeKit;
using Newtonsoft.Json.Linq;
using Sindicato_Viedma.Models;
using Sindicato_Viedma.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Sindicato_Viedma.Controllers
{
    public class HomeController : Controller
    {
        public static string codigo = "";

        [HttpGet]
        public ActionResult Empresa()
        {
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                var empresasActividades = db.Empresas_Actividades.OrderBy(d => d.Descripcion).ToList();
                ViewData["Empresas_Actividades"] = empresasActividades;

                var localidades = db.General_Localidades.OrderBy(d => d.Nombre_Localidad).ToList();
                ViewData["Localidades"] = localidades;

                var califProf = db.General_Calificacion.OrderBy(d => d.Nombre).ToList();
                ViewData["CalifProf"] = califProf;

                var provincias = db.General_Provincias.Where(d => d.Id != 0).OrderBy(d => d.Nombre).ToList();
                ViewData["Provincia"] = provincias;
            }
            return View();
        }

        [HttpPost]
        public ActionResult Empresa(string matrizEmpresa, string matrizAntecedente = null, 
            string matrizContador = null, string matrizEmpleado = null, 
            string matrizTitular = null, string matrizSucursal = null, 
            HttpPostedFileBase fileHabilitacionMunicipal = null, HttpPostedFileBase fileComprobanteAfip = null, 
            HttpPostedFileBase fileContratoSocial = null, HttpPostedFileBase fileNotaEscrita = null, HttpPostedFileBase fileUltimoReciboSueldo = null)
        {
            string Email = "";
            string EmailContador = "";
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                string Cuit = "";
                // EMPRESAS
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizEmpresa);
                    string RazonSocial = "", NombreFantasia = "", DomicilioReal = "", LocalidadReal = "", TelefonoReal = "",
                        Actividad = "", PaginaWeb = "", DomicilioLegal = "", LocalidadLegal = "", CPLegal = "", TelefonoLegal = "",
                        NroReal = "", NroLegal = "", PisoReal = "", DtoReal = "", PisoLegal = "", DtoLegal = "";

                    foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                    {
                        foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                        {
                            string propiedad = jsonOPropiedades.Name;
                            switch (propiedad)
                            {
                                case "RazonSocial":
                                    RazonSocial = jsonOPropiedades.Value.ToString();
                                    break;
                                case "NombreFantasia":
                                    NombreFantasia = jsonOPropiedades.Value.ToString();
                                    break;
                                case "Cuit":
                                    Cuit = jsonOPropiedades.Value.ToString();
                                    break;
                                case "DomicilioReal":
                                    DomicilioReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "LocalidadReal":
                                    LocalidadReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "PisoReal":
                                    PisoReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "DtoReal":
                                    DtoReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "TelefonoReal":
                                    TelefonoReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "Actividad":
                                    Actividad = jsonOPropiedades.Value.ToString();
                                    break;
                                case "Email":
                                    Email = jsonOPropiedades.Value.ToString();
                                    break;
                                case "PaginaWeb":
                                    PaginaWeb = jsonOPropiedades.Value.ToString();
                                    break;
                                case "DomicilioLegal":
                                    DomicilioLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "LocalidadLegal":
                                    LocalidadLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "CPLegal":
                                    CPLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "PisoLegal":
                                    PisoLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "DtoLegal":
                                    DtoLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "TelefonoLegal":
                                    TelefonoLegal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "NroReal":
                                    NroReal = jsonOPropiedades.Value.ToString();
                                    break;
                                case "NroLegal":
                                    NroLegal = jsonOPropiedades.Value.ToString();
                                    break;
                            }
                        }
                    }

                    Cuit = Cuit.Replace("-", "");

                    // Validar si se preinscribió anteriormente
                    if (db.Empresas.Any(d => d.Cuit == Cuit))
                    {
                        ViewBag.error = "Ya hay una empresa cargada con este mismo número de CUIT.";
                        return View();
                        //return Json(new { success = true, responseText = "Ya hay una empresa con este mismo número de CUIT." }, JsonRequestBehavior.AllowGet);
                    }

                    string hoy = DateTime.Now.ToString("yyyy/MM/dd");

                    byte[] bytesHabMunicipal = null;
                    byte[] bytesComAFIP = null;
                    byte[] bytesContSocial = null;
                    byte[] bytesNotaEscrita = null;
                    byte[] bytesReciboSueldo = null;

                    string extHabMunicipal = null;
                    string extComAFIP = null;
                    string extContSocial = null;
                    string extNotaEscrita = null;
                    string extReciboSueldo = null;

                    void ReadFile(HttpPostedFileBase file, out byte[] bytes, out string extension)
                    {
                        bytes = null;
                        extension = null;
                        if (file != null)
                        {
                            var fileName = Path.GetFileName(file.FileName);
                            string[] fileParts = fileName.Split('.');
                            extension = fileParts[1];
                            using (BinaryReader br = new BinaryReader(file.InputStream))
                            {
                                bytes = br.ReadBytes(file.ContentLength);
                            }
                        }
                    }

                    ReadFile(fileHabilitacionMunicipal, out bytesHabMunicipal, out extHabMunicipal);
                    ReadFile(fileComprobanteAfip, out bytesComAFIP, out extComAFIP);
                    ReadFile(fileContratoSocial, out bytesContSocial, out extContSocial);
                    ReadFile(fileNotaEscrita, out bytesNotaEscrita, out extNotaEscrita);
                    ReadFile(fileUltimoReciboSueldo, out bytesReciboSueldo, out extReciboSueldo);

                    // GUARDAR EN LA TABLA DE EMPRESAS
                    var emp = new Empresas
                    {
                        RazonSocial = RazonSocial,
                        NombreFantasia = NombreFantasia,
                        Cuit = Cuit,
                        DomicilioReal = DomicilioReal,
                        PisoReal = PisoReal,
                        DtoReal = DtoReal,
                        LocalidadReal = Int32.Parse(LocalidadReal),
                        TelefonoReal = TelefonoReal,
                        Actividad = Int32.Parse(Actividad),
                        Email = Email,
                        PaginaWeb = PaginaWeb,
                        DomicilioLegal = DomicilioLegal,
                        LocalidadLegal = LocalidadLegal,
                        CPLegal = Int32.Parse(CPLegal),
                        DtoLegal = DtoLegal,
                        PisoLegal = PisoLegal,
                        TelefonoLegal = TelefonoLegal,
                        Fecha = DateTime.Parse(hoy),
                        Ingresada = false,
                        Estado = "Pendiente",
                        Confirmada = false,
                        NroEmpresa = 0,
                        NroReal = NroReal,
                        NroLegal = NroLegal,

                        FotoComprobanteAFIP = bytesComAFIP,
                        FotoContratoSocial = bytesContSocial,
                        FotoHabilitacionMunicipal = bytesHabMunicipal,
                        FotoNotaEscrita = bytesNotaEscrita,
                        FotoReciboSueldo = bytesReciboSueldo,
                        extensionComprobanteAFIP = extComAFIP,
                        extensionContratoSocial = extContSocial,
                        extensionHabilitacionMunicipal = extHabMunicipal,
                        extensionNotaEscrita = extNotaEscrita,
                        extensionReciboSueldo = extReciboSueldo
                    };

                    db.Empresas.Add(emp);
                    db.SaveChanges();

                    // Guardar Sucursales
                    var idEmpresa = db.Empresas.OrderByDescending(d => d.Id).First().Id;
                }
                catch (Exception)
                {
                    ViewBag.error = "Error al Preinscribir Empresa.";
                    return View();
                }

                var ultimoId = db.Empresas.OrderByDescending(d => d.Id).First().Id;

                // ANTECEDENTES
                try
                {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizAntecedente);
                    }
                    catch (Exception)
                    {

                    }

                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            string SucesoraAntecedente = "", NumeroEmpresaAntecedente = "", FechaTransferenciaAntecedente = "", CalleAntecedente = "", PisoAntecedente = "", LocalidadAntecedente = "", ProvinciaAntecedente = "", TelefonoAntecedente = "";
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                switch (propiedad)
                                {
                                    case "SucesoraAntecedente":
                                        SucesoraAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "NumeroEmpresaAntecedente":
                                        NumeroEmpresaAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "FechaTransferenciaAntecedente":
                                        FechaTransferenciaAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "CalleAntecedente":
                                        CalleAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "PisoAntecedente":
                                        PisoAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "LocalidadAntecedente":
                                        LocalidadAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "ProvinciaAntecedente":
                                        ProvinciaAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "TelefonoAntecedente":
                                        TelefonoAntecedente = jsonOPropiedades.Value.ToString();
                                        break;
                                }
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
                catch (Exception)
                {
                    ViewBag.error = "Error al Preinscribir Antecedente.";
                    return View();
                }


                // CONTADORES
                try
                {
                    JArray jsonPreservar = null;
                    try
                    {
                        jsonPreservar = JArray.Parse(matrizContador);
                    }
                    catch (Exception)
                    {

                    }

                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            string NombreEstudioContador = "", DireccionContador = "", TelefonoContador = "";
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                switch (propiedad)
                                {
                                    case "NombreEstudioContador":
                                        NombreEstudioContador = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "DireccionContador":
                                        DireccionContador = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "TelefonoContador":
                                        TelefonoContador = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "EmailContador":
                                        EmailContador = jsonOPropiedades.Value.ToString();
                                        break;
                                }
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS CONTADORES
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
                catch (Exception)
                {
                    ViewBag.error = "Error al Preinscribir Contador.";
                    return View();
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

                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            string ApellidoNombreEmpleado = "", CuilEmpleado = "", FechaIngresoEmpleado = "", CategoriaEmpleado = "", TotRemuneracionEmpleado = "", Afiliado = "", JornadaEmpleado = "";
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                switch (propiedad)
                                {
                                    case "ApellidoNombreEmpleado":
                                        ApellidoNombreEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "CuilEmpleado":
                                        CuilEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "FechaIngresoEmpleado":
                                        FechaIngresoEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "CategoriaEmpleado":
                                        CategoriaEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "TotRemuneracionEmpleado":
                                        TotRemuneracionEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "Afiliado":
                                        Afiliado = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "JornadaEmpleado":
                                        JornadaEmpleado = jsonOPropiedades.Value.ToString();
                                        break;
                                }
                            }

                            CuilEmpleado = CuilEmpleado.Replace("-", "");
                            int horas = JornadaEmpleado == "MEDIA" ? 100 : 200;
                            bool afi = Afiliado == "True";

                            // GUARDAR EN LA TABLA DE EMPRESAS EMPLEADOS
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

                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            string ApellidoNombreTitular = "", DomicilioParticularTitular = "", DocumentoTitular = "", CargoEmpresaTitular = "", LocalidadEmpresaTitular = "", EmpresaCPTitular = "";
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                switch (propiedad)
                                {
                                    case "ApellidoNombreTitular":
                                        ApellidoNombreTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "DomicilioParticularTitular":
                                        DomicilioParticularTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "DocumentoTitular":
                                        DocumentoTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "CargoEmpresaTitular":
                                        CargoEmpresaTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "LocalidadEmpresaTitular":
                                        LocalidadEmpresaTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "EmpresaCPTitular":
                                        EmpresaCPTitular = jsonOPropiedades.Value.ToString();
                                        break;
                                }
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS TITULARES
                            var emp = new Empresas_Titulares
                            {
                                ApellidoNombre = ApellidoNombreTitular,
                                DomicilioParticular = DomicilioParticularTitular,
                                Documento = DocumentoTitular,
                                Cargo = CargoEmpresaTitular,
                                Localidad = LocalidadEmpresaTitular,
                                CP = EmpresaCPTitular,
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

                    if (jsonPreservar != null)
                    {
                        foreach (JObject jsonOperaciones in jsonPreservar.Children<JObject>())
                        {
                            string NombreSucursal = "", LocalidadSucursal = "", CalleSucursal = "", AlturaSucursal = "", TelefonoSucursal = "";
                            foreach (JProperty jsonOPropiedades in jsonOperaciones.Properties())
                            {
                                string propiedad = jsonOPropiedades.Name;
                                switch (propiedad)
                                {
                                    case "NombreSucursal":
                                        NombreSucursal = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "LocalidadSucursal":
                                        LocalidadSucursal = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "CalleSucursal":
                                        CalleSucursal = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "AlturaSucursal":
                                        AlturaSucursal = jsonOPropiedades.Value.ToString();
                                        break;
                                    case "TelefonoSucursal":
                                        TelefonoSucursal = jsonOPropiedades.Value.ToString();
                                        break;
                                }
                            }

                            // GUARDAR EN LA TABLA DE EMPRESAS SUCURSALES
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
                }


                // Enviar E-Mail de Codigo de Validacion
                try
                {
                    MailKit.Net.Smtp.SmtpClient smtp2 = new MailKit.Net.Smtp.SmtpClient();
                    smtp2.Connect("vps-2676239-x.dattaweb.com", 465, MailKit.Security.SecureSocketOptions.SslOnConnect);
                    smtp2.Authenticate("afiliaciones@seocaweb.com.ar", "Hws*7YN7kB");

                    MimeMessage email = new MimeMessage();
                    email.From.Add(MailboxAddress.Parse("afiliaciones@seocaweb.com.ar"));
                    email.To.Add(MailboxAddress.Parse(Email));
                    email.To.Add(MailboxAddress.Parse(EmailContador));
                    email.Subject = "Confirmacion de Preinscripcion de Empresa";
                    email.Body = new TextPart("html") { Text = "Haga click en este enlace para confirmar su preinscripcion. http://seoca-preinscripciones.geosoft-web.com.ar/Home/Codigo?cuit=" + Cuit };

                    smtp2.Send(email);
                    smtp2.Disconnect(true);
                }
                catch (Exception ex)
                {
                    ViewBag.message = "Error al enviar Email.";
                    return View("Empresa");
                }
            }

            ViewBag.mensaje = "Preinscripcion Ingresada. Confirme el Codigo que le llego a su Email para confirmar su preinscripcion.";
            return View();
        }

        [HttpGet]
        public ActionResult Codigo(string Cuit)
        {
            using (Models.geosoftw_seocapreinscripcionesEntities db = new Models.geosoftw_seocapreinscripcionesEntities())
            {
                try
                {
                    var empresa = db.Empresas.FirstOrDefault(e => e.Cuit == Cuit);
                    if (empresa != null)
                    {
                        empresa.Confirmada = true;
                        db.SaveChanges();

                        codigo = "Codigo valido";
                    }
                    else
                    {
                        codigo = "Codigo invalido";
                    }
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
﻿using Newtonsoft.Json.Linq;
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
        [HttpGet]
        public ActionResult Empresa()
        {
            using (Models.SeocaPreinscripcionesEntities db = new Models.SeocaPreinscripcionesEntities()) {
                List<Empresas_Actividades> Empresas_Actividades = db.Empresas_Actividades.ToList<Empresas_Actividades>();
                ViewData["Empresas_Actividades"] = Empresas_Actividades;

                List<General_Localidades> Localidades = db.General_Localidades.ToList<General_Localidades>();
                ViewData["Localidades"] = Localidades;
            }
                

            return View();
        }

        [HttpPost]
        public ActionResult Empresa(string matrizEmpresa, string matrizAntecedente = null, string matrizContador = null, string matrizEmpleado = null, string matrizTitular = null)
        {
            using (Models.SeocaPreinscripcionesEntities db = new Models.SeocaPreinscripcionesEntities())
            {
                // EMPRESAS
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizEmpresa);
                    string RazonSocial = "", NombreFantasia = "", Cuit = "", DomicilioReal = "", LocalidadReal = "", TelefonoReal = "", Actividad = "", Email = "", PaginaWeb = "", DomicilioLegal = "", LocalidadLegal = "", TelefonoLegal = "", Sucursal1 = "", Sucursal2 = "", Sucursal3 = "";
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
                            if (propiedad.Equals("Sucursal1")) Sucursal1 = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Sucursal2")) Sucursal2 = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Sucursal3")) Sucursal3 = jsonOPropiedades.Value.ToString();
                        }
                    }

                    // Validar si se preinscribio anteriormente
                    try{
                        var Inscripcion = db.Empresas.Where(d => d.Cuit == Cuit).First();
                        if (Inscripcion != null)
                        {
                            ViewBag.error = "Ya hay una empresa inscripta con este mismo Cuit de Empresa";
                            return View("Empresa");
                        }
                    }
                    catch (Exception)
                    {

                    }
                    

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
                        LocalidadLegal = Int32.Parse(LocalidadLegal),
                        TelefonoLegal = TelefonoLegal,
                    };

                    db.Empresas.Add(emp);
                    db.SaveChanges();

                    // Guardar Sucursales
                    // Buscar Ultimo ID Empresa
                    var idEmpresa = db.Empresas.OrderByDescending(d => d.Id).First().Id;

                    if (Sucursal1 != "")
                    {

                        var Suc = new Empresas_Sucursales
                        {
                            IdEmpresa = idEmpresa,
                            Nombre = Sucursal1
                        };

                        db.Empresas_Sucursales.Add(Suc);
                        db.SaveChanges();
                    }
                    if (Sucursal2 != "")
                    {

                        var Suc = new Empresas_Sucursales
                        {
                            IdEmpresa = idEmpresa,
                            Nombre = Sucursal2
                        };

                        db.Empresas_Sucursales.Add(Suc);
                        db.SaveChanges();
                    }
                    if (Sucursal3 != "")
                    {

                        var Suc = new Empresas_Sucursales
                        {
                            IdEmpresa = idEmpresa,
                            Nombre = Sucursal3
                        };

                        db.Empresas_Sucursales.Add(Suc);
                        db.SaveChanges();
                    }
                }
                catch(Exception ex)
                {
                    ViewBag.error = "Error" + ex.Message;
                    return View("Empresa");
                }


                // ANTECEDENTES
                try {
                    JArray jsonPreservar = JArray.Parse(matrizAntecedente);
                    string SucesoraAntecedente = "", NumeroEmpresaAntecedente = "", FechaTransferenciaAntecedente = "", CalleAntecedente = "", PisoAntecedente = "", LocalidadAntecedente = "", CPAntecedente = "", ProvinciaAntecedente = "", TelefonoAntecedente = "";
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
                        };

                        db.Empresas_Antecedentes.Add(emp);
                        db.SaveChanges();
                    }
                }
                catch(Exception ex)
                {
                    ViewBag.error = "Error" + ex.Message;
                    return View("Empresa");
                }


                // CONTADORES
                try{
                    JArray jsonPreservar = JArray.Parse(matrizContador);
                    string NombreEstudioContador = "", DireccionContador = "", TelefonoContador = "", EmailContador = "";
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
                        };

                        db.Empresas_Contadores.Add(emp);
                        db.SaveChanges();
                    }
                }
                catch(Exception ex)
                {
                    ViewBag.error = "Error" + ex.Message;
                    return View("Empresa");
                }


                // EMPLEADOS
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizEmpleado);
                    string ApellidoNombreEmpleado = "", CuilEmpleado = "", FechaIngresoEmpleado = "", CategoriaEmpleado = "", TotRemuneracionEmpleado = "", Aporte2ArtEmpleado = "", Aporte1SindEmpleado = "", Aporte1SepEmpleado = "", JornadaEmpleado = "";
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
                            if (propiedad.Equals("Aporte2ArtEmpleado")) Aporte2ArtEmpleado = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Aporte1SindEmpleado")) Aporte1SindEmpleado = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("Aporte1SepEmpleado")) Aporte1SepEmpleado = jsonOPropiedades.Value.ToString();
                            if (propiedad.Equals("JornadaEmpleado")) JornadaEmpleado = jsonOPropiedades.Value.ToString();
                        }

                        if (JornadaEmpleado == "MEDIA") JornadaEmpleado = "1/2 JORNADA";
                        else JornadaEmpleado = "JORNADA COMPLETA";

                        // GUARDAR EN LA TABLA DE EMPRESAS ANTECEDENTES
                        var emp = new Empresas_Empleados
                        {
                            ApellidoNombre = ApellidoNombreEmpleado,
                            Cuil = CuilEmpleado,
                            FechaIngreso = DateTime.Parse(FechaIngresoEmpleado),
                            Categoria = CategoriaEmpleado,
                            TotalRemuneracion = decimal.Parse(TotRemuneracionEmpleado),
                            Art_100 = decimal.Parse(Aporte2ArtEmpleado),
                            Sind = decimal.Parse(Aporte1SindEmpleado),
                            Sepelio = decimal.Parse(Aporte1SepEmpleado),
                            Jornada = JornadaEmpleado,
                        };

                        db.Empresas_Empleados.Add(emp);
                        db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    ViewBag.error = "Error" + ex.Message;
                    return View("Empresa");
                }


                // TITULARES
                try
                {
                    JArray jsonPreservar = JArray.Parse(matrizTitular);
                    string ApellidoNombreTitular = "", DomicilioParticularTitular = "", DocumentoTitular = "", CargoEmpresaTitular = "";
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
                        };

                        db.Empresas_Titulares.Add(emp);
                        db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    ViewBag.error = "Error" + ex.Message;
                    return View("Empresa");
                }
            }

            ViewBag.error = "Ya se ha preinscripto";
            return View();
        }

    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Windows.Forms;
using Microsoft.Reporting.WinForms;
using Sindicato_Viedma.Models.ViewModels;
using Microsoft.SqlServer;
using System.IO;


namespace Reportes
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Acceso acc = new Acceso();
            string ultimoId = acc.UltimoIDLiquidacion("select top 1 idliquidacion from liquidacion order by idliquidacion desc");
            ReporteLiquidacion rl = acc.elementosLiquidacion("exec crearReporte ultimoId");

            reportViewer1.ShowParameterPrompts = true;
            reportViewer1.LocalReport.DataSources.Clear();
            ReportDataSource rdc = new ReportDataSource("DataSet1", rl);

            List<ReportParameter> parameters = new List<ReportParameter>();

            reportViewer1.LocalReport.Refresh();
            reportViewer1.LocalReport.ReportPath = Application.StartupPath + "/ReportLiquidacion.rdlc"; //Server.MapPath("~/ReportLiquidacion.rdlc");
            ReportParameter parameter = new ReportParameter("Periodo", HttpUtility.HtmlDecode(rl.Periodo.ToString("MM/yyyy")));
            reportViewer1.LocalReport.SetParameters(parameter);
            parameter = new ReportParameter("FechaImpresion", HttpUtility.HtmlDecode(DateTime.Now.ToString("dd/MM/yyyy")));
            reportViewer1.LocalReport.SetParameters(parameter);
            //parameter = new ReportParameter("stringCodBarra", HttpUtility.HtmlDecode(rl.barraRapipago));
            //reportViewer1.LocalReport.SetParameters(parameter);
            reportViewer1.LocalReport.DataSources.Add(rdc);

            Warning[] warnings;
            string mimeType = string.Empty;
            string[] streamids;
            string encoding = string.Empty;
            string filenameExtension = string.Empty;
            DateTime now = DateTime.Now;
            var bytes = reportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out filenameExtension, out streamids, out warnings);
            string file = Application.StartupPath + "\\PDFs\\" + "Liquidacion" + now.ToString("ddMMyyyy") + ".pdf";

            FileStream fs = new FileStream(file, FileMode.Create, FileAccess.Write);
            fs.Write(bytes, 0, bytes.Length);
            fs.Close();

            System.Diagnostics.Process.Start(file);

            this.reportViewer1.RefreshReport();
        }
    }
}

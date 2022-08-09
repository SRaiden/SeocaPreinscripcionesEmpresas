using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace Reportes
{
    class Acceso
    {
        public SqlConnection conexion = new SqlConnection("server=190.2.18.74;database=geosoftw_seoca_aportes;integrated security = true;User Id= geoaportes;Password=SQL_Geosoft_2020”");       // ODBC SERVIDOR   

        public DataSet ds = new DataSet();
        public SqlDataReader dr2;
        public SqlCommand comando;

        public string UltimoIDLiquidacion(string sql) // crear store proced
        {
            string valor = "";
            comando = new SqlCommand(sql, conexion);
            conexion.Open();
            SqlDataReader registro = comando.ExecuteReader();
            if (registro.Read())
            {

                valor = registro["idliquidacion"].ToString();
                conexion.Close();
            }
            else
            {
                MessageBox.Show("Error de conexion", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                conexion.Close();
                return "0";
            }
            return valor;
        }

        internal Sindicato_Viedma.Models.ViewModels.ReporteLiquidacion elementosLiquidacion(string sql)
        {
            //List<Sindicato_Viedma.Models.ViewModels.ReporteLiquidacion> listReporte = new List<Sindicato_Viedma.Models.ViewModels.ReporteLiquidacion>();
            Sindicato_Viedma.Models.ViewModels.ReporteLiquidacion ls = new Sindicato_Viedma.Models.ViewModels.ReporteLiquidacion();

            comando = new SqlCommand(sql, conexion);
            conexion.Open();
            SqlDataReader registro = comando.ExecuteReader();
            if (registro.Read())
            {
                ls.CUIT = registro["CUIT"].ToString();
                ls.Domicilio = registro["Domicilio"].ToString();
                ls.RazonSocial = registro["RazonSocial"].ToString();
                ls.Periodo = DateTime.Parse(registro["Periodo"].ToString());
                ls.CantAfiliado = Int32.Parse(registro["CantAfiliado"].ToString());
                ls.Total_Afiliado = Decimal.Parse(registro["Total_Afiliado"].ToString());
                ls.Cuota_Sindical = Decimal.Parse(registro["Cuota_Sindical"].ToString());
                ls.Seguro_Sepelio = Decimal.Parse(registro["Seguro_Sepelio"].ToString());
                ls.CantEmpleados = Int32.Parse(registro["CantEmpleados"].ToString());
                ls.Total = Decimal.Parse(registro["Total"].ToString());
                ls.Convenio = Decimal.Parse(registro["Convenio"].ToString());
                ls.RecargoMora = Decimal.Parse(registro["RecargoMora"].ToString());
                ls.InteresMora = Decimal.Parse(registro["InteresMora"].ToString());
                ls.Total_Depositar = Decimal.Parse(registro["Total_Depositar"].ToString());

                //listReporte.Add(ls);
                conexion.Close();
            }
            else
            {
                MessageBox.Show("Error de conexion", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                conexion.Close();
            }
            return ls;
        }
    }
}

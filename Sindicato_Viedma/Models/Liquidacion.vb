'------------------------------------------------------------------------------
' <auto-generated>
'     Este código se generó a partir de una plantilla.
'
'     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
'     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Collections.Generic

Partial Public Class Liquidacion
    Public Property IdLiquidacion As Integer
    Public Property IdEmpresa As Nullable(Of Integer)
    Public Property Total As Nullable(Of Decimal)
    Public Property Remunerativo As Nullable(Of Decimal)
    Public Property No_Remunerativo As Nullable(Of Decimal)
    Public Property CantEmpleados As Nullable(Of Integer)
    Public Property Convenio As Nullable(Of Decimal)
    Public Property Total_Afiliado As Nullable(Of Decimal)
    Public Property Remunerativo_Afiliado As Nullable(Of Decimal)
    Public Property No_Remunerativo_Afiliado As Nullable(Of Decimal)
    Public Property Afiliados As Nullable(Of Integer)
    Public Property Cuota_Sindical As Nullable(Of Decimal)
    Public Property Remuneracion As Nullable(Of Decimal)
    Public Property Periodo As Nullable(Of Date)
    Public Property Vencimiento As Nullable(Of Date)
    Public Property Vencimiento_Pago As Nullable(Of Date)
    Public Property Interes As Nullable(Of Decimal)
    Public Property Diferencia_Pago As Nullable(Of Integer)
    Public Property Debito_Credito As Nullable(Of Decimal)
    Public Property Motivo As String
    Public Property InteresMora As Nullable(Of Integer)
    Public Property RecargoMora As Nullable(Of Decimal)
    Public Property Total_Depositar As Nullable(Of Decimal)
    Public Property Fecha_Pagado As Nullable(Of Date)
    Public Property Lugar_Pago As Nullable(Of Integer)
    Public Property Pagado As Nullable(Of Boolean)
    Public Property Tipo_Pago As Nullable(Of Integer)

    Public Overridable Property Empresas As Empresas

End Class
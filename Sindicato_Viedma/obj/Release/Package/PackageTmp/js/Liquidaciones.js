function validarLiquidacion() {

    var opcion = confirm("¿Desea generar la liquidacion correspondiente?");
    if (opcion == true) {
        var e = document.getElementById("PeriodoMes");
        var mes = e.options[e.selectedIndex].value;
        var a = document.getElementById("PeriodoAnio");
        var anio = a.options[a.selectedIndex].value;

        var Motivo = document.getElementById("Motivo").value;
        var Remuneracion = parseInt(document.getElementById("Remuneracion").value);
        var Debito_Credito = parseFloat(document.getElementById("Debito_Credito").value);

        var InteresXPago = document.getElementById("InteresXPago").value;

        if (Debito_Credito == "") {
            document.getElementById("Debito_Credito").value = "0.00"
        }

        if (InteresXPago == "") {
            document.getElementById("InteresXPago").value = "0.00"
        }

        if (Remuneracion <= 0) {
            alert("Ingrese el monto de Remuneracion");
            return false;
        }

        if (Debito_Credito != 0 && Motivo == "") {
            alert("Ingrese un Motivo");
            return false;
        }


        if (isNaN(Debito_Credito)) {
            alert("Debe de ingresar un numero en DebitoCredito");
            return false;
        }

        if (isNaN(InteresXPago)) {
            alert("Debe de ingresar un numero en Interes Mora");
            return false;
        }

        if (mes != "" && anio != "") {
            return true;
        } else {
            alert("Debe de ingresar la fecha de periodo");
            return false;
        }

        return true;
    } else {
        return false;
    }
}

function calcularMontoTotal() {
    var convenio = parseFloat(document.getElementById("Convenio").value);
    var cuota = parseFloat(document.getElementById("Cuota_Sindical").value);

    var debitoCredito = document.getElementById("Debito_Credito").value;
    debitoCredito = debitoCredito.replace(/,/g, ".");
    if (debitoCredito == "" || isNaN(debitoCredito)) {
        document.getElementById("Debito_Credito").value = 0.00;
        debitoCredito = 0.00;
    }
    debitoCredito = parseFloat(debitoCredito);
    debitoCredito = debitoCredito.toFixed(2);
    debitoCredito = parseFloat(debitoCredito);
    document.getElementById("Debito_Credito").value = debitoCredito;
    if (debitoCredito < 0) {
        document.getElementById("Debito_Credito").value = 0.00;
        debitoCredito = 0.00;
    }

    var InteresXPago = document.getElementById("InteresXPago").value;
    InteresXPago = InteresXPago.replace(/,/g, ".");
    if (InteresXPago == "" || isNaN(InteresXPago)) {
        document.getElementById("InteresXPago").value = 0.00;
        InteresXPago = 0.00;
    }
    InteresXPago = parseFloat(InteresXPago);
    InteresXPago = InteresXPago.toFixed(2);
    InteresXPago = parseFloat(InteresXPago);
    document.getElementById("InteresXPago").value = InteresXPago;
    if (InteresXPago < 0) {
        document.getElementById("InteresXPago").value = 0.00;
        InteresXPago = 0.00;
    }

    if (document.getElementById("Seguro_Sepelio")) {
        var seguro = parseFloat(document.getElementById("Seguro_Sepelio").value);
        var total = parseFloat(convenio + cuota + seguro + debitoCredito + InteresXPago);
    } else {
        var total = parseFloat(convenio + cuota + debitoCredito + InteresXPago);
    }

    total = total.toFixed(2);
    document.getElementById("SubTotal").value = total;

    totalDepositar();
}

function totalDepositar() {
    var SubTotal = document.getElementById("SubTotal").value;
    var interesMensual = document.getElementById("InteresMensual").value;

    var total = parseFloat(SubTotal) + parseFloat(interesMensual);
    total = total.toFixed(2);

    document.getElementById("Total_Depositar").value = total;
}



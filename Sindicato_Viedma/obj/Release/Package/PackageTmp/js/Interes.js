function validarCamposActas() {
    var opcion = confirm("¿Desea ingresar el Pago de Interes?");
    if (opcion == true) {

        var PeriodoMes = document.getElementById("PeriodoMes").value;
        var PeriodoAnio = document.getElementById("PeriodoAnio").value;
        var FechaPago = document.getElementById("FechaPago").value;
        var Importe = parseFloat(document.getElementById("ImporteOriginal").value);

        var SelectMotivo = document.getElementById('IdMotivo');
        var optionMotivo = SelectMotivo.options[SelectMotivo.selectedIndex].value;

        if (PeriodoAnio == "" || PeriodoMes == "") {
            alert("Debe de ingresar el Periodo");
            return false;
        }

        if (FechaPago == "") {
            alert("Debe de ingresar la Fecha");
            return false;
        }

        if (optionMotivo == "0") {
            alert("Debe de ingresar un Motivo");
            return false;
        }

        if (Importe == "") {
            alert("Debe de ingresar un Importe");
            return false;
        }

        if (isNaN(Importe)) {
            alert("Debe de ingresar un numero en el campo Dias de Interes");
            return false;
        }

        if (Importe < 0) {
            alert("Ingrese un Importe mayor a 0");
            return false;
        }

        return true;

    } else {
        return false;
    }
}

function changeCamposInteres() {

    var ImporteOriginal = document.getElementById("ImporteOriginal").value;
    ImporteOriginal = ImporteOriginal.replace(/,/g, ".");
    if (ImporteOriginal == "" || isNaN(ImporteOriginal)) {
        document.getElementById("ImporteOriginal").value = 0.00;
    } else {
        ImporteOriginal = parseFloat(ImporteOriginal);
        ImporteOriginal = ImporteOriginal.toFixed(2);
        ImporteOriginal = parseFloat(ImporteOriginal);
        document.getElementById("ImporteOriginal").value = ImporteOriginal;
        if (ImporteOriginal < 0) {
            document.getElementById("ImporteOriginal").value = 0.00;
        }
    }

    InteresPago();
}


function comboMes() {
    var MesPeriodo = document.getElementById("PeriodoMes").value;
    var AnioPeriodo = document.getElementById("PeriodoAnio").value;
    var periodo = AnioPeriodo + "-" + MesPeriodo + "-01";
    var vencimientoss = document.getElementById("Vencimiento").value;

    var cambioAnio = periodo.substr(0, 4);
    var cambioMes = periodo.substr(5, 2);
    cambioMes -= 1;
    var cambioDia = vencimientoss.substr(8, 2);
    var cambiofecha = new Date(cambioAnio, cambioMes, cambioDia);
    cambiofecha.setMonth(cambiofecha.getMonth() + 1);

    var aa = cambiofecha.getDate();
    var bb = cambiofecha.getMonth();
    bb += 1;
    if (bb < 9) {
        bb = "0" + bb;
    }
    var cc = cambiofecha.getFullYear();
    var dd = cc + "-" + bb + "-" + aa;

    document.getElementById("Vencimiento").value = dd;
}

function InteresPago() {

    var vencimientoPago = document.getElementById("FechaPago").value;
    var today = document.getElementById("fechaActual").value;
    var vencimiento = document.getElementById("Vencimiento").value;

    var ven1 = vencimientoPago.substr(0, 4);
    var ven2 = vencimientoPago.substr(5, 2);
    ven2 -= 1;
    var ven3 = vencimientoPago.substr(8, 2);

    var today1 = today.substr(0, 4);
    var today2 = today.substr(5, 2);
    today2 -= 1;
    var today3 = today.substr(8, 2);

    var date2 = new Date(ven1, ven2, ven3);
    var hoy = new Date(today1, today2, today3);

    if (date2 < hoy) {
        alert("Debe de ingresar una fecha mayor a " + today + " en la Fecha de Pago.");
        document.getElementById("FechaPago").value = today;
        return;
    }



}



function insertarAntecedente() {
    var SucesoraAntecedente = document.getElementById("SucesoraAntecedente").value;
    var NumeroEmpresaAntecedente = document.getElementById("NumeroEmpresaAntecedente").value;
    var FechaTransferenciaAntecedente = document.getElementById("FechaTransferenciaAntecedente").value;

    var CalleAntecedente = document.getElementById("CalleAntecedente").value;
    var PisoAntecedente = document.getElementById("PisoAntecedente").value;
    var LocalidadAntecedente = document.getElementById("LocalidadAntecedente").value;
    var CPAntecedente = document.getElementById("CPAntecedente").value;
    var ProvinciaAntecedente = document.getElementById("ProvinciaAntecedente").value;
    var TelefonoAntecedente = document.getElementById("TelefonoAntecedente").value;

    var RepetirCuitEmpresaAntecedente = document.getElementById("RepetirCuitEmpresaAntecedente").value;
    var CuitGlobal = document.getElementById("Cuit").value;

    //validaciones
    if (SucesoraAntecedente == "") {
        alert("Debe de ingresar el Sucesora Antecedente");
        return false;
    }

    if (!isNaN(SucesoraAntecedente)) {
        alert("Ingrese solo letras en el campo Sucesora Antecedente");
        return false;
    }

    if (NumeroEmpresaAntecedente == "") {
        alert("Debe de ingresar el Sucesora Antecedente");
        return false;
    }

    if (isNaN(NumeroEmpresaAntecedente)) {
        alert("Ingrese solo numeros en el campo Numero Empresa");
        return false;
    }

    if (FechaTransferenciaAntecedente == "") {
        alert("Debe de ingresar la Fecha Transferencia Antecedente");
        return false;
    }

    if (LocalidadAntecedente == "") {
        alert("Debe de ingresar el Localidad Antecedente");
        return false;
    }

    if (!isNaN(LocalidadAntecedente)) {
        alert("Ingrese solo letras en el campo Localidad Antecedente");
        return false;
    }

    if (CPAntecedente == "") {
        alert("Debe de ingresar el CP Antecedente");
        return false;
    }

    if (isNaN(CPAntecedente)) {
        alert("Ingrese solo numeros en el campo CP Antecedente");
        return false;
    }

    if (ProvinciaAntecedente == "") {
        alert("Debe de ingresar el Provincia Antecedente");
        return false;
    }

    if (!isNaN(ProvinciaAntecedente)) {
        alert("Ingrese solo letras en el campo Provincia Antecedente");
        return false;
    }

    if (TelefonoAntecedente == "") {
        alert("Debe de ingresar el Telefono Antecedente");
        return false;
    }

    if (isNaN(TelefonoAntecedente)) {
        alert("Ingrese solo numeros en el campo Telefono Antecedente");
        return false;
    }


    if (CuitGlobal == RepetirCuitEmpresaAntecedente) {
        alert("Los cuit de empresa de Cuit (Empresa) y Cuit Empresa (Antecedente) no coinciden");
        return false;
    }

    for (i = 0; i < matrizAntecedente.length; i++) {
        if (matrizAntecedente[i].SucesoraAntecedente == SucesoraAntecedente) {
            alert("Ingrese una sucesora distinta");
            return false;
        }
    }

    var table = document.getElementById('bodyAntecedente');
    var x = table.insertRow(0);
    var e = table.rows.length - 1;
    var l = table.rows[e].cells.length;

    //x.innerHTML = "&nbsp;";
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = SucesoraAntecedente;
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = NumeroEmpresaAntecedente;
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = FechaTransferenciaAntecedente;
    table.rows[0].insertCell(3);
    table.rows[0].cells[3].innerHTML = '<button class="w3-right w3-margin-top w3-button w3-card 
    w3 - text - white w3 - hover - blue w3 - hover - border - cyan" style="margin: 0 0 0 200px; " type="button"  onclick="eliminarAntecedente(' + SucesoraAntecedente + ')">Eliminar</button >';


    document.getElementById("SucesoraAntecedente").value = "";
    document.getElementById("NumeroEmpresaAntecedente").value = "";
    document.getElementById("FechaTransferenciaAntecedente").value = "";

    document.getElementById("CalleAntecedente").value = "";
    document.getElementById("PisoAntecedente").value = "";
    document.getElementById("LocalidadAntecedente").value = "";
    document.getElementById("CPAntecedente").value = "";
    document.getElementById("ProvinciaAntecedente").value = "";
    document.getElementById("TelefonoAntecedente").value = "";
    document.getElementById("RepetirCuitEmpresaAntecedente").value = "";

    matrizAntecedente.push({
        SucesoraAntecedente: SucesoraAntecedente,
        NumeroEmpresaAntecedente: NumeroEmpresaAntecedente,
        FechaTransferenciaAntecedente: FechaTransferenciaAntecedente,
        CalleAntecedente: CalleAntecedente,
        PisoAntecedente: PisoAntecedente,
        LocalidadAntecedente: LocalidadAntecedente,
        CPAntecedente: CPAntecedente,
        ProvinciaAntecedente: ProvinciaAntecedente,
        TelefonoAntecedente: TelefonoAntecedente
    });

}


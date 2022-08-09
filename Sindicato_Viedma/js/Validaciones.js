function validarDatosEmpresa() {
    var Cuenta = document.getElementById('Cuenta').value;
    var NombreFantasia = document.getElementById('NombreFantasia').value;
    var RazonSocial = document.getElementById('RazonSocial').value;
    var Domicilio = document.getElementById('Domicilio').value;
    var Provincia = document.getElementById('Provincia').value;
    var Localidad = document.getElementById('Localidad').value;
    var CP = document.getElementById('CP').value;
    var Email = document.getElementById('Email').value;

    if (Cuenta == "" || Cuenta == "0") {
        alert("Debe de ingresar el numero de Cuenta");
        return false;
    }

    if (isNaN(Cuenta)) {
        alert("Ingrese solo numeros en el campo Cuenta");
        return false;
    }

    if (NombreFantasia == "") {
        alert("Debe de ingresar el Nombre de Fantasia");
        return false;
    }

    if (RazonSocial == "") {
        alert("Debe de ingresar la Razon Social");
        return false;
    }

    if (Domicilio == "") {
        alert("Debe de ingresar el Domicilio");
        return false;
    }

    if (Provincia == "") {
        alert("Debe de ingresar la Provincia");
        return false;
    }

    if (!isNaN(Provincia)) {
        alert("No puede ingresar solo numeros en el campo Provincia");
        return false;
    }

    if (Localidad == "") {
        alert("Debe de ingresar la Localidad");
        return false;
    }

    if (!isNaN(Localidad)) {
        alert("No puede ingresar solo numeros en el campo Localidad");
        return false;
    }

    if (CP == "") {
        alert("Debe de ingresar el Codigo Postal");
        return false;
    }

    if (isNaN(CP)) {
        alert("Ingrese solo numeros en el campo Codigo Postal");
        return false;
    }

    if (Email == "") {
        alert("Debe de ingresar el Email");
        return false;
    }

    return true;
}

function validarLiquidacion() {
    var e = document.getElementById("PeriodoMes");
    var mes = e.options[e.selectedIndex].value;
    var a = document.getElementById("PeriodoAnio");
    var anio = a.options[a.selectedIndex].value;

    var Remuneracion = parseInt(document.getElementById("Remuneracion").value);
    var Motivo = document.getElementById("Motivo").value;

    if (Remuneracion <= 0) {
        alert("Ingrese el monto de Remuneracion");
        return false;
    }

    if (Motivo == "") {
        alert("Ingrese un Motivo");
        return false;
    }

    if (mes != "" && anio != "") {
        return true;
    } else {
        alert("Debe de ingresar la fecha de periodo");
        return false;
    }
}
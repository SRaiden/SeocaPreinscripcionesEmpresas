function validarCamposMomento() {
    //var Cuenta = document.getElementById("Cuenta").value;
    //Cuenta = Cuenta.replace(/,/g, ".");
    //if (isNaN(Cuenta)) {
    //    document.getElementById("Cuenta").value = "";
    //} else {
    //    Cuenta = parseInt(Cuenta);
    //    document.getElementById("Cuenta").value = Cuenta;
    //    if (Cuenta < 0) {
    //        document.getElementById("Cuenta").value = "";
    //    }
    //}

    var Telefono = document.getElementById("Telefono").value;
    Telefono = Telefono.replace(/,/g, ".");
    if (isNaN(Telefono)) {
        document.getElementById("Telefono").value = "";
    } else {
        Telefono = parseInt(Telefono);
        document.getElementById("Telefono").value = Telefono;
        if (Telefono < 0) {
            document.getElementById("Telefono").value = "";
        }
    }


    var CP = document.getElementById("CP").value;
    var CPS = CP;
    CP = CP.replace(/,/g, ".");
    if (isNaN(CP) || CP == "") {
        document.getElementById("CP").value = "0";
    } else {
        CP = parseInt(CP);
        document.getElementById("CP").value = CP;
        if (CP < 0) {
            document.getElementById("CP").value = "0";
        }
    }    
}

function validarDatosEmpresa() {
    //var Cuenta = document.getElementById('Cuenta').value;
    var NombreFantasia = document.getElementById('NombreFantasia').value;
    var RazonSocial = document.getElementById('RazonSocial').value;
    var Domicilio = document.getElementById('Domicilio').value;
    var Provincia = document.getElementById('Provincia').value;
    var Localidad = document.getElementById('Localidad').value;
    var Telefono = document.getElementById('Telefono').value;
    var CP = document.getElementById('CP').value;
    var Email = document.getElementById('Email').value;

    //if (Cuenta == "" || Cuenta == "0") {
    //    alert("Debe de ingresar el numero de Cuenta");
    //    return false;
    //}

    //if (isNaN(Cuenta)) {
    //    alert("Ingrese solo numeros en el campo Cuenta");
    //    return false;
    //}

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
        alert("Ingrese un Codigo Postal");
        return false;
    }

    if (isNaN(CP)) {
        alert("Ingrese solo numeros en el campo Codigo Postal");
        return false;
    }

    if (isNaN(Telefono)) {
        alert("Ingrese solo numeros en el campo Telefono");
        return false;
    }

    if (Email == "") {
        alert("Debe de ingresar el Email");
        return false;
    }

    return true;
}


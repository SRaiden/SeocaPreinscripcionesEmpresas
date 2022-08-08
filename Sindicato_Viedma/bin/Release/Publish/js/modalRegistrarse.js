
$(".btnRegistrarse").click(function (eve) {
    $("#modal-content").load("/IniciarSesion/Registrarse?id=" + $(this).data("id") + "&cuit=" + $(this).data("cuit")); // GET
});

$(".btnRecuperarContraseña").click(function (eve) {
    $("#modal-content").load("/IniciarSesion/RecuperarContraseña"); // GET
});

$(".btnModalRecomendacion").click(function (eve) {
    $("#modal-content").load("/IniciarSesion/ModalRecomendacion"); // GET
});

var cuitEncontrado;
var NombreFantasiaEncontrado;
var RazonSocialEncontrado;
var EmailEncontrado;
var block;

function camposEncontrados() {
    document.getElementById("CUIT").value = cuitEncontrado;
    document.getElementById("NombreFantasia").value = NombreFantasiaEncontrado;
    document.getElementById("RazonSocial").value = RazonSocialEncontrado;
    document.getElementById("EMail").value = EmailEncontrado;

    if (block == 2) {
        var registro = document.getElementById("FormRegistro");
        registro.style.display = 'none';
        block = 1;
    } else {
        var registro = document.getElementById("FormRegistro");
        registro.style.display = 'block';
    }

}

function agregarElementosEncontrados() {
    cuitEncontrado = document.getElementById("cuitEncontrado").value;
    NombreFantasiaEncontrado = document.getElementById("NombreFantasiaEncontrado").value;
    RazonSocialEncontrado = document.getElementById("RazonSocialEncontrado").value;
    EmailEncontrado = document.getElementById("EmailEncontrado").value;
    block = document.getElementById("block").value;

}



function validarMomentoSesion() {
    var cuit = document.getElementById('IngCUIT').value;
    //var sucursal = document.getElementById('Sucursal').value;

    cuit = cuit.replace(/,/g, ".");
    cuit = parseInt(cuit);
    document.getElementById("IngCUIT").value = cuit;

    //sucursal = sucursal.replace(/,/g, ".");
    //sucursal = parseInt(sucursal);
    //document.getElementById("Sucursal").value = sucursal;

    if (isNaN(cuit)) {
        document.getElementById("IngCUIT").value = "";
    }

    if (cuit <= 0) {
        document.getElementById("IngCUIT").value = "";
    }

    //if (isNaN(sucursal)) {
    //    document.getElementById("Sucursal").value = "";
    //}

    //if (sucursal < 0) {
    //    document.getElementById("Sucursal").value = "";
    //}

}

function validarIniciarSesion() {
    var cuit = document.getElementById('IngCUIT').value;
    //var sucursal = document.getElementById('Sucursal').value;

    if (cuit == "") {
        alert("Debe de ingresar el CUIT");
        return false;
    }

    if (cuit.length != 11) {
        alert("El CUIT debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(cuit)) {
        alert("Ingrese solo numeros en el campo CUIT");
        return false;
    }

    //if (isNaN(sucursal)) {
    //    alert("Ingrese solo numeros en el campo Sucursal");
    //    return false;
    //}

    return true;
}

function validarExistenciaCuit() {
    var cuit = document.getElementById("CUITBuscar").value;
    //var Sucursal = document.getElementById("Sucursal").value;

    cuit = cuit.replace(/,/g, ".");
    if (!isNaN(cuit)) {
        document.getElementById("CUITBuscar").value = "";
    }
    cuit = parseInt(cuit);
    document.getElementById("CUITBuscar").value = cuit;
    if (cuit < 0) {
        document.getElementById("CUITBuscar").value = "";
    }

    if (isNaN(cuit)) {
        document.getElementById("CUITBuscar").value = "";
    }

    if (cuit <= 0) {
        document.getElementById("CUITBuscar").value = "";
    }
}

function validarMomentoRegistrarse() {
    var cuit = document.getElementById("CUIT").value;
    //var Sucursal = document.getElementById("Sucursal").value;

    cuit = cuit.replace(/,/g, ".");
    if (!isNaN(cuit)) {
        document.getElementById("CUIT").value = "";
    }
    cuit = parseInt(cuit);
    document.getElementById("CUIT").value = cuit;
    if (cuit < 0) {
        document.getElementById("CUIT").value = "";
    }

    if (isNaN(cuit)) {
        document.getElementById("CUIT").value = "";
    }

    if (cuit <= 0) {
        document.getElementById("CUIT").value = "";
    }
}

function validarExistencia() {

    var cuit = document.getElementById("CUITBuscar").value;

    if (cuit == "") {
        alert("Debe de ingresar el CUIT");
        return false;
    }

    if (cuit.length != 11) {
        alert("El CUIT debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(cuit)) {
        alert("Ingrese solo numeros en el campo CUIT");
        return false;
    }

    return true;
}

function validarRegistrarse() {

    var cuit = document.getElementById("CUIT").value;
    //var Sucursal = document.getElementById("Sucursal").value;
    var NombreFantasia = document.getElementById("NombreFantasia").value;
    var RazonSocial = document.getElementById("RazonSocial").value;
    var Email = document.getElementById("EMail").value;

    //var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (cuit == "" || /*Sucursal == "" ||*/ NombreFantasia == "" || RazonSocial == "" || Email == "") {
        alert("Debe de ingresar todos los campos");
        return false;
    }

    if (cuit.length != 11) {
        alert("El CUIT debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(cuit)) {
        alert("Ingrese solo numeros en el campo CUIT");
        return false;
    }

    return true;
}

function validarRecuperarContraseñaMomento() {

    var cuit = document.getElementById("CUIT").value;
    var Email = document.getElementById("EMail").value;

    if (cuit.length != 11) {
        alert("El CUIT debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(cuit)) {
        alert("Ingrese solo numeros en el campo CUIT");
        return false;
    }

    return true;
}

function validarRecuperarContraseña() {

    var cuit = document.getElementById("CUIT").value;
    var Email = document.getElementById("EMail").value;

    if (cuit == "" || Email == "") {
        alert("Debe de ingresar todos los campos");
        return false;
    }
    
    return true;
}

function cerrarId01() {
    document.getElementById('id01').style.display = 'none';
}

function cerrarCancelar() {
    document.getElementById('id01').style.display = 'none';

    var plant = document.getElementById('registro1');
    plant.setAttribute('data-cuit', '0');
}

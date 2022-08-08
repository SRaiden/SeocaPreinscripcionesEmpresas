var matrizEmpresa = new Array();
var matrizContador = new Array();
var matrizAntecedente = new Array();
var matrizEmpleado = new Array();
var matrizTitular = new Array();

function enviar() {
    

    var RazonSocial = document.getElementById("RazonSocial").value;
    var NombreFantasia = document.getElementById("NombreFantasia").value;
    var Cuit = document.getElementById("Cuit").value;

    var DomicilioReal = document.getElementById("DomicilioReal").value;
    var LocalidadReal = document.getElementById("LocalidadReal").value;
    //var LocalidadReal = selectionLocReal.options[selection.selectedIndex].value;
    var TelefonoReal = document.getElementById("TelefonoReal").value;

    var Actividad = document.getElementById("Actividad").value;
    //var Actividad = selectionActividad.options[selection.selectedIndex].value;
    var Email = document.getElementById("Email").value;
    var PaginaWeb = document.getElementById("PaginaWeb").value;

    var DomicilioLegal = document.getElementById("DomicilioLegal").value;
    var LocalidadLegal = document.getElementById("LocalidadLegal").value;
    var TelefonoLegal = document.getElementById("TelefonoLegal").value;

    var Sucursal1 = document.getElementById("Sucursal1").value;
    var Sucursal2 = document.getElementById("Sucursal2").value;
    var Sucursal3 = document.getElementById("Sucursal3").value;

    // Validaciones
    if (NombreFantasia == "") {
        alert("Debe de ingresar el Nombre de Fantasia");
        return false;
    }

    if (RazonSocial == "") {
        alert("Debe de ingresar la Razon Social");
        return false;
    }

    if (Cuit == "") {
        alert("Debe de ingresar el Cuit de la empresa");
        return false;
    }

    if (LocalidadReal == 0) {
        alert("Debe de seleccionar una Localidad Real");
        return false;
    }

    if (Actividad == 0) {
        alert("Debe de seleccionar una Actividad");
        return false;
    }

    if (isNaN(Cuit)) {
        alert("Ingrese solo numeros en el campo Cuit");
        return false;
    }

    if (Cuit.length != 11) {
        alert("El CUIL debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(TelefonoLegal)) {
        alert("Ingrese solo numeros en el campo Telefono Legal");
        return false;
    }

    if (isNaN(TelefonoReal)) {
        alert("Ingrese solo numeros en el campo Telefono Real");
        return false;
    }

    if (Email == "") {
        alert("Debe de ingresar el Email");
        return false;
    }

    matrizEmpresa.push({
        RazonSocial: RazonSocial,
        NombreFantasia: NombreFantasia,
        Cuit: Cuit,
        DomicilioReal: DomicilioReal,
        LocalidadReal: LocalidadReal,
        TelefonoReal: TelefonoReal,
        Actividad: Actividad,
        Email: Email,
        PaginaWeb: PaginaWeb,
        DomicilioLegal: DomicilioLegal,
        LocalidadLegal: LocalidadLegal,
        TelefonoLegal: TelefonoLegal,
        Sucursal1: Sucursal1,
        Sucursal2: Sucursal2,
        Sucursal3: Sucursal3
    });

    if (matrizAntecedente == null) matrizAntecedente = "";
    if (matrizContador == null) matrizContador = "";
    if (matrizEmpleado == null) matrizEmpleado = "";
    if (matrizTitular == null) matrizTitular = "";

    $.ajax({
        url: '/Home/Empresa',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            alert(response.responseText);
            window.open(response.enlace);
            location.reload();

        },
        error: function (response) {
            alert(response.responseText);
        },
        data: {
            matrizEmpresa: JSON.stringify(matrizEmpresa),
            matrizAntecedente: JSON.stringify(matrizAntecedente),
            matrizContador: JSON.stringify(matrizContador),
            matrizEmpleado: JSON.stringify(matrizEmpleado),
            matrizTitular: JSON.stringify(matrizTitular)
        }
    });


}
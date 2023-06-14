var matrizEmpresa = new Array();
var matrizContador = new Array();
var matrizAntecedente = new Array();
var matrizSucursal = new Array();
var matrizEmpleado = new Array();
var matrizTitular = new Array();

function enviar() {
    

    var RazonSocial = document.getElementById("RazonSocial").value;
    var NombreFantasia = document.getElementById("NombreFantasia").value;
    var Cuit = document.getElementById("Cuit").value;
    var DomicilioReal = document.getElementById("DomicilioReal").value;
    var LocalidadReal = document.getElementById("LocalidadReal").value;
    var TelefonoReal = document.getElementById("TelefonoReal").value;
    var TelefonoLegal = document.getElementById("TelefonoLegal").value;
    var DomicilioLegal = document.getElementById("DomicilioLegal").value;
    var NroLegal = document.getElementById("NroLegal").value;
    var NroReal = document.getElementById("NroReal").value;
    var LocalidadLegal = document.getElementById("LocalidadLegal").value;
    var Actividad = document.getElementById("Actividad").value;
    var Email = document.getElementById("Email").value;
    var PaginaWeb = document.getElementById("PaginaWeb").value;

    if (matrizTitular == "") {
        alert("Debe de ingresar al menos 1 Titular");
        return false;
    }

    if (matrizEmpleado == "") {
        alert("Debe de ingresar al menos 1 Empleado");
        return false;
    }

    // Validaciones
    if (RazonSocial == "") {
        alert("Debe de ingresar la Razon Social");
        return false;
    }

    if (Cuit == "") {
        alert("Debe de ingresar el Cuit de la empresa");
        return false;
    }

    if (Cuit.length != 13) {
        alert("El CUIL debe de constar de 13 caracteres");
        return false;
    }

    var cadena1 = Cuit.slice(0, 2);
    var cadena2 = Cuit.slice(3, 11);
    var cadena3 = Cuit.slice(12, 13);
    Cuit = cadena1 + cadena2 + cadena3;

    if (isNaN(Cuit)) {
        alert("Ingrese solo numeros en el campo Cuit");
        return false;
    }



    if (LocalidadReal == 0) {
        alert("Seleccione una Localidad Real");
        return false;
    }

    if (LocalidadLegal == 0) {
        alert("Seleccione una Localidad Legal");
        return false;
    }

    if (DomicilioReal == "") {
        alert("Debe de ingresar el Domicilio Real");
        return false;
    }

    if (NroLegal == 0 || NroLegal == "") {
        alert("Debe de ingresar el Nro Legal");
        return false;
    }

    if (NroReal == 0 || NroReal == "") {
        alert("Debe de ingresar el Nro Legal");
        return false;
    }

    if (isNaN(TelefonoReal)) {
        alert("Ingrese solo numeros en el campo Telefono Real");
        return false;
    }

    if (isNaN(TelefonoLegal)) {
        alert("Ingrese solo numeros en el campo Telefono Real");
        return false;
    }

    

    if (Actividad == 0) {
        alert("Debe de seleccionar una Actividad");
        return false;
    }


    if (Email == "") {
        alert("Debe de ingresar el Email");
        return false;
    }

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (!emailRegex.test(Email)) {
        alert("Formato de Email no valido");
        return false;
    }


    matrizEmpresa.push({
        RazonSocial: RazonSocial,
        NombreFantasia: NombreFantasia,
        Cuit: Cuit,
        DomicilioReal: DomicilioReal,
        LocalidadReal: LocalidadReal,
        TelefonoReal: TelefonoReal,
        TelefonoLegal: TelefonoLegal,
        Actividad: Actividad,
        Email: Email,
        PaginaWeb: PaginaWeb,
        DomicilioLegal: DomicilioLegal,
        LocalidadLegal: LocalidadLegal,
        NroLegal: NroLegal,
        NroReal: NroReal
    });

    // ---------------------------------------------------------------------- //

    var NombreEstudioContador = document.getElementById("NombreEstudioContador").value;
    var DireccionContador = document.getElementById("DireccionContador").value;
    var TelefonoContador = document.getElementById("TelefonoContador").value;
    var EmailContador = document.getElementById("EmailContador").value;

    //validaciones
    if (NombreEstudioContador == "") {
        if (DireccionContador != "") {
            alert("Debe de ingresar el Nombre Estudio Contador");
            return false;
        }
    } else {
        if (!isNaN(NombreEstudioContador)) {
            alert("Ingrese solo letras en el campo Nombre Estudio Contador");
            return false;
        }

        if (DireccionContador == "") {
            alert("Debe de ingresar la Direccion Contador");
            return false;
        }

        if (EmailContador == "") {
            alert("Debe de ingresar el Email Contador");
            return false;
        }

        var emailRegex2 = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (!emailRegex2.test(EmailContador)) {
            alert("Formato de Email de contador no valido");
            return false;
        }

        matrizContador.push({
            NombreEstudioContador: NombreEstudioContador,
            DireccionContador: DireccionContador,
            TelefonoContador: TelefonoContador,
            EmailContador: EmailContador
        });
    }

    if (matrizAntecedente == "") matrizAntecedente = null;
    if (matrizContador == "") matrizContador = null;
    if (matrizEmpleado == "") matrizEmpleado = null;
    if (matrizSucursal == "") matrizSucursal = null;
    if (matrizTitular == "") matrizTitular = null;

    document.getElementById("matrizEmpresa").value = JSON.stringify(matrizEmpresa);
    document.getElementById("matrizAntecedente").value = JSON.stringify(matrizAntecedente);
    document.getElementById("matrizContador").value = JSON.stringify(matrizContador);
    document.getElementById("matrizEmpleado").value = JSON.stringify(matrizEmpleado);
    document.getElementById("matrizTitular").value = JSON.stringify(matrizTitular);
    document.getElementById("matrizSucursal").value = JSON.stringify(matrizSucursal);

    //$.ajax({
    //    url: '/Home/Empresa',
    //    type: 'POST',
    //    dataType: 'json',
    //    success: function (response) {
    //        alert(response.responseText);
    //        window.open(response.enlace);
    //        location.reload();
    //    },
    //    error: function (response) {
    //        alert(response.responseText);
    //    },
    //    data: {
    //        matrizEmpresa: JSON.stringify(matrizEmpresa),
    //        matrizAntecedente: JSON.stringify(matrizAntecedente),
    //        matrizContador: JSON.stringify(matrizContador),
    //        matrizEmpleado: JSON.stringify(matrizEmpleado),
    //        matrizTitular: JSON.stringify(matrizTitular),
    //        matrizSucursal: JSON.stringify(matrizSucursal),
    //    }
    //});


}

//---------------------------------------------------//

function insertarTitular() {
    var ApellidoNombreTitular = document.getElementById("ApellidoNombreTitular").value;
    var DomicilioParticularTitular = document.getElementById("DomicilioParticularTitular").value;
    var DocumentoTitular = document.getElementById("DocumentoTitular").value;
    var CargoEmpresaTitular = document.getElementById("CargoEmpresaTitular").value;
    var LocalidadEmpresaTitular = document.getElementById("LocalidadEmpresaTitular").value;

    //validaciones
    if (ApellidoNombreTitular == "") {
        alert("Debe de ingresar el Apellido y Nombre del Titular");
        return false;
    }

    if (DocumentoTitular == "") {
        alert("Debe de ingresar Documento Titular");
        return false;
    }

    if (CargoEmpresaTitular == "") {
        alert("Debe de ingresar Cargo Empresa");
        return false;
    }

    for (i = 0; i < matrizTitular.length; i++) {
        if (matrizTitular[i].ApellidoNombreTitular == ApellidoNombreTitular) {
            alert("Ingrese un CUIL distinto");
            return false;
        }
    }

    for (i = 0; i < matrizTitular.length; i++) {
        if (matrizTitular[i].DocumentoTitular == DocumentoTitular) {
            alert("Ingrese un DNI distinto");
            return false;
        }
    }

    var table = document.getElementById('bodyTitular');
    var x = table.insertRow(0);
    var e = table.rows.length - 1;
    var l = table.rows[e].cells.length;

    //x.innerHTML = "&nbsp;";
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = ApellidoNombreTitular;
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = DomicilioParticularTitular;
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = DocumentoTitular;
    table.rows[0].insertCell(3);
    table.rows[0].cells[3].innerHTML = '<button class="btn btn-danger borrarTitular" type="button"  onclick="eliminarTitular(' + DocumentoTitular + ')">Eliminar</button >';


    document.getElementById("ApellidoNombreTitular").value = "";
    document.getElementById("DomicilioParticularTitular").value = "";
    document.getElementById("DocumentoTitular").value = "";
    document.getElementById("CargoEmpresaTitular").value = "";
    document.getElementById("LocalidadEmpresaTitular").value = 1471;

    matrizTitular.push({
        ApellidoNombreTitular: ApellidoNombreTitular,
        DomicilioParticularTitular: DomicilioParticularTitular,
        DocumentoTitular: DocumentoTitular,
        CargoEmpresaTitular: CargoEmpresaTitular,
        LocalidadEmpresaTitular: LocalidadEmpresaTitular
    });
}

function eliminarTitular(DocumentoTitular) {
    // Eliminar Matriz
    for (i = 0; i < matrizTitular.length; i++) {
        if (matrizTitular[i].DocumentoTitular == DocumentoTitular) {
            matrizTitular.splice(i, 1);
        }
    }
}

$(document).on('click', '.borrarTitular', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

//---------------------------------------------------//

function insertarEmpleado() {
    var ApellidoNombreEmpleado = document.getElementById("ApellidoNombreEmpleado").value;
    var CuilEmpleado = document.getElementById("CuilEmpleado").value;
    var FechaIngresoEmpleado = document.getElementById("FechaIngresoEmpleado").value;
    var CategoriaEmpleado = document.getElementById("CategoriaEmpleado").value;
    var TotRemuneracionEmpleado = document.getElementById("TotRemuneracionEmpleado").value;
    var Afiliado = document.getElementById("chkCuota").checked;
    var selectionjornada = document.getElementById("JornadaEmpleado").value;

    //validaciones
    if (ApellidoNombreEmpleado == "") {
        alert("Debe de ingresar el Apellido y Nombre del Empleado");
        return false;
    }

    if (!isNaN(ApellidoNombreEmpleado)) {
        alert("Ingrese solo letras en el campo Apellido y Nombre del Empleado");
        return false;
    }


    if (CuilEmpleado == "") {
        alert("Debe de ingresar el Cuil del Empleado");
        return false;
    }

    if (CuilEmpleado.length != 13) {
        alert("El CUIL debe de constar de 13 caracteres");
        return false;
    }

    var cadena1 = CuilEmpleado.slice(0, 2);
    var cadena2 = CuilEmpleado.slice(3, 11);
    var cadena3 = CuilEmpleado.slice(12, 13);
    CuilEmpleado = cadena1 + cadena2 + cadena3;

    if (isNaN(CuilEmpleado)) {
        alert("Ingrese solo numeros en el campo Cuit");
        return false;
    }

    if (FechaIngresoEmpleado == "") {
        alert("Debe de ingresar la Fecha de Ingreso del Empleado");
        return false;
    }

    if (CategoriaEmpleado == -1) {
        alert("Debe de ingresar la Categoria del Empleado");
        return false;
    }

    if (TotRemuneracionEmpleado == "") {
        alert("Debe de ingresar el Total de Remuneracion del Empleado");
        return false;
    }

    if (isNaN(TotRemuneracionEmpleado)) {
        alert("Ingrese solo numeros en el campo Total Remuneracion");
        return false;
    }

    if (selectionjornada == 0) {
        alert("Seleccione una jornada");
        return false;
    }

    for (i = 0; i < matrizEmpleado.length; i++) {
        if (matrizEmpleado[i].CuilEmpleado == CuilEmpleado) {
            alert("Ingrese un CUIL distinto");
            return false;
        }
    }

    var table = document.getElementById('bodyEmpleado');
    var x = table.insertRow(0);
    var e = table.rows.length - 1;
    var l = table.rows[e].cells.length;

    //x.innerHTML = "&nbsp;";
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = ApellidoNombreEmpleado;
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = CuilEmpleado;
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = FechaIngresoEmpleado;
    table.rows[0].insertCell(3);
    table.rows[0].cells[3].innerHTML = TotRemuneracionEmpleado;
    table.rows[0].insertCell(4);
    table.rows[0].cells[4].innerHTML = '<button class="btn btn-danger borrarEmpleado" type="button"  onclick="eliminarEmpleado(' + CuilEmpleado + ')">Eliminar</button >';

    document.getElementById("ApellidoNombreEmpleado").value = "";
    document.getElementById("CuilEmpleado").value = "";
    document.getElementById("FechaIngresoEmpleado").value = "";
    document.getElementById("CategoriaEmpleado").value = -1;
    document.getElementById("TotRemuneracionEmpleado").value = "";
    document.getElementById("chkCuota").checked = false;
    document.getElementById("JornadaEmpleado").value = 0;

    matrizEmpleado.push({
        ApellidoNombreEmpleado: ApellidoNombreEmpleado,
        CuilEmpleado: CuilEmpleado,
        FechaIngresoEmpleado: FechaIngresoEmpleado,
        CategoriaEmpleado: CategoriaEmpleado,
        TotRemuneracionEmpleado: TotRemuneracionEmpleado,
        Afiliado: Afiliado,
        JornadaEmpleado: selectionjornada
    });

}

function eliminarEmpleado(CuilEmpleado) {
    // Eliminar Matriz
    for (i = 0; i < matrizEmpleado.length; i++) {
        if (matrizEmpleado[i].CuilEmpleado == CuilEmpleado) {
            matrizEmpleado.splice(i, 1);
        }
    }
}

$(document).on('click', '.borrarEmpleado', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

//---------------------------------------------------//

function insertarAntecedente() {
    var SucesoraAntecedente = document.getElementById("SucesoraAntecedente").value;
    var NumeroEmpresaAntecedente = document.getElementById("NumeroEmpresaAntecedente").value;
    var FechaTransferenciaAntecedente = document.getElementById("FechaTransferenciaAntecedente").value;
    var CalleAntecedente = document.getElementById("CalleAntecedente").value;
    var PisoAntecedente = document.getElementById("PisoAntecedente").value;
    var LocalidadAntecedente = document.getElementById("LocalidadAntecedente").value;
    var ProvinciaAntecedente = document.getElementById("ProvinciaAntecedente").value;
    var TelefonoAntecedente = document.getElementById("TelefonoAntecedente").value;

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

    if (TelefonoAntecedente == "") {
        alert("Debe de ingresar el Telefono Antecedente");
        return false;
    }

    if (isNaN(TelefonoAntecedente)) {
        alert("Ingrese solo numeros en el campo Telefono Antecedente");
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
    table.rows[0].cells[3].innerHTML = '<button class="btn btn-danger borrarAntecedente" type="button"  onclick="eliminarAntecedente(' + "'" + SucesoraAntecedente + "'" + ')">Eliminar</button >';


    document.getElementById("SucesoraAntecedente").value = "";
    document.getElementById("NumeroEmpresaAntecedente").value = "";
    document.getElementById("FechaTransferenciaAntecedente").value = "";

    document.getElementById("CalleAntecedente").value = "";
    document.getElementById("PisoAntecedente").value = "";
    document.getElementById("LocalidadAntecedente").value = 1471;
    document.getElementById("ProvinciaAntecedente").value = 1;
    document.getElementById("TelefonoAntecedente").value = "";

    matrizAntecedente.push({
        SucesoraAntecedente: SucesoraAntecedente,
        NumeroEmpresaAntecedente: NumeroEmpresaAntecedente,
        FechaTransferenciaAntecedente: FechaTransferenciaAntecedente,
        CalleAntecedente: CalleAntecedente,
        PisoAntecedente: PisoAntecedente,
        LocalidadAntecedente: LocalidadAntecedente,
        ProvinciaAntecedente: ProvinciaAntecedente,
        TelefonoAntecedente: TelefonoAntecedente
    });

}

function eliminarAntecedente(SucesoraAntecedente) {
    // Eliminar Matriz
    for (i = 0; i < matrizAntecedente.length; i++) {
        if (matrizAntecedente[i].SucesoraAntecedente == SucesoraAntecedente) {
            matrizAntecedente.splice(i, 1);
        }
    }
}

$(document).on('click', '.borrarAntecedente', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});


//---------------------------------------------------//

function insertarSucursal() {
    var NombreSucursal = document.getElementById("NombreSucursal").value;
    var LocalidadSucursal = document.getElementById("LocalidadSucursal").value;
    var CalleSucursal = document.getElementById("CalleSucursal").value;
    var AlturaSucursal = document.getElementById("AlturaSucursal").value;
    var TelefonoSucursal = document.getElementById("TelefonoSucursal").value;

    //validaciones
    if (NombreSucursal == "") {
        alert("Debe de ingresar el Nombre de la Sucursal");
        return false;
    }

    if (CalleSucursal == "") {
        alert("Debe de ingresar la Calle de la Sucursal");
        return false;
    }

    if (TelefonoSucursal == "") {
        alert("Debe de ingresar el numero de Telefono de la Sucursal");
        return false;
    }

    if (isNaN(TelefonoSucursal)) {
        alert("Debe de ingresar solo numeros en el Telefono");
        return false;
    }

    for (i = 0; i < matrizSucursal.length; i++) {
        if (matrizSucursal[i].NombreSucursal == NombreSucursal) {
            alert("Ingrese un Nombre de Sucursal distinto");
            return false;
        }
    }

    var table = document.getElementById('bodySucursal');
    var x = table.insertRow(0);
    var e = table.rows.length - 1;
    var l = table.rows[e].cells.length;

    //x.innerHTML = "&nbsp;";
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = NombreSucursal;
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = LocalidadSucursal;
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = CalleSucursal;
    table.rows[0].insertCell(3);
    table.rows[0].cells[3].innerHTML = TelefonoSucursal;
    table.rows[0].insertCell(4);
    table.rows[0].cells[4].innerHTML = '<button class="btn btn-danger eliminarSucursal" type="button"  onclick="eliminarSucursal(' + "'" + NombreSucursal + "'" + ')">Eliminar</button >';


    document.getElementById("NombreSucursal").value = "";
    document.getElementById("LocalidadSucursal").value = "";

    document.getElementById("CalleSucursal").value = "";
    document.getElementById("AlturaSucursal").value = "";
    document.getElementById("TelefonoSucursal").value = "";


    matrizSucursal.push({
        NombreSucursal: NombreSucursal,
        LocalidadSucursal: LocalidadSucursal,
        CalleSucursal: CalleSucursal,
        AlturaSucursal: AlturaSucursal,
        TelefonoSucursal: TelefonoSucursal
    });

}

function eliminarSucursal(NombreSucursal) {
    // Eliminar Matriz
    for (i = 0; i < matrizSucursal.length; i++) {
        if (matrizSucursal[i].NombreSucursal == NombreSucursal) {
            matrizSucursal.splice(i, 1);
        }
    }
}

$(document).on('click', '.eliminarSucursal', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

//---------------------------------------------------//

function valiCuit() {
    var cuit = document.getElementById("Cuit").value;
    if (cuit.length == 11) {
        var cadena1 = cuit.slice(0, 2);
        var cadena2 = cuit.slice(2, 10);
        var cadena3 = cuit.slice(10, 11);

        var cuit = cadena1 + "-" + cadena2 + "-" + cadena3;
        document.getElementById("Cuit").value = cuit;
    }
}

function valiCuil() {
    var cuit = document.getElementById("CuilEmpleado").value;
    if (cuit.length == 11) {
        var cadena1 = cuit.slice(0, 2);
        var cadena2 = cuit.slice(2, 10);
        var cadena3 = cuit.slice(10, 11);

        var cuit = cadena1 + "-" + cadena2 + "-" + cadena3;
        document.getElementById("CuilEmpleado").value = cuit;
    }
}
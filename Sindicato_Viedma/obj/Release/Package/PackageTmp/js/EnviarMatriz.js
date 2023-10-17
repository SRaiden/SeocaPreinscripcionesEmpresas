var matrizEmpresa = new Array();
var matrizContador = new Array();
var matrizAntecedente = new Array();
var matrizSucursal = new Array();
var matrizEmpleado = new Array();
var matrizTitular = new Array();

//---------------------------------------------------//

function changeCampos() {
    var campos = [
        "RazonSocial",
        "NombreFantasia",
        "DomicilioReal",
        "DomicilioLegal",
        "Email",
        "PaginaWeb",
        "ApellidoNombreTitular",
        "DomicilioParticularTitular",
        "CargoEmpresaTitular",
        "ApellidoNombreEmpleado",
        "SucesoraAntecedente",
        "CalleAntecedente",
        "NombreSucursal",
        "CalleSucursal",
        "NombreEstudioContador",
        "DireccionContador",
        "EmailContador"
    ];

    campos.forEach(function (campo) {
        var element = document.getElementById(campo);
        element.value = element.value.toUpperCase();
    });
}

function enviar() {
    var RazonSocial = document.getElementById("RazonSocial").value;
    var NombreFantasia = document.getElementById("NombreFantasia").value;
    var Cuit = document.getElementById("Cuit").value;
    var DomicilioReal = document.getElementById("DomicilioReal").value;
    var LocalidadReal = document.getElementById("LocalidadReal").value;
    var TelefonoReal = document.getElementById("TelefonoReal").value;
    var TelefonoLegal = document.getElementById("TelefonoLegal").value;
    var DomicilioLegal = document.getElementById("DomicilioLegal").value;
    var CPLegal = document.getElementById("CPLegal").value;
    var NroLegal = document.getElementById("NroLegal").value;
    var NroReal = document.getElementById("NroReal").value;
    var LocalidadLegal = document.getElementById("LocalidadLegal").value;
    var Actividad = document.getElementById("Actividad").value;
    var Email = document.getElementById("Email").value;
    var PaginaWeb = document.getElementById("PaginaWeb").value;
    var PisoReal = document.getElementById("PisoReal").value;
    var DtoReal = document.getElementById("DtoReal").value;
    var PisoLegal = document.getElementById("PisoLegal").value;
    var DtoLegal = document.getElementById("DtoLegal").value;
    var EmailConfirmacion = document.getElementById("EmailConfirmacion").value;

    

    var fileHabilitacionMunicipal = document.getElementById("fileHabilitacionMunicipal").value;
    var fileComprobanteAfip = document.getElementById("fileComprobanteAfip").value;
    var fileContratoSocial = document.getElementById("fileContratoSocial").value;
    var fileNotaEscrita = document.getElementById("fileNotaEscrita").value;
    var fileUltimoReciboSueldo = document.getElementById("fileUltimoReciboSueldo").value;

    if (matrizTitular === "") {
        alert("Debe ingresar al menos 1 Titular");
        return false;
    }

    if (matrizEmpleado === "") {
        alert("Debe ingresar al menos 1 Empleado");
        return false;
    }

    if (RazonSocial === "") {
        alert("Debe ingresar la Razón Social");
        return false;
    }

    if (Cuit === "") {
        alert("Debe ingresar el CUIT de la empresa");
        return false;
    }

    if (Cuit.length !== 13) {
        alert("El CUIT debe constar de 13 caracteres");
        return false;
    }

    var cadena1 = Cuit.slice(0, 2);
    var cadena2 = Cuit.slice(3, 11);
    var cadena3 = Cuit.slice(12, 13);
    Cuit = cadena1 + cadena2 + cadena3;

    if (isNaN(Cuit)) {
        alert("Ingrese solo números en el campo CUIT");
        return false;
    }

    if (LocalidadReal === 0) {
        alert("Seleccione una Localidad Real");
        return false;
    }

    if (LocalidadLegal === "") {
        alert("Seleccione una Localidad Legal");
        return false;
    }

    if (CPLegal === 0) {
        alert("Debe de ingresar un Codigo Postal Legal");
        return false;
    }

    if (CPLegal < 0) {
        alert("Solo numeros positivos en el Codigo Postal Legal");
        return false;
    }

    if (DomicilioReal === "") {
        alert("Debe ingresar el Domicilio Real");
        return false;
    }

    if (NroLegal === 0 || NroLegal === "") {
        alert("Debe ingresar el Nro Legal");
        return false;
    }

    if (NroReal === 0 || NroReal === "") {
        alert("Debe ingresar el Nro Legal");
        return false;
    }

    if (isNaN(TelefonoReal)) {
        alert("Ingrese solo números en el campo Teléfono Real");
        return false;
    }

    if (isNaN(TelefonoLegal)) {
        alert("Ingrese solo números en el campo Teléfono Legal");
        return false;
    }

    if (Actividad === 0) {
        alert("Debe seleccionar una Actividad");
        return false;
    }

    if (Email === "") {
        alert("Debe ingresar el Email");
        return false;
    }

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(Email)) {
        alert("Formato de Email no válido");
        return false;
    }

    if (EmailConfirmacion == "") {
        alert("Debe de ingresar el Email");
        return false;
    }
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (!emailRegex.test(EmailConfirmacion)) {
        alert("Formato de Email no valido");
        return false;
    }

    if (EmailConfirmacion != Email) {
        alert("Los Mails de Confirmacion no coinciden");
        return false;
    }

    //---------------------------------------------------------------------//
    if (fileHabilitacionMunicipal == "") {
        alert("Debe de ingresar el archivo de Habilitacion Municipal");
        return false;
    }
    if (fileComprobanteAfip == "") {
        alert("Debe de ingresar el archivo de Comprobante de AFIP");
        return false;
    }
    if (fileNotaEscrita == "") {
        alert("Debe de ingresar el archivo de Nota de Escrita");
        return false;
    }
    if (fileUltimoReciboSueldo == "") {
        alert("Debe de ingresar el archivo de Ultimo Recibo de Sueldo");
        return false;
    }
    //---------------------------------------------------------------------//

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
        CPLegal: CPLegal,
        NroLegal: NroLegal,
        NroReal: NroReal,
        PisoReal: PisoReal,
        DtoReal: DtoReal,
        PisoLegal: PisoLegal,
        DtoLegal: DtoLegal
    });

    // ---------------------------------------------------------------------- //

    var NombreEstudioContador = document.getElementById("NombreEstudioContador").value;
    var DireccionContador = document.getElementById("DireccionContador").value;
    var TelefonoContador = document.getElementById("TelefonoContador").value;
    var EmailContador = document.getElementById("EmailContador").value;
    var EmailConfirmacionContador = document.getElementById("EmailConfirmacionContador").value;

    //validaciones
    if (NombreEstudioContador === "") {
        if (DireccionContador !== "") {
            alert("Debe ingresar el Nombre Estudio Contador");
            return false;
        }
    } else {
        if (!isNaN(NombreEstudioContador)) {
            alert("Ingrese solo letras en el campo Nombre Estudio Contador");
            return false;
        }

        if (DireccionContador === "") {
            alert("Debe ingresar la Dirección Contador");
            return false;
        }

        if (EmailContador === "") {
            alert("Debe ingresar el Email Contador");
            return false;
        }

        var emailRegex2 = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (!emailRegex2.test(EmailContador)) {
            alert("Formato de Email de contador no válido");
            return false;
        }


        if (EmailConfirmacionContador == "") {
            alert("Debe de ingresar el Email");
            return false;
        }
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (!emailRegex2.test(EmailConfirmacionContador)) {
            alert("Formato de Email no valido");
            return false;
        }

        if (EmailConfirmacion != EmailContador) {
            alert("Los Mails de Confirmacion no coinciden");
            return false;
        }

        matrizContador.push({
            NombreEstudioContador: NombreEstudioContador,
            DireccionContador: DireccionContador,
            TelefonoContador: TelefonoContador,
            EmailContador: EmailContador
        });
    }

    if (matrizAntecedente === "") matrizAntecedente = null;
    if (matrizContador === "") matrizContador = null;
    if (matrizEmpleado === "") matrizEmpleado = null;
    if (matrizSucursal === "") matrizSucursal = null;
    if (matrizTitular === "") matrizTitular = null;

    document.getElementById("matrizEmpresa").value = JSON.stringify(matrizEmpresa);
    document.getElementById("matrizAntecedente").value = JSON.stringify(matrizAntecedente);
    document.getElementById("matrizContador").value = JSON.stringify(matrizContador);
    document.getElementById("matrizEmpleado").value = JSON.stringify(matrizEmpleado);
    document.getElementById("matrizTitular").value = JSON.stringify(matrizTitular);
    document.getElementById("matrizSucursal").value = JSON.stringify(matrizSucursal);

}

//---------------------------------------------------//

function insertarTitular() {
    var ApellidoNombreTitular = document.getElementById("ApellidoNombreTitular").value;
    var DomicilioParticularTitular = document.getElementById("DomicilioParticularTitular").value;
    var DocumentoTitular = document.getElementById("DocumentoTitular").value;
    var CargoEmpresaTitular = document.getElementById("CargoEmpresaTitular").value;
    var LocalidadEmpresaTitular = document.getElementById("LocalidadEmpresaTitular").value;
    var EmpresaCPTitular = document.getElementById("EmpresaCPTitular").value;
    
    // Validamos los campos
    if (ApellidoNombreTitular === "") {
        alert("Debe ingresar el Apellido y Nombre del Titular");
        return false;
    }

    if (DocumentoTitular === "") {
        alert("Debe ingresar Documento Titular");
        return false;
    }

    if (CargoEmpresaTitular === "") {
        alert("Debe ingresar Cargo Empresa");
        return false;
    }

    if (LocalidadEmpresaTitular === "") {
        alert("Debe de escribir la Localidad del Titular");
        return false;
    }

    if (EmpresaCPTitular == 0) {
        alert("Debe de escribir el CP del Titular");
        return false;
    }

    if (EmpresaCPTitular < 0) {
        alert("Solo numeros positivos en CP del Titular");
        return false;
    }

    // Verificamos si ya existe el ApellidoNombreTitular en la matrizTitular
    if (matrizTitular.some(function (titular) {
        return titular.ApellidoNombreTitular === ApellidoNombreTitular;
    })) {
        alert("Ingrese un CUIL distinto");
        return false;
    }

    // Verificamos si ya existe el DocumentoTitular en la matrizTitular
    if (matrizTitular.some(function (titular) {
        return titular.DocumentoTitular === DocumentoTitular;
    })) {
        alert("Ingrese un DNI distinto");
        return false;
    }

    // Insertamos los datos en la tabla
    var table = document.getElementById("bodyTitular");
    var newRow = table.insertRow(0);
    newRow.insertCell(0).innerHTML = ApellidoNombreTitular;
    newRow.insertCell(1).innerHTML = DomicilioParticularTitular;
    newRow.insertCell(2).innerHTML = DocumentoTitular;
    newRow.insertCell(4).innerHTML = '<button class="btn btn-danger borrarTitular" type="button" onclick="eliminarTitular(' + DocumentoTitular + ')">Eliminar</button>';

    // Restablecemos los valores de los campos
    document.getElementById("ApellidoNombreTitular").value = "";
    document.getElementById("DomicilioParticularTitular").value = "";
    document.getElementById("DocumentoTitular").value = "";
    document.getElementById("CargoEmpresaTitular").value = "";
    document.getElementById("LocalidadEmpresaTitular").value = "";
    document.getElementById("EmpresaCPTitular").value = "";

    // Agregamos los datos a la matrizTitular
    matrizTitular.push({
        ApellidoNombreTitular: ApellidoNombreTitular,
        DomicilioParticularTitular: DomicilioParticularTitular,
        DocumentoTitular: DocumentoTitular,
        CargoEmpresaTitular: CargoEmpresaTitular,
        LocalidadEmpresaTitular: LocalidadEmpresaTitular,
        EmpresaCPTitular: EmpresaCPTitular
    });
}

function eliminarTitular(DocumentoTitular) {
    // Encontrar el índice del objeto en la matrizTitular
    var index = matrizTitular.findIndex(function (titular) {
        return titular.DocumentoTitular === DocumentoTitular;
    });

    // Verificar si se encontró el objeto
    if (index !== -1) {
        // Eliminar el objeto de la matrizTitular
        matrizTitular.splice(index, 1);
    }
}

$(document).on('click', '.borrarTitular', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

//---------------------------------------------------//

function insertarEmpleado() {
    // Obtener los valores de los campos
    var ApellidoNombreEmpleado = document.getElementById("ApellidoNombreEmpleado").value;
    var CuilEmpleado = document.getElementById("CuilEmpleado").value;
    var FechaIngresoEmpleado = document.getElementById("FechaIngresoEmpleado").value;
    var CategoriaEmpleado = document.getElementById("CategoriaEmpleado").value;
    var TotRemuneracionEmpleado = document.getElementById("TotRemuneracionEmpleado").value;
    var Afiliado = document.getElementById("chkCuota").checked;
    var selectionjornada = document.getElementById("JornadaEmpleado").value;

    // Validar los campos
    if (!ApellidoNombreEmpleado) {
        alert("Debe ingresar el Apellido y Nombre del Empleado");
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(ApellidoNombreEmpleado)) {
        alert("Ingrese solo letras en el campo Apellido y Nombre del Empleado");
        return false;
    }

    if (!CuilEmpleado) {
        alert("Debe ingresar el CUIL del Empleado");
        return false;
    }

    if (!selectionjornada) {
        alert("Debe seleccionar una Jornada");
        return false;
    }

    if (CuilEmpleado.length !== 13) {
        alert("El CUIL debe constar de 13 caracteres");
        return false;
    }

    CuilEmpleado = CuilEmpleado.replace(/[^0-9]/g, "");

    if (isNaN(CuilEmpleado)) {
        alert("Ingrese solo números en el campo CUIL");
        return false;
    }

    if (!FechaIngresoEmpleado) {
        alert("Debe ingresar la Fecha de Ingreso del Empleado");
        return false;
    }

    if (CategoriaEmpleado === "-1") {
        alert("Debe seleccionar la Categoría del Empleado");
        return false;
    }

    if (!TotRemuneracionEmpleado) {
        alert("Debe ingresar el Total de Remuneración del Empleado");
        return false;
    }

    if (isNaN(TotRemuneracionEmpleado)) {
        alert("Ingrese solo números en el campo Total Remuneración");
        return false;
    }

    if (!selectionjornada) {
        alert("Seleccione una jornada");
        return false;
    }

    if (matrizEmpleado.some((empleado) => empleado.CuilEmpleado === CuilEmpleado)) {
        alert("Ingrese un CUIL distinto");
        return false;
    }

    // Agregar el empleado a la tabla
    var table = document.getElementById("bodyEmpleado");
    var row = table.insertRow(0);

    row.insertCell(0).innerHTML = ApellidoNombreEmpleado;
    row.insertCell(1).innerHTML = CuilEmpleado;
    row.insertCell(2).innerHTML = FechaIngresoEmpleado;
    row.insertCell(3).innerHTML = TotRemuneracionEmpleado;
    row.insertCell(4).innerHTML = '<button class="btn btn-danger borrarEmpleado" type="button" onclick="eliminarEmpleado(\'' + CuilEmpleado + '\')">Eliminar</button>';

    // Limpiar los campos
    document.getElementById("ApellidoNombreEmpleado").value = "";
    document.getElementById("CuilEmpleado").value = "";
    document.getElementById("FechaIngresoEmpleado").value = "";
    document.getElementById("CategoriaEmpleado").value = "-1";
    document.getElementById("TotRemuneracionEmpleado").value = "";
    document.getElementById("chkCuota").checked = false;
    document.getElementById("JornadaEmpleado").value = 0;

    // Agregar el empleado a la matriz
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
    // Encontrar el índice del objeto en la matrizTitular
    var index = matrizEmpleado.findIndex(function (empleado) {
        return empleado.CuilEmpleado === CuilEmpleado;
    });

    // Verificar si se encontró el objeto
    if (index !== -1) {
        // Eliminar el objeto de la matrizEmpleado
        matrizEmpleado.splice(index, 1);
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

    if (isEmpty(SucesoraAntecedente)) {
        alert("Debe ingresar el Sucesora Antecedente");
        return false;
    }

    if (!isOnlyLetters(SucesoraAntecedente)) {
        alert("Ingrese solo letras en el campo Sucesora Antecedente");
        return false;
    }

    if (isEmpty(NumeroEmpresaAntecedente)) {
        alert("Debe ingresar el Numero Empresa Antecedente");
        return false;
    }

    if (!isNumeric(NumeroEmpresaAntecedente)) {
        alert("Ingrese solo números en el campo Numero Empresa");
        return false;
    }

    if (isEmpty(FechaTransferenciaAntecedente)) {
        alert("Debe ingresar la Fecha Transferencia Antecedente");
        return false;
    }

    if (isEmpty(TelefonoAntecedente)) {
        alert("Debe ingresar el Telefono Antecedente");
        return false;
    }

    if (LocalidadAntecedente === "0") {
        alert("Debe elegir una Localidad (Antecedente)");
        return false;
    }

    if (ProvinciaAntecedente === "0") {
        alert("Debe elegir una Provincia (Antecedente)");
        return false;
    }

    if (!isNumeric(TelefonoAntecedente)) {
        alert("Ingrese solo números en el campo Telefono Antecedente");
        return false;
    }

    for (var i = 0; i < matrizAntecedente.length; i++) {
        var antecedente = matrizAntecedente[i];
        if (antecedente.SucesoraAntecedente === SucesoraAntecedente) {
            alert("Ingrese una sucesora distinta");
            return false;
        }
    }

    var table = document.getElementById('bodyAntecedente');
    var newRow = table.insertRow(0);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = SucesoraAntecedente;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = NumeroEmpresaAntecedente;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = FechaTransferenciaAntecedente;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = '<button class="btn btn-danger borrarAntecedente" type="button" onclick="eliminarAntecedente(\'' + SucesoraAntecedente + '\')">Eliminar</button>';

    resetFields();

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

    // Función para obtener el valor de un campo por su ID
    function getValue(id) {
        return document.getElementById(id).value;
    }

    // Función para verificar si un valor está vacío
    function isEmpty(value) {
        return value.trim() === "";
    }

    // Función para verificar si un valor contiene solo letras
    function isOnlyLetters(value) {
        return /^[a-zA-Z]+$/.test(value);
    }

    // Función para verificar si un valor es numérico
    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    // Función para restablecer los valores de los campos
    function resetFields() {
        document.getElementById("SucesoraAntecedente").value = "";
        document.getElementById("NumeroEmpresaAntecedente").value = "";
        document.getElementById("FechaTransferenciaAntecedente").value = "";
        document.getElementById("CalleAntecedente").value = "";
        document.getElementById("PisoAntecedente").value = "";
        document.getElementById("LocalidadAntecedente").value = "0";
        document.getElementById("ProvinciaAntecedente").value = "0";
        document.getElementById("TelefonoAntecedente").value = "";
    }
}

function eliminarAntecedente(SucesoraAntecedente) {
    // Encontrar el índice del objeto en la matrizTitular
    var index = matrizAntecedente.findIndex(function (antecedente) {
        return antecedente.SucesoraAntecedente === SucesoraAntecedente;
    });

    // Verificar si se encontró el objeto
    if (index !== -1) {
        // Eliminar el objeto de la matrizAntecedente
        matrizAntecedente.splice(index, 1);
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

    if (LocalidadSucursal == 0) {
        alert("Debe de elegir una Localidad (Sucursales)");
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
    document.getElementById("LocalidadSucursal").value = 0;

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
    // Encontrar el índice del objeto en la matrizSucursal
    var index = matrizSucursal.findIndex(function (sucursal) {
        return sucursal.NombreSucursal === NombreSucursal;
    });

    // Verificar si se encontró el objeto
    if (index !== -1) {
        // Eliminar el objeto de la matrizAntecedente
        matrizSucursal.splice(index, 1);
    }
}

$(document).on('click', '.eliminarSucursal', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

//---------------------------------------------------//

function fileHabMunicipal() {
    const fileList = event.target.files;
    document.getElementById("textHabilitacionMunicipal").value = fileList[0].name;
}

function fileCompAfip() {
    const fileList = event.target.files;
    document.getElementById("textComprobanteAfip").value = fileList[0].name;
}

function fileContSocial() {
    const fileList = event.target.files;
    document.getElementById("textContratoSocial").value = fileList[0].name;
}

function fileNota() {
    const fileList = event.target.files;
    document.getElementById("textNotaEscrita").value = fileList[0].name;
}

function fileUltimoRS() {
    const fileList = event.target.files;
    document.getElementById("textUltimoReciboSueldo").value = fileList[0].name;
}


function valiCuit() {
    var cuit = document.getElementById("Cuit").value;
    var cadena1 = "";
    var cadena2 = "";
    var cadena3 = "";

    if (cuit != "") {
        if (cuit.length == 11) {
            cadena1 = cuit.slice(0, 2);
            cadena2 = cuit.slice(2, 10);
            cadena3 = cuit.slice(10, 11);
        } else if (cuit.length == 13) {
            cadena1 = cuit.slice(0, 2);
            cadena2 = cuit.slice(3, 11);
            cadena3 = cuit.slice(12, 13);
        }
        else {
            document.getElementById("Cuit").value = "";
            alert("Este cuit es invalido");
        }

        var rv = false;
        var verificador;
        var resultado = 0;
        var cuit_nro = cadena1 + cadena2 + cadena3;
        cuitnro = parseInt(cuit_nro);
        var codes = "6789456789";

        verificador = cadena3;
        var x = 0;
        while (x < 10) {
            var digitovalidador = codes.slice(x, x + 1); // recorrer digito x digito de codes 
            var digito = cuit_nro.slice(x, x + 1); // recorrer digito x digito de CUIT INGRESADO

            digitovalidador = parseInt(digitovalidador);
            digito = parseInt(digito);

            var digitoValidacion = digitovalidador * digito;
            resultado += digitoValidacion;
            x = x + 1;
        }
        resultado = resultado % 11;
        if (resultado == verificador) {
            var cuit = cadena1 + "-" + cadena2 + "-" + cadena3;
            document.getElementById("Cuit").value = cuit;
        } else {
            document.getElementById("Cuit").value = "";
            alert("Este cuit es invalido");
        }
    }
}

function valiCuil() {
    var cuit = document.getElementById("CuilEmpleado").value;
    var cadena1 = "";
    var cadena2 = "";
    var cadena3 = "";

    if (cuit != "") {
        if (cuit.length == 11) {
            cadena1 = cuit.slice(0, 2);
            cadena2 = cuit.slice(2, 10);
            cadena3 = cuit.slice(10, 11);
        }
        else if (cuit.length == 13) {
            cadena1 = cuit.slice(0, 2);
            cadena2 = cuit.slice(3, 11);
            cadena3 = cuit.slice(12, 13);
        } else {
            document.getElementById("CuilEmpleado").value = "";
            alert("Este cuit es invalido");
            return;
        }

        var rv = false;
        var verificador;
        var resultado = 0;
        var cuit_nro = cadena1 + cadena2 + cadena3;
        cuitnro = parseInt(cuit_nro);
        var codes = "6789456789";

        verificador = cadena3;
        var x = 0;
        while (x < 10) {
            var digitovalidador = codes.slice(x, x + 1); // recorrer digito x digito de codes 
            var digito = cuit_nro.slice(x, x + 1); // recorrer digito x digito de CUIT INGRESADO

            digitovalidador = parseInt(digitovalidador);
            digito = parseInt(digito);

            var digitoValidacion = digitovalidador * digito;
            resultado += digitoValidacion;
            x = x + 1;
        }
        resultado = resultado % 11;
        if (resultado == verificador) {
            var cuit = cadena1 + "-" + cadena2 + "-" + cadena3;
            document.getElementById("CuilEmpleado").value = cuit;
        } else {
            document.getElementById("CuilEmpleado").value = "";
            alert("Este cuit es invalido");
        }
    }
}
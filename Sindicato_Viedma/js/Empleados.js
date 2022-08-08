
function insertarEmpleado() {
    var ApellidoNombreEmpleado = document.getElementById("ApellidoNombreEmpleado").value;
    var CuilEmpleado = document.getElementById("CuilEmpleado").value;
    var FechaIngresoEmpleado = document.getElementById("FechaIngresoEmpleado").value;
    var CategoriaEmpleado = document.getElementById("CategoriaEmpleado").value;
    var TotRemuneracionEmpleado = document.getElementById("TotRemuneracionEmpleado").value;

    var selectionArt = document.getElementById("Aporte2ArtEmpleado").value;
    var Aporte2ArtEmpleado = selectionArt.options[selection.selectedIndex].value;

    var selectionSind = document.getElementById("Aporte1SindEmpleado").value;
    var Aporte1SindEmpleado = selectionSind.options[selection.selectedIndex].value;

    var selectionSep = document.getElementById("Aporte1SepEmpleado").value;
    var Aporte1SepEmpleado = selectionSep.options[selection.selectedIndex].value;

    var selectionjornada = document.getElementById("JornadaEmpleado").value;
    var JornadaEmpleado = selectionjornada.options[selection.selectedIndex].value;

    var RepetirCuitEmpresaEmpleado = document.getElementById("RepetirCuitEmpresaEmpleado").value;
    var CuitGlobal = document.getElementById("Cuit").value;

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

    if (isNaN(CuilEmpleado)) {
        alert("Ingrese solo numeros en el campo Cuit");
        return false;
    }

    if (CuilEmpleado.length != 11) {
        alert("El CUIL debe de constar de 11 caracteres");
        return false;
    }

    if (FechaIngresoEmpleado == "") {
        alert("Debe de ingresar la Fecha de Ingreso del Empleado");
        return false;
    }

    if (CategoriaEmpleado == "") {
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


    if (CuitGlobal == RepetirCuitEmpresaEmpleado) {
        alert("Los cuit de empresa de Cuit (Empresa) y Cuit Empresa (Empleado) no coinciden");
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
    table.rows[0].cells[3].innerHTML = CategoriaEmpleado;
    table.rows[0].insertCell(4);
    table.rows[0].cells[4].innerHTML = TotRemuneracionEmpleado;
    table.rows[0].insertCell(5);
    table.rows[0].cells[5].innerHTML = '<button class="w3-right w3-margin-top w3-button w3-card bg-zul w3-text-white w3-hover-blue w3-hover-border-cyan" style="margin: 0 0 0 200px;" type="button"  onclick="eliminarEmpleado(' + CuilEmpleado + ')">Eliminar</button >';

    document.getElementById("ApellidoNombreEmpleado").value = "";
    document.getElementById("CuilEmpleado").value = "";
    document.getElementById("FechaIngresoEmpleado").value = "";
    document.getElementById("CategoriaEmpleado").value = "";
    document.getElementById("TotRemuneracionEmpleado").value = "";
    document.getElementById("RepetirCuitEmpresaEmpleado").value = "";

    matrizEmpleado.push({
        ApellidoNombreEmpleado: ApellidoNombreEmpleado,
        CuilEmpleado: CuilEmpleado,
        FechaIngresoEmpleado: FechaIngresoEmpleado,
        CategoriaEmpleado: CategoriaEmpleado,
        TotRemuneracionEmpleado: TotRemuneracionEmpleado,
        Aporte2ArtEmpleado: Aporte2ArtEmpleado,
        Aporte1SindEmpleado: Aporte1SindEmpleado,
        Aporte1SepEmpleado: Aporte1SepEmpleado,
        JornadaEmpleado: JornadaEmpleado
    });

}

function eliminarEmpleado(cuit) {

}
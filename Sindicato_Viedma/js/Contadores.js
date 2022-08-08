

function insertarContador() {
    var NombreEstudioContador = document.getElementById("NombreEstudioContador").value;
    var DireccionContador = document.getElementById("DireccionContador").value;
    var TelefonoContador = document.getElementById("TelefonoContador").value;
    var EmailContador = document.getElementById("EmailContador").value;

    var RepetirCuitEmpresaContador = document.getElementById("RepetirCuitEmpresaContador").value;
    var CuitGlobal = document.getElementById("Cuit").value;

    //validaciones
    if (NombreEstudioContador == "") {
        alert("Debe de ingresar el Nombre Estudio Contador");
        return false;
    }

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

    if (CuitGlobal == RepetirCuitEmpresaContador) {
        alert("Los cuit de empresa de Cuit (Empresa) y Cuit Empresa (Contador) no coinciden");
        return false;
    }

    for (i = 0; i < matrizContador.length; i++) {
        if (matrizContador[i].NombreEstudioContador == NombreEstudioContador) {
            alert("Este Nombre ya existe en la tabla");
            return false;
        }
    }

    var table = document.getElementById('bodyContador');
    var x = table.insertRow(0);
    var e = table.rows.length - 1;
    var l = table.rows[e].cells.length;

    //x.innerHTML = "&nbsp;";
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = NombreEstudioContador;
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = DireccionContador;
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = TelefonoContador;
    table.rows[0].insertCell(3);
    table.rows[0].cells[3].innerHTML = EmailContador;
    table.rows[0].insertCell(4);
    table.rows[0].cells[4].innerHTML = '<button class="w3-button w3-card bg-zul w3-text-white w3-hover-blue w3-hover-border-cyan" type="button"  onclick="eliminarContador(' + "'" + NombreEstudioContador + "'" + ')">Eliminar</button >';

    document.getElementById("NombreEstudioContador").value = "";
    document.getElementById("DireccionContador").value = "";
    document.getElementById("TelefonoContador").value = "";
    document.getElementById("EmailContador").value = "";
    document.getElementById("RepetirCuitEmpresaContador").value = "";

    matrizContador.push({
        NombreEstudioContador: NombreEstudioContador,
        DireccionContador: DireccionContador,
        TelefonoContador: TelefonoContador,
        EmailContador: EmailContador
    });
   
}

function eliminarContador(NombreEstudioContador) {
    // Eliminar Fila
    var resume_table = document.getElementById("bodyContador");

    for (var i = 0, row; row = resume_table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            var valor = ${col.innerText };

            //if ( == NombreEstudioContador) {
            //    document.getElementById("bodyContador").deleteRow(r);
            //}
        }

    }

    // Eliminar Matriz
    for (i = 0; i < matrizContador.length; i++) {
        if (matrizContador[i].NombreEstudioContador == NombreEstudioContador) {
            matrizContador.splice(i, 1);
        }
    }
}
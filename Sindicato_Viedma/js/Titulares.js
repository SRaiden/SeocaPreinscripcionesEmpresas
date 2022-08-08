

function insertarTitular() {
    var ApellidoNombreTitular = document.getElementById("ApellidoNombreTitular").value;
    var DomicilioParticularTitular = document.getElementById("DomicilioParticularTitular").value;
    var DocumentoTitular = document.getElementById("DocumentoTitular").value;
    var CargoEmpresaTitular = document.getElementById("CargoEmpresaTitular").value;
    var RepetirCuitEmpresaTitular = document.getElementById("RepetirCuitEmpresaTitular").value;

    var CuitGlobal = document.getElementById("Cuit").value;

    //validaciones
    if (ApellidoNombreTitular == "") {
        alert("Debe de ingresar el Apellido y Nombre del Titular");
        return false;
    }

    if (DomicilioParticularTitular == "") {
        alert("Debe de ingresar Domicilio Particular Titular");
        return false;
    }

    if (DocumentoTitular == "") {
        alert("Debe de ingresar Documento Titular");
        return false;
    }

    if (DocumentoTitular.length != 8) {
        alert("El Documento Titular debe de constar de 8 caracteres");
        return false;
    }

    if (CargoEmpresaTitular == "") {
        alert("Debe de ingresar Cargo Empresa");
        return false;
    }

    if (CuitGlobal == RepetirCuitEmpresaTitular) {
        alert("Los cuit de empresa de Cuit (Empresa) y Cuit Empresa (Titular) no coinciden");
        return false;
    }

    for (i = 0; i < matrizTitular.length; i++) {
        if (matrizTitular[i].ApellidoNombreTitular == ApellidoNombreTitular) {
            alert("Ingrese un CUIL distinto");
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
    table.rows[0].cells[3].innerHTML = '<button class="w3-button w3-card bg-zul w3-text-white w3-hover-blue w3-hover-border-cyan" type="button"  onclick="eliminarTitular(' + DocumentoTitular + ')">Eliminar</button >';


    document.getElementById("ApellidoNombreTitular").value = "";
    document.getElementById("DomicilioParticularTitular").value = "";
    document.getElementById("DocumentoTitular").value = "";
    document.getElementById("CargoEmpresaTitular").value = "";
    document.getElementById("RepetirCuitEmpresaTitular").value = "";

    matrizTitular.push({
        ApellidoNombreTitular: ApellidoNombreTitular,
        DomicilioParticularTitular: DomicilioParticularTitular,
        DocumentoTitular: DocumentoTitular,
        CargoEmpresaTitular: CargoEmpresaTitular
    });
}


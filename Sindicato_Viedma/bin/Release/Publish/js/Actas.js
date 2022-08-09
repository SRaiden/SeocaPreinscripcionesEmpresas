$(".btnSubirArchivo").click(function (eve) {
    $("#modal-content").load("/Actas/SubirArchivo/" + $(this).data("id")); // GET
});

function DescargarLiquidacion(id) {
    $.ajax({
        url: '/Actas/DescargarArchivoLiquidacion',
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
            idLiquidacion: id,
        }
    });
}

function validarSubidaArchivo() {
    var Archivo = document.getElementById("File").value;
    if (Archivo == "") {
        alert("Debe de ingresar un Archivo");
        return false;
    }

    var fileSize = document.getElementById("File").size;
    if (fileSize > 5000000) {
        alert('El archivo no debe superar los 5MB');
        return false;
    }

    var url = document.getElementById("File").value;
    document.getElementById("Cuenta").value = url;

    return true;
}

function validarCamposActas() {
    var opcion = confirm("¿Desea ingresar el Acta?");
    if (opcion == true) {
        var e = document.getElementById("Cuenta");
        var opcion = e.options[e.selectedIndex].value;

        var Numero_Acta = document.getElementById("Numero_Acta").value;
        var Cuota = document.getElementById("Cuotas").value;
        var Fecha = document.getElementById("Fecha").value;

        var Importe = parseFloat(document.getElementById("Importe").value);
        var Interes_Mora = document.getElementById("Interes_Mora").value;
        var Total = parseFloat(document.getElementById("Total").value);

        if (Numero_Acta == "") {
            alert("Debe de ingresar el numero de Numero_Acta");
            return false;
        }

        if (Numero_Acta.length > 6) {
            alert("No puede ingresar mas de 6 digitos en el campo Numero_Acta");
            return false;
        }

        if (Cuota == "0") {
            alert("Debe de ingresar la Cuota");
            return false;
        }

        if (opcion == ""){
            alert("Debe de ingresar la Cuenta");
            return false;
        }

        if (Fecha == "") {
            alert("Debe de ingresar la Fecha");
            return false;
        }

        if (Importe <= 0) {
            alert("Ingrese un Importe");
            return false;
        }

        if (isNaN(Importe)) {
            alert("Debe de ingresar un numero en Importe");
            return false;
        }

        if (isNaN(Interes_Mora)) {
            alert("Debe de ingresar un numero en Interes_Mora");
            return false;
        }

        return true;

    } else {
        return false;
    }
}

function changeCampos() {
    var Numero_Acta = document.getElementById("Numero_Acta").value;

    if (isNaN(Numero_Acta)) {
        document.getElementById("Numero_Acta").value = "";
    }


    var Importe = document.getElementById("Importe").value;
    Importe = Importe.replace(/,/g, ".");
    if (!isNaN(Importe)) {
        document.getElementById("Importe").value = "0.00";
    }
    Importe = parseFloat(Importe);
    Importe = Importe.toFixed(2);
    Importe = parseFloat(Importe);
    document.getElementById("Importe").value = Importe;
    if (Importe < 0) {
        document.getElementById("Importe").value = 0.00;
        Importe = 0.00;
    }


    var Interes_Mora = document.getElementById("Interes_Mora").value;
    if (!isNaN(Interes_Mora)) {
        document.getElementById("Interes_Mora").value = "0.00";
    }
    Interes_Mora = parseFloat(Interes_Mora);
    document.getElementById("Interes_Mora").value = Interes_Mora;
    if (Interes_Mora < 0) {
        document.getElementById("Interes_Mora").value = 0.00;
        Interes_Mora = 0.00;
    }

    var total = parseFloat(Importe + Interes_Mora);
    total = total.toFixed(2);
    document.getElementById("Total").value = total;
}

function eliminar(id) {
    var answer = window.confirm("Desea eliminar la boleta?");
    if (answer) {
        var answer2 = window.confirm("Esta realmente seguro??, no habra vuelta atras ");
        if (answer2) {
            $.ajax({
                url: '/Actas/Eliminar',
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
                    ID: id,
                }
            });
        }
    }
}
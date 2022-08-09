$(".btnAgregar").click(function (eve) {
    $("#modal-content").load("/Personal/AgregarEmpleado"); // GET
});

$(".btnEditar").click(function (eve) {
    $("#modal-content").load("/Personal/EditarEmpleado/" + $(this).data("id")); // GET
});

$(".btnEliminar").click(function (eve) {
    $("#modal-content").load("/Personal/BorrarEmpleado/" + $(this).data("id")); // GET
});

$(".btnHistorial").click(function (eve) {
    $("#modal-content").load("/Liquidacion/Historial/" + $(this).data("id")); // GET
});

function verificarBajaEmpleado() {
    var Fechabaja = document.getElementById("Fechabaja").value;

    if (Fechabaja == "") {
        alert("Debe de ingresar la Fecha de Baja");
        return false;
    }

    return true;
}

function verificarCargaEmpleado() {
    var Apellido = document.getElementById("Apellido").value;
    var Nombre = document.getElementById("Nombre").value;
    var Sexo = document.getElementById("Sexo").value;
    var CUIL = document.getElementById("CUIL").value;
    var FechaNac = document.getElementById("FechaNac").value;
    var FechaIng = document.getElementById("FechaIng").value;
    /*var noRemun = document.getElementById("noRemun").value;*/
    var Remun = document.getElementById("Remun").value;
    var horas = document.getElementById("CantHoras").value;

    var SelectCategoria = document.getElementById("Categorias");
    var optionCategoria = SelectCategoria.options[SelectCategoria.selectedIndex].value;


   /* noRemun = noRemun.replace(/,/g, '.');*/
    Remun = Remun.replace(/,/g, '.');

    if (Apellido == "") {
        alert("Debe de ingresar el Apellido");
        return false;
    }

    if (Nombre == "") {
        alert("Debe de ingresar el Nombre");
        return false;
    }

    if (CUIL == "") {
        alert("Debe de ingresar el CUIL");
        return false;
    }

    if (CUIL.length != 11) {
        alert("El CUIL debe de constar de 11 caracteres");
        return false;
    }

    if (isNaN(CUIL)) {
        alert("Ingrese solo numeros en el campo CUIL");
        return false;
    }

    if (FechaNac == "") {
        alert("Debe de ingresar la Fecha de Nacimiento");
        return false;
    }

    if (horas > 400 || horas < 0) {
        alert("Ingrese un valor entre 1 y 400 para las horas");
        return false;
    }

    if (Sexo == "-") {
        alert("Debe de ingresar el sexo");
        return false;
    }

    if (optionCategoria == "0") {
        alert("Debe de ingresar una Categoria");
        return false;
    }




    if (FechaIng == "") {
        alert("Debe de ingresar la Fecha de Ingreso");
        return false;
    }

    //if (isNaN(noRemun)) {
    //    alert("Ingrese solo numeros en el campo No Remuneracion");
    //    return false;
    //}

    if (isNaN(Remun)) {
        alert("Ingrese solo numeros en el campo Remuneracion");
        return false;
    }

    var arrayNacimiento = FechaNac.split("-");
    var arrayIngreso = FechaIng.split("-");

    var anioNac = parseInt(arrayNacimiento[0]);
    var anioIng = parseInt(arrayIngreso[0]);

    if (anioNac > anioIng) {
        alert("El año de Nacimiento no puede ser posterior al año de Ingreso");
        return false;
    } else if (anioNac == anioIng) {
        alert("El año de Nacimiento no puede ser igual al año de Ingreso");
        return false;
    }

    return true;
}

var remunerativoGlobal = 0;
//var noRemunerativoGlobal = 0;

function clickMontos(idEmpleado) {
    document.querySelectorAll('.EmpleadosCargados tbody tr').forEach(function (e) {
        var idEmpleadoActual = e.querySelector('.IdEmpleado').innerText;
        if (idEmpleado == idEmpleadoActual) {
            remunerativoGlobal = e.querySelector('.Remunerativo').value;
           /* noRemunerativoGlobal = e.querySelector('.NoRemunerativo').value;*/
        }
    });
}

function validarMontos() {

    document.querySelectorAll('.EmpleadosCargados tbody tr').forEach(function (e) {

        var montoRemunerativo = e.querySelector('.Remunerativo').value;
       /* var montoNoRemunerativo = e.querySelector('.NoRemunerativo').value;*/

        montoRemunerativo = montoRemunerativo.replace(/,/g, ".");
        //montoNoRemunerativo = montoNoRemunerativo.replace(/,/g, ".");

        if (montoRemunerativo == "" || isNaN(montoRemunerativo)) {
            e.querySelector('.Remunerativo').value = remunerativoGlobal;
        } else {
            montoRemunerativo = parseFloat(montoRemunerativo);
            montoRemunerativo = montoRemunerativo.toFixed(2);
            montoRemunerativo = parseFloat(montoRemunerativo);
            e.querySelector('.Remunerativo').value = montoRemunerativo;
            if (montoRemunerativo < 0) {
                e.querySelector('.Remunerativo').value = remunerativoGlobal;
            }
        }

        //if (montoNoRemunerativo == "" || isNaN(montoNoRemunerativo)) {
        //    e.querySelector('.NoRemunerativo').value = noRemunerativoGlobal;
        //} else {
        //    montoNoRemunerativo = parseFloat(montoNoRemunerativo);
        //    montoNoRemunerativo = montoNoRemunerativo.toFixed(2);
        //    montoNoRemunerativo = parseFloat(montoNoRemunerativo);
        //    e.querySelector('.NoRemunerativo').value = montoNoRemunerativo;
        //    if (montoNoRemunerativo < 0) {
        //        e.querySelector('.NoRemunerativo').value = noRemunerativoGlobal;
        //    }
        //}
        

    });
}

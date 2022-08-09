function verificarCargaEmpleado() {
    var Apellido = document.getElementById('Apellido').value;
    var Nombre = document.getElementById('Nombre').value;
    var CUIL = document.getElementById('CUIL').value;
    var FechaNac = document.getElementById('FechaNac').value;
    var FechaIng = document.getElementById('FechaIng').value;
    var noRemun = document.getElementById('noRemun').value;
    var Remun = document.getElementById('Remun').value;

    var SelectCategoria = document.getElementById('Categorias');
    var optionCategoria = SelectCategoria.options[SelectCategoria.selectedIndex].value;

    var SelectSubategoria = document.getElementById('Subcategorias');
    var optionSubcategoria = SelectSubategoria.options[SelectSubategoria.selectedIndex].value;

    noRemun = noRemun.replace(/,/g, '.');
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

    if (optionCategoria == "0") {
        alert("Debe de ingresar una Categoria");
        return false;
    }

    if (optionSubcategoria == "0") {
        alert("Debe de ingresar una SubCategoria");
        return false;
    }

    if (FechaIng == "") {
        alert("Debe de ingresar la Fecha de Ingreso");
        return false;
    }

    if (isNaN(noRemun)) {
        alert("Ingrese solo numeros en el campo No Remuneracion");
        return false;
    }

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

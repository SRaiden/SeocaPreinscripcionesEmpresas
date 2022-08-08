function modifyPass() {


    var pass = document.getElementById('pass').value;
    var passOld = document.getElementById('passOld').value;
    var passRepeat = document.getElementById('passRepeat').value;
    var passNew = document.getElementById('passNew').value;

    if (passOld == "") {
        alert("Ingrese la contraseña actual");
        return false;
    }

    if (passNew == "") {
        alert("Ingrese una nueva contraseña");
        return false;
    }

    if (pass != passOld) {
        alert("Ingrese correctamente la contraseña ACTUAL");
        return false;
    }

    if (passRepeat != passNew) {
        alert("Las contraseñas no coinciden");
        return false;
    } 

    return true;
}

function cerrar() {
    document.getElementById('id02').style.display = 'none';
}

function cerrarId01() {
    document.getElementById('id01').style.display = 'none';
}
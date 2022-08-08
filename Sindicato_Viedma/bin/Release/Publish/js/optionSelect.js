function VerSusSubcategorias() {

    // Option CATEGORIA
    var SelectCategoria = document.getElementById("Categorias");
    var optionCategoria = SelectCategoria.options[SelectCategoria.selectedIndex].value;



    // Recorrer Cada Option SubCategoria
    //var idSubcategoria = document.getElementById("Subcategorias"); // obtener todos los option del Select
    //for (var z = 0; z < idSubcategoria.children.length; z++) {
    //    var value = idSubcategoria.options[z].value;
    //    if (value == "0") {
    //        idSubcategoria.options[z].style.display = "block";
    //    }else if (value == optionCategoria) {
    //        idSubcategoria.options[z].style.display = "block";
    //    } else {
    //        idSubcategoria.options[z].style.display = "none";
    //    }
    //}
    //idSubcategoria.selectedIndex = "0";
}


//function guardarSubcategoria() {
//    var SelectSubategoria = document.getElementById("Subcategorias");
//    var textSubcategoria = SelectSubategoria.options[SelectSubategoria.selectedIndex].text;

//    document.getElementById("NombreSubcategoria").value = textSubcategoria;
//}

function cambiarSigno() {

    var Remun = document.getElementById("Remun").value;
    Remun = Remun.replace(/,/g, ".");
    if (Remun == "" || isNaN(Remun)) {
        document.getElementById("Remun").value = 0.00;

    }
    Remun = parseFloat(Remun);
    Remun = Remun.toFixed(2);
    Remun = parseFloat(Remun);
    document.getElementById("Remun").value = Remun;
    if (Remun < 0) {
        document.getElementById("Remun").value = 0.00;
    }


    var noRemun = document.getElementById("noRemun").value;
    noRemun = noRemun.replace(/,/g, ".");
    if (noRemun == "" || isNaN(noRemun)) {
        document.getElementById("noRemun").value = 0.00;

    }
    noRemun = parseFloat(noRemun);
    noRemun = noRemun.toFixed(2);
    noRemun = parseFloat(noRemun);
    document.getElementById("noRemun").value = noRemun;
    if (noRemun < 0) {
        document.getElementById("noRemun").value = 0.00;
    }

}
function UploadProcess() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

    if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();

        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
            reader.onload = function (e) {
                GetTableFromExcel(e.target.result);
            };
            reader.readAsBinaryString(fileUpload.files[0]);
        } else {
            //For IE Browser.
            reader.onload = function (e) {
                var data = "";
                var bytes = new Uint8Array(e.target.result);
                for (var i = 0; i < bytes.byteLength; i++) {
                    data += String.fromCharCode(bytes[i]);
                }
                GetTableFromExcel(data);
            };
            reader.readAsArrayBuffer(fileUpload.files[0]);
        }

    } else {
        alert("This browser does not support HTML5.");
    }
    
}



var result = {};
var Empleados = new Array();

function GetTableFromExcel(data) {
    //Read the Excel File data in binary
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //get the name of First Sheet.
    var Sheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    Empleados = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    $.ajax({
        url: '/Importar/ImportarEmpleados',
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
            Empleados: JSON.stringify(Empleados),
        }
    });

}

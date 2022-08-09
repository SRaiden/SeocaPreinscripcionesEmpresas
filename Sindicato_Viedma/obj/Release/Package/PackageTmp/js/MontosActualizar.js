$(document).ready(function () {
    $(function () {
        $('#ActualizarMontos').click(function (e) {
            var Montos = new Array();
            document.querySelectorAll('.EmpleadosCargados tbody tr').forEach(function (e) {
                var fila = {
                    Estado: e.querySelector('.Estado').innerText,
                    IDEmpleado: e.querySelector('.IdEmpleado').innerText,
                    MontoRemuneracion: e.querySelector('.Remunerativo').value,
                   /* MontoNoRemunerativo: e.querySelector('.NoRemunerativo').value*/
                };
                Montos.push(fila);
            });

            $.ajax({
                url: "/Personal/ActualizarMontosEmpleados",
                type: 'POST',
                dataType: "json",
                //contentType: "application/json;charset=utf-8",
                data: {
                    MontosCargados: JSON.stringify(Montos),
                },
                success: function (response) {
                    alert(response.responseText);
                    location.reload();
                },
                error: function (response) {
                    alert(response.responseText);
                }
            });
        });
    }); 
});
let tablePensionesPagadas;
let rowTable = "";
let divLoading = document.querySelector("#divLoading");
document.addEventListener('DOMContentLoaded', function(){
    tablePensionesPagadas = $('#tablePensionesPagadas').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Pensiones/listPensionesPagadas",
            "dataSrc":""
        },
        "columns":[
            {"data":"CI_Estudiante"},
            {"data":"Matricula"},
            {"data":"Nombre_Estudiante"},
            {"data":"Apellido_Estudiante"},
            {"data":"Curso"},
            {"data":"Gestion"},
            {"data":"mes_pago"},
            {"data":"Estado_Pago"},
            {"data":"options"}
        ],
        'dom': 'lBfrtip',
        'buttons': [
            {
                "extend": "copyHtml5",
                "text": "<i class='far fa-copy'></i> Copiar",
                "titleAttr":"Copiar",
                "className": "btn btn-secondary"
            },{
                "extend": "excelHtml5",
                "text": "<i class='fas fa-file-excel'></i> Excel",
                "titleAttr":"Esportar a Excel",
                "className": "btn btn-success"
            },{
                "extend": "pdfHtml5",
                "text": "<i class='fas fa-file-pdf'></i> PDF",
                "titleAttr":"Esportar a PDF",
                "className": "btn btn-danger"
            },{
                "extend": "csvHtml5",
                "text": "<i class='fas fa-file-csv'></i> CSV",
                "titleAttr":"Esportar a CSV",
                "className": "btn btn-info"
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]  
    });

    // Consultar Pensiones de estudiante
    if(document.querySelector("#formCiEstudiante")){alert
        let formCiEstudiante = document.querySelector("#formCiEstudiante");
        formCiEstudiante.onsubmit = function(e) {
            e.preventDefault();
            let Ci = document.querySelector('#txtCiEstudiante').value;
           
            if(Ci==''){
                swal("Atención", "Todos los campos son obligatorios." , "error");
                return false;
            }
            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Pensiones/getPensionesEst/'; 
            let formData = new FormData(formCiEstudiante);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        // iNSERTAMOS LOS DATOS EN LA TABLA
                        document.querySelector('#celCiEstudiante').innerHTML=objData.ci;
                        document.querySelector('#celNombreEstudiante').innerHTML=objData.nombre;
                        document.querySelector('#listaPensionesEstudiante').innerHTML=objData.tabla;
                        swal("Encontrado", objData.msg , "success");

                        $('#modalFormBuscarEstudiante').modal("hide");
                        formCiEstudiante.reset();
                    }else{
                        swal("Error", objData.msg , "error");
                    }

                }
                divLoading.style.display = "none";
                return false;

            }
            
        }   
    }
    // Pagar pension 
    if(document.querySelector("#formPagoPension")){
        let formPago = document.querySelector("#formPagoPension");
        formPago.onsubmit = function(e) {
            e.preventDefault();
            let MontoPension = document.querySelector('#txtMonto').value;
            let tipoPago = document.querySelector('#listTipoPago').value;
            let codigo = document.querySelector('#txtCodigo').value;
            let Nombre = document.querySelector('#txtNameAportante').value;
            let Apellido = document.querySelector('#txtLastAportante').value;
            let Ci = document.querySelector('#txtCiAportante').value;
            let Parentesco = document.querySelector('#txtParentesco').value;
            let CiEstudiante = document.querySelector('#intCiEstudiante').value;
            let IdPension = document.querySelector('#intIdPension').value;
            
            if(tipoPago==''||MontoPension==''||Nombre==''||Apellido==''||Parentesco==''||Ci==''){
                swal("Atención", "Todos los campos son obligatorios." , "error");
                return false;
            }
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Pensiones/setPagoPension'; 
            let formData = new FormData(formPago);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        // Si se logró realizar la transacción
                        buscarPensionesCiEstudiante(CiEstudiante);
                        fntImprimirRecibo(IdPension);
                        swal("Éxito", objData.msg , "success");
                        document.querySelector("#formPagoPension").reset();
                        $('#modalFormPagoPension').modal("hide");
                        formPago.reset();
                    }else{
                        swal("Error", objData.msg , "error");
                    }

                }
                return false;
            }
        }   
    }
}, false);

function openModal()
{ abrirVentanaCentrada("https://www.ejemplo.com");
}

function fntPagarPension(idPension)
{
    document.querySelector("#formPagoPension").reset();
    divLoading.style.display = "flex";
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Pensiones/getDatoIdPension/'+idPension; 
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
        let objData = JSON.parse(request.responseText);
        if(objData.status)
        {
            document.querySelector("#intIdPension").value = objData.data.id_pension;
            document.querySelector("#txtMatricula").value = objData.data.id_matricula;
            document.querySelector("#txtEstudiante").value = objData.data.nombre_estudiante +' '+objData.data.apellido_estudiante;
            document.querySelector("#Mes").value = objData.data.mes_pension;
            document.querySelector("#txtGestion").value = objData.data.gestion;
            document.querySelector("#txtMonto").value = objData.data.monto_pagar;
            document.querySelector("#intCiEstudiante").value = objData.data.ci_estudiante;
            $('#modalFormPagoPension').modal('show');
        }else{
            
        }

    }
    divLoading.style.display = "none";
    return false;
    }

    
}
function fntConsultarEstudiante()
{
    document.querySelector("#formCiEstudiante").reset();
    $('#modalFormBuscarEstudiante').modal('show');
}


function abrirVentanaCentrada() {
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
  
    window.open(
      url=base_url+'/Pensiones/recibos/'+'2',
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  }
  

function buscarPensionesCiEstudiante(Ci)
{
    if(Ci==''){
        swal("Atención", "Todos los campos son obligatorios." , "error");
        return false;
    }
    divLoading.style.display = "flex";
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Usuarios/getPensionEstudiante/'; 
    let formData = new FormData();
    formData.append("txtCiEstudiante", Ci); // Agregar la variable Ci
    request.open("POST",ajaxUrl,true);
    request.send(formData);
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            if(objData.status)
            {
                // iNSERTAMOS LOS DATOS EN LA TABLA
                document.querySelector('#celCiEstudiante').innerHTML=objData.ci;
                document.querySelector('#celNombreEstudiante').innerHTML=objData.nombre;
                document.querySelector('#listaPensionesEstudiante').innerHTML=objData.tabla;
                swal("Tabla Actualizada", objData.msg , "success");

                $('#modalFormBuscarEstudiante').modal("hide");
                formCiEstudiante.reset();
            }else{
                swal("Error", objData.msg , "error");
            }

        }
        divLoading.style.display = "none";
        return false;

    }
}

function fntImprimirRecibo(idPension)
{
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
  
    window.open(
      url=base_url+'/Pensiones/recibos/'+idPension,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
}

// $(document).ready(function() {
//     var table = $('#tablaPension').DataTable();

//     // Simula los datos que recibes
//     var data = [
//         { matricula: 33, gestion: 2024, curso: 'Primaria: 2 - B', mes: 'Abril', monto: '50.00', estado_pago: 'Pendiente', operaciones: 'Acciones' },
//         { matricula: 34, gestion: 2024, curso: 'Primaria: 2 - B', mes: 'Mayo', monto: '50.00', estado_pago: 'Pendiente', operaciones: 'Acciones' }
//     ];

//     // Limpiar la tabla actual
//     table.clear();

//     // Agregar nuevas filas
//     table.rows.add(data).draw();
// });

// $('#PensionesEstudianteCi').DataTable();
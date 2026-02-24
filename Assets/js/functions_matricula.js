let tableMatricula;
let rowTable = "";
let divLoading = document.querySelector("#divLoading");

document.addEventListener('DOMContentLoaded', function(){
   
    tableMaterias = $('#tableMatricula').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Matricula/getMatriculaAll",
            "dataSrc":""
        },
        "columns":[
            {"data":"gestion"},
            {"data":"id_matricula"},
            {"data":"ci_estudiante"},
            {"data":"nombre_estudiante"},
            {"data":"apellido_estudiante"},
            {"data":"curso"},
            {"data":"estado_inscripcion"},
            {"data":"estado_matricula"},
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

    // Sección nueva matrícula
    
    if(document.querySelector("#formNewMatricula")){
       
        let formMatricula = document.querySelector("#formNewMatricula");
        formMatricula.onsubmit = function(e) {
            e.preventDefault();
            //Valores de los campos del formulario
            
            let year = new Date().getFullYear();
            let strCi = document.querySelector('#txtCi').value;
            let boolNuevo = document.querySelector('#newG').value;
            let intGestion = document.querySelector('#intGestion').value;
            let listParalelos = document.querySelector('#listParalelos').value;
            let listTipoEstudiante = document.querySelector('#listTipoEstudiante').value; // Regular Becado
            let strFolio = document.querySelector('#txtFolio').value;
            let listStateInscripcion= document.querySelector('#listStateInscripcion').value; //Inscrito o Confirmado
           
            if( intGestion  != year )
                {
                    swal("Atención", "No es posible matricular en la gestión:."+intGestion , "error");
                    return false;
                }
             //Validamos si ingresa los campos necesarios
            if( strCi== '' ||  boolNuevo== '' ||intGestion  == '' || listParalelos == '' ||  listTipoEstudiante== ''||  listStateInscripcion== '')
                {
                    swal("Atención", "Todos los campos son obligatorios en el formulario." , "error");
                    return false;
                }
            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Matricula/insertNewMatricula/'; 
            let formData = new FormData(formMatricula);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        if(rowTable == ""){
                            tableMaterias.api().ajax.reload(); //cuidar el table materias
                            fntListParalelos();
                        }else{

                            // En resumen, este código permite que la tabla de usuarios se actualice automáticamente en la interfaz de usuario sin necesidad de recargar toda la página. PARA ACTUALIZAR                                
                            // htmlStatus = intStatus == 1 ? 
                            // '<span class="badge badge-success">Activo</span>' : 
                            // '<span class="badge badge-danger">Inactivo</span>';
                            // rowTable.cells[0].textContent = strNivel;
                            // rowTable.cells[1].textContent = intGrado;
                            // rowTable.cells[2].textContent = strNombre;
                            // rowTable.cells[3].textContent = strArea;
                            // rowTable.cells[4].innerHTML = htmlStatus;
                            // rowTable="";
                        }
                        $('#modalFormMatricula').modal("hide");
                        formMatricula.reset();
                        swal("Matrícula", objData.msg ,"success");
                    }else{
                        swal("Error", objData.msg , "error");
                    }                  
                }
            }
            divLoading.style.display = "none";
            
        }
    }
}, false);

function openModal()
{
    document.querySelector("#formNewMatricula").reset();
    let year = new Date().getFullYear();
    document.querySelector('#intGestion').value =year;  
    $('#modalFormMatricula').modal('show');
}

    //FUNCIONES DEL SISTEMA -
window.addEventListener('load', function() {
        fntListParalelos();
        
}, false);

function fntListParalelos(){
    let year = new Date().getFullYear();
    if(document.querySelector('#listParalelos')){
        let ajaxUrl = base_url+'/Cursos/listParalelos/'+year;
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        request.open("GET",ajaxUrl,true);
        request.send();

        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                document.querySelector('#listParalelos').innerHTML = request.responseText;
                document.querySelector('#intGestion').value =year;
                $('#listParalelos').selectpicker('render');

            }
        }
    }
}

function consultaDato() {
    // Simula una consulta o un dato generado dinámicamente
    let resultadoConsulta = "Dato consultado";
    return resultadoConsulta;  
}

function agregarDato() {
    // Llama a consultaDato antes de agregar el dato
    let dato = consultaDato();

    // Lógica para agregar el dato (puedes reemplazar el console.log con una operación real)
    console.log("Agregando el dato: " + dato);
}

// Ejecuta la función principal
agregarDato();

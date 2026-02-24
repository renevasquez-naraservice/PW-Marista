let tableEstudiantes;
let rowTable = "";
let divLoading = document.querySelector("#divLoading");
document.addEventListener('DOMContentLoaded', function(){
    tableEstudiantes= $('#tableEstudiantes').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Estudiantes/getEstudiantesAll",
            "dataSrc":""
        },
        "columns":[
            {"data":"rude"},
            {"data":"nombre"},
            {"data":"apellido"},
            {"data":"estado_reg"},
            {"data":"email"},
            {"data":"cel"},
            {"data":"status_estudiante"},
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

    if(document.querySelector("#formEstudiante")){
        let formEstudiante = document.querySelector("#formEstudiante");
        formEstudiante.onsubmit = function(e) {
            e.preventDefault();
            
            let strCi       = document.querySelector('#txtCi').value;
            let strRUDE       = document.querySelector('#txtRUDE').value;
            let listEst   = document.querySelector('#listEst').value;
            let strNombre = document.querySelector('#txtNombre').value;
            let strApellido = document.querySelector('#txtApellido').value;
            let strSex = document.querySelector('#listSexEst').value;
            let intTelefono = document.querySelector('#txtCelular').value;
            let strEmail = document.querySelector('#txtEmail').value;
            let strDomicilio = document.querySelector('#txtDireccion').value;
            let dateFNacimiento = document.querySelector('#dateFNacimiento').value;
            let strPais = document.querySelector('#txtPais').value;
            let strCiudad = document.querySelector('#txtCiudad').value;
            let strProvincia = document.querySelector('#txtProvincia').value;
            let strColegioProc = document.querySelector('#txtColegioProc').value;
            let strEmergencia = document.querySelector('#txtEmergencia').value;

            let intStatus=document.querySelector('#listStatus').value;

            let strPassword = document.querySelector('#txtPassword').value;//Contraseña
            let strUsurario = document.querySelector('#txtEmail').value;//Usuario

            if(strCi == '' || strRUDE == '' || listEst == '' || strNombre == '' || strApellido == '' ||strSex == '' || intTelefono == '' || strEmail == '' || strDomicilio == '' || dateFNacimiento == '' || strPais == ''|| strCiudad == ''|| strProvincia == ''|| strColegioProc == ''|| strEmergencia == '')
            {
                swal("Atención", "Todos los campos son obligatorios." , "error");
                return false;
            }

            // let elementsValid = document.getElementsByClassName("valid");
            // for (let i = 0; i < elementsValid.length; i++) { 
            //     if(elementsValid[i].classList.contains('is-invalid')) { 
            //         swal("Atención", "Por favor verifique los campos en rojo." , "error");
            //         return false;
            //     } 
            // } 

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Estudiantes/setEstudiante'; 
            let formData = new FormData(formEstudiante);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);                
                    if(objData.status)
                    {
                        if (rowTable == "") {
                            tableEstudiantes.api().ajax.reload();
                        } else {
                             // En resumen, este código permite que la tabla de usuarios se actualice automáticamente en la interfaz de usuario sin necesidad de recargar toda la página. PARA ACTUALIZAR
                             htmlStatus = intStatus == 1 ? 
                             '<span class="badge badge-success">Activo</span>' : 
                             '<span class="badge badge-danger">Inactivo</span>';
                             rowTable.cells[0].textContent = strRUDE;
                             rowTable.cells[1].textContent = strNombre;
                             rowTable.cells[2].textContent = strApellido;
                             rowTable.cells[3].textContent = listEst;
                             rowTable.cells[4].textContent = strEmail;
                             rowTable.cells[5].textContent = intTelefono;
                             rowTable.cells[6].innerHTML = htmlStatus;
                             rowTable="";
                        }

                        
                        $('#modalFormEstudiantes').modal("hide");
                        formEstudiante.reset();
                        swal("Estudiantes", objData.msg ,"success");
                    }else{
                        swal("Error", objData.msg , "error");
                    }
                }
                divLoading.style.display = "none";
                return false;
            }
        }
    }
}, false);

function fntDelEstudiante(idEstudiante){
    swal({
        title: "Eliminar Estudiante",
        text: "¿Realmente quiere eliminar el Estudiante?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {
        
        if (isConfirm) 
        {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Estudiantes/delEstudiante';
            let strData = "idEstudiante="+idEstudiante;
            request.open("POST",ajaxUrl,true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        swal("Eliminar!", objData.msg , "success");
                        tableEstudiantes.api().ajax.reload();
                    }else{
                        swal("Atención!", objData.msg , "error");
                    }
                }else{
                    swal("Data Error!", objData.msg , "error");
                }
            }
        }

    });

}

function openModal()
{
    document.querySelector('#idEstudiante').value =""; //Limpia valores de id estudiante
    document.querySelector('#newStudent').value =1;    //Certifica que al abrir es un nuevo estudiante
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML ="Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Estudiante";
    document.querySelector("#formEstudiante").reset();
    $('#modalFormEstudiantes').modal('show');
}

function fntViewEstudiante(idEstudiante){
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Estudiantes/getEstudiante/'+idEstudiante;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);

            if(objData.status)
            {   
               let estadoEstudiante = objData.data.estudiante_status == 1 ? 
                '<span class="badge badge-success">Activo</span>' : 
                '<span class="badge badge-danger">Inactivo</span>';

                document.querySelector("#celCi").innerHTML = objData.data.ci;
                document.querySelector("#celNombre").innerHTML = objData.data.nombre;
                document.querySelector("#celApellido").innerHTML = objData.data.apellido;
                document.querySelector("#celSexo").innerHTML = objData.data.sexo;
                document.querySelector("#celFechaNacimiento").innerHTML = objData.data.fnacimiento;
                document.querySelector("#celCiudad").innerHTML = objData.data.ciudad;
                document.querySelector("#celPais").innerHTML = objData.data.pais;
                document.querySelector("#celProvincia").innerHTML = objData.data.provincia; 
                document.querySelector("#celCelular").innerHTML = objData.data.cel; 
                document.querySelector("#celDomicilio").innerHTML = objData.data.direccion_dom; 
                document.querySelector("#celEmail").innerHTML = objData.data.email; 
                document.querySelector("#celUsuario").innerHTML = objData.data.usuario; 
                document.querySelector("#celEmergencia").innerHTML = objData.data.emergencia; 
                document.querySelector("#celRude").innerHTML = objData.data.rude; 
                document.querySelector("#celColPRocedencia").innerHTML = objData.data.colegio_proc; 
                document.querySelector("#celEstadoRegEst").innerHTML = objData.data.estado_reg; 
                document.querySelector("#celFechaRegEst").innerHTML = objData.data.estudiante_fecha_reg; 
                document.querySelector("#celStatus").innerHTML = estadoEstudiante; 

                $('#modalViewEstudianteOther').modal('show');
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
}

function fntEditEstudiante(element,idEstudiante){
    rowTable = element.parentNode.parentNode.parentNode; 
    document.querySelector('#newStudent').value =0;    //Certifica que al abrir es un nuevo estudiante
    document.querySelector('#titleModal').innerHTML ="Actualizar Estudiante";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML ="Actualizar";

    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Estudiantes/getEstudiante/'+idEstudiante;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){

        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);

            if(objData.status)
            {
                document.querySelector("#idEstudiante").value = objData.data.id_estudiante;
                document.querySelector("#txtCi").value = objData.data.ci;
                document.querySelector("#txtRUDE").value = objData.data.rude;
                document.querySelector("#txtNombre").value = objData.data.nombre;
                document.querySelector("#txtApellido").value = objData.data.apellido;
                document.querySelector("#txtCelular").value = objData.data.cel;
                document.querySelector("#txtEmail").value = objData.data.email;
                document.querySelector("#txtDireccion").value =objData.data.direccion_dom;
                document.querySelector("#listEst").value =objData.data.estado_reg;
                document.querySelector("#txtColegioProc").value =objData.data.colegio_proc;
                document.querySelector("#listSexEst").value =objData.data.sexo;
                document.querySelector("#dateFNacimiento").value =objData.data.fnacimiento;
                document.querySelector("#txtPais").value =objData.data.pais;
                document.querySelector("#txtCiudad").value =objData.data.ciudad;
                document.querySelector("#txtProvincia").value =objData.data.provincia;
                document.querySelector("#txtEmergencia").value =objData.data.emergencia;
                
                $('#listEst').selectpicker('render'); //Prepara la lista del tipo de usuario a registrar 
                $('#listSexEst').selectpicker('render'); //Prepara la lista del tipo de usuario a registrar 
                
                if(objData.data.estudiante_status == 1){
                    document.querySelector("#listStatus").value = 1;
                }else{
                    document.querySelector("#listStatus").value = 2;
                }
                $('#listStatus').selectpicker('render');
            }
        }
    
        $('#modalFormEstudiantes').modal('show');
    }
}

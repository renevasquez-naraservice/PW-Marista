document.addEventListener('DOMContentLoaded', function(){
    
    if(document.querySelector("#formMatricula")){
        let formMatricula = document.querySelector("#formMatricula");
        formMatricula.onsubmit = function(e) {
            e.preventDefault();
            

            // if(){
            //     swal("Atención", "Todos los campos son obligatorios." , "error");
            //     return false;
            // }

          

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url+'/Matricula/setMatricula'; 
            let formData = new FormData(formMatricula);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    swal("Curso", "Curso registrado  Satisfactoriamente" ,"success");
                    formMatricula.reset();
                return false;
            }
        
    }
    divLoading.style.display = "none";
    
    $('#modalFormMatricula').modal("hide");
}
}
}, false);

// sector Funciones     **********************************************************************************************************
window.addEventListener('load', function() {
        fntListarCursosCards();
}, false);

function fntListarCursosCards(){
    divLoading.style.display = "flex";
    let anioActual = new Date().getFullYear();
    if(document.querySelector('#CursosCard')){
        let ajaxUrl = base_url+'/Cursos/listarcursos/'+anioActual;
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        request.open("GET",ajaxUrl,true);
        request.send();
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                document.querySelector('#CursosCard').innerHTML = request.responseText;
                // document.querySelectorAll('#imgCurso').forEach(img => {img.src = `${base_url}/Assets/images/class.png`;});
                const imagenes = ["clas1.jpg", "clas2.jpg", "clas3.jpg", "clas4.jpg"]; // Lista de imágenes
                // Selecciona todas las tarjetas que necesitan una imagen aleatoria
                const elementos = document.querySelectorAll('#imgCurso');
                // Asigna una imagen aleatoria a cada elemento
                elementos.forEach(elemento => {
                    const indiceAleatorio = Math.floor(Math.random() * imagenes.length); // Índice aleatorio
                    elemento.src = `${base_url}/Assets/images/${imagenes[indiceAleatorio]}`; // Asigna la imagen
                });

            }
        }
    }    
    divLoading.style.display = "none";
    
}
function fntViewCurso(idParalelo)
{
    divLoading.style.display = "flex";

    let year = new Date().getFullYear();
    let Paralelo = idParalelo;
    // 1 Llenado de datos-----------------------------------------------------------------------------------------------
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Cursos/viewCurso/'+Paralelo+'/'+year;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);

            if(objData.statusLista)
            {
                
                document.querySelector("#datoCurso").value = objData.dataCurso[0].nivel+'  -  '+objData.dataCurso[0].grado+'  '+objData.dataCurso[0].sigla;
                document.querySelector("#datoParalelo").value = objData.dataCurso[0].cupo;
                document.querySelector("#datoTurno").value = objData.dataCurso[0].turno;
                document.querySelector("#datoTutor").value = objData.dataCurso[0].tutor;
                document.querySelector("#datoInscritos").value = objData.dataCurso[0].total_inscritos;
                document.querySelector("#datoEstado").value = objData.dataCurso[0].status_paralelo;
                document.querySelector("#listarEstudiantes").value = objData.dataCurso[0].id_paralelo;

                document.querySelector("#listCursoEstudiantes").innerHTML = objData.listaCurso; 

                
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
    divLoading.style.display = "none";
    $('#modalViewCurso').modal('show');
}

function openModalCurso(){
    $('#modalFormCurso').modal('show');

}

function fntViewEstudiante(idEstudiante)
{ divLoading.style.display = "flex";
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
                document.querySelector("#celStudentCi").innerHTML = objData.data.ci; 
                document.querySelector("#celStudentNombre").innerHTML = objData.data.nombre; 
                document.querySelector("#celStudentApellido").innerHTML = objData.data.apellido; 
                document.querySelector("#celStudentSexo").innerHTML = objData.data.sexo; 
                document.querySelector("#celStudentFechaNacimiento").innerHTML = objData.data.fnacimiento; 
                document.querySelector("#celStudentCiudad").innerHTML = objData.data.ciudad; 
                document.querySelector("#celStudentPais").innerHTML = objData.data.pais; 
                document.querySelector("#celStudentProvincia").innerHTML = objData.data.provincia; 
                document.querySelector("#celStudentCelular").innerHTML = objData.data.cel; 
                document.querySelector("#celStudentDomicilio").innerHTML = objData.data.direccion_dom; 
                document.querySelector("#celStudentEmail").innerHTML = objData.data.email; 
                document.querySelector("#celStudentUsuario").innerHTML = objData.data.usuario; 
                document.querySelector("#celStudentEmergencia").innerHTML = objData.data.emergencia; 
                document.querySelector("#celStudentRude").innerHTML = objData.data.rude; 
                document.querySelector("#celStudentEstadoRegEst").innerHTML = objData.data.estado_reg; 
                document.querySelector("#celStudentFechaRegEst").innerHTML = objData.data.estudiante_fecha_reg; 
                document.querySelector("#celStudentColPRocedencia").innerHTML = objData.data.colegio_proc; 
                document.querySelector("#celStudentStatus").innerHTML = estadoEstudiante;  
                
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
    divLoading.style.display = "none";
    $('#modalViewEstudianteOther').modal('show');
    
}


function openModalMaterias()
{
    // document.querySelector("#formMatricula").reset();
    $('#modalFormMateria').modal('show');
}
function openModalDatCurso()
{
    // document.querySelector("#formMatricula").reset();
    $('#modalViewMateria').modal('show');
}

function fntImprimirListaCurso(Gestion)
{
    let idCurso = document.querySelector('#listarEstudiantes').value;
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
  
    window.open(
      url=base_url+'/Cursos/s/'+idCurso+'/'+Gestion,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
}

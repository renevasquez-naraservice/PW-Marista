document.addEventListener('DOMContentLoaded', function(){
    
    if(document.querySelector("#modalFormCobros")){
        let formMatricula = document.querySelector("#modalFormCobros");
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
                    swal("Matricula", "Matrícula registrada Satisfactoriamente" ,"success");
                    formMatricula.reset();
                return false;
            }
        
    }
    divLoading.style.display = "none";
    
    $('#modalFormMatricula').modal("hide");
}
}
}, false);

function openModal()
{
    // document.querySelector("#formMatricula").reset();
    $('#modalFormCobros').modal('show');
}

function openModalPago()
{
    // document.querySelector("#formMatricula").reset();
    $('#modalFormPagos').modal('show');
}
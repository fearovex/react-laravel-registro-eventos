$(document).ready(function() {

    incializarVariables();
    detectOperativeSystem();
    //Submit evento
    $('#submit').click(function(e){
        e.preventDefault();
        submitButton = document.getElementById('submit');
        submitButton.disabled = true;

        dataForm = getDataForm();        

        $.ajax({
            type: "POST",
            url: "../controladores/formulario_controller.php",
            dataType: "json",
            data: dataForm,
            success : function(data) {
                if (data.code == "200"){
                    window.location = '../vistas/banner.php';
                } else {
                    submitButton.disabled = false;
                    setErrorForm(data);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });
    
})

function setErrorForm(data) {

    if (data.errorNumeroDocumento != null) {
        if (data.errorNumeroDocumento) {
            setErrorNumeroDocumento(data);
        }
    }

    if (data.errorCheck != null) {
        if (data.errorCheck) {
            setErrorCheck(data);
        }
    }
}

function getDataForm() {
    arrayDatosFormulario = {};

    if (document.getElementById('numero_documento') != null) {
        arrayDatosFormulario['numero_documento'] = $("#numero_documento").val();
    }
    if (document.getElementById('lang') != null) {
        arrayDatosFormulario['lang'] = $("#lang").val();
    }
    if (document.getElementById('os') != null) {
        arrayDatosFormulario['os'] = $("#os").val();
    }
    if (document.getElementById('customSwitches') != null) {
        arrayDatosFormulario['check'] = $("#customSwitches").is(':checked');;
    }

    return arrayDatosFormulario;
}

function detectOperativeSystem() {
    // Recoleccion sistema Operativo
    var OSName="Otro";
    if (navigator.appVersion.indexOf("Win")!=-1){ OSName="Windows" }
    if (navigator.appVersion.indexOf("Mac")!=-1){ OSName="MacOS" }
    if (navigator.appVersion.indexOf("X11")!=-1){ OSName="UNIX" }
    if (navigator.appVersion.indexOf("Linux")!=-1){ OSName="Linux" }
    if (navigator.appVersion.indexOf("Android")!=-1){ OSName="Android" }
    $("#os").val(OSName);
}

function incializarVariables() {
      //Variables iniciales
     
      if (document.getElementById("errorMSGNumeroDocumento") != null) {        
        var errorVoucher = document.getElementById("errorMSGNumeroDocumento");
        errorVoucher.hidden = true;  
      } 
      if (document.getElementById("errorMSGCheck")) {
        var errorCheck= document.getElementById("errorMSGCheck");
        errorCheck.hidden = true;   
      }
}

function setErrorNumeroDocumento(data) {
    var spanErrorNumeroDocumento = document.getElementById("errorMSGNumeroDocumento");
    spanErrorNumeroDocumento.hidden = false;
    spanErrorNumeroDocumento.textContent = data.errorMSGNumeroDocumento;
    var formGroupNumeroDocumento = document.getElementById("form_group_numero_documento");
    formGroupNumeroDocumento.classList.add("input_error");
}


function setErrorCheck(data) {
    var spanErrorCheck = document.getElementById("errorMSGCheck");
    spanErrorCheck.hidden = false;
    spanErrorCheck.textContent = data.errorMSGCheck;
    var formGroupCheck = document.getElementById("form_group_check");
    formGroupCheck.classList.add("input_error");
}


function quitErrorNumeroDocumento() {
    var formGroupNumeroDocumento = document.getElementById("form_group_numero_documento");
    if (formGroupNumeroDocumento.classList.contains("input_error")) {
        formGroupNumeroDocumento.classList.remove("input_error");
        var inputNumeroDocumento = document.getElementById("numero_documento");
        inputNumeroDocumento.value = "";
        var spanErrorNumeroDocumento = document.getElementById("errorMSGNumeroDocumento");
        if(spanErrorNumeroDocumento != null) {
            spanErrorNumeroDocumento.hidden = true;
            spanErrorNumeroDocumento.textContent = "";
        }  
    }
}

function quitErrorCheck() {
    var formGroupCheck = document.getElementById("form_group_check");
    if (formGroupCheck.classList.contains("input_error")) {
        formGroupCheck.classList.remove("input_error");       
        var spanErrorCheck = document.getElementById("errorMSGCheck");
        if(spanErrorCheck != null) {
            spanErrorCheck.hidden = true;
            spanErrorCheck.textContent = "";
        }  
    }  
}

function restaurarInputNumeroDocumento() {
    quitErrorNumeroDocumento();
}

function restaurarInputCheck() {
    quitErrorCheck();
}

function dropInvalidCharactersNumDocumento() {
    var element = document.getElementById('numero_documento');
    element.value = element.value.replace(/[^0-9\s]+/, '');
}




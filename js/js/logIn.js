$(document).ready(function () {
    estadoInicial()
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
function login(){
    let email = $("#InputEmail").val()
    let password = $("#InputPassword").val()
    console.log(email);
    console.log(password);

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://localhost:8080/api/user/"+ email + "/" + password,
        type: 'GET',
        dataType: 'json',
  
        success: function (respuesta) {
            console.log(respuesta);
            resultado(respuesta)	
        },

        
        error: function (xhr, status) {	
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo super bien"  + status);
        }
    });
}

function resultado(respuesta){
    let id = respuesta.id
    let nombre= respuesta.name

    if (id==null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " "+ nombre)

}

function estadoInicial(){
    $("#InputEmail").focus()
}

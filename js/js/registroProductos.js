function saveProductos(user) {
    let data = {
        id : $("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        procesor: $("#procesor").val(),
        os: $("#os").val(),
        description: $("#descrition").val(),
        memory: $("#memory").val(),
        HardDrive: $("#HardDrive").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    }

    let datosPeticion = JSON.stringify(data)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://localhost:8080/api/laptop/new",
        
        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,

        //tipo de peticion
        type: 'POST',

        contentType: "application/JSON",

        //tipo de contenido
        dataType: 'json',

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            resultado(respuesta)	
        },

        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo fallo");	
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            console.log("Todo super bien"  + status);
        }
    });
}





function traerInformacionProductos(){
    console.log("test");
        $.ajax({
        url:"http://localhost:8080/api/laptop/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable = "<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].model+"</td>";
        myTable+="<td>"+respuesta[i].procesor+"</td>";
        myTable+="<td>"+respuesta[i].os+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].memory+"</td>";
        myTable+="<td>"+respuesta[i].HardDrive+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button onclick=' agregarProducto("+respuesta[i].idClient+")'>Agregar</button>";
        myTable+="<td> <button onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function agregarProducto(){

    Swal
    .fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
        }
    });
}

function borrarProducto(reference){
    console.log(reference);
    let myData={
        id:reference
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://localhost:8080/api/laptop/"+reference,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionProductos();
            Swal
    .fire({
        title: "Venta #123465",
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se elimina la venta*");
        } else {
            // Dijeron que no
            console.log("*NO se elimina la venta*");
        }
    });
        }
    });

}
function editarProducto(id) {
    Swal.fire({
        title: 'Custom width, padding, background.',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://res.cloudinary.com/dc04oiqvh/image/upload/v1625528813/Logo_500x500_px_1_piyfzd.gif")
          left top
          no-repeat
        `
      })
   
    $.ajax({
        dataType: 'json',
        url:"http://localhost:8080/api/laptop/"+id,
    
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
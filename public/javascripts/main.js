$(document).ready(function(){
    console.log("estoy ready");
    getJugadores();


    $('#table').on('click', '.actualizar', function(){
      var row = $(this).closest('tr');
      $('#nombre').val(row.find('.nombre').text());
      $('#apellido').val(row.find('.apellido').text());
      $('#equipo').val(row.find('.equipo').text());
      $('#edad').val(row.find('.edad').text());
      $('#id').val($(this).attr('data-id'));
    });

    $('#table').on('click', '.eliminar', function(){
      eliminarJugador($(this).attr('data-id'));
    });
    
    
    $('#guardar').click(function(){
      if($('#id').val() == ''){
        crearJugador();
      }else{
        actualizarJugador();
      }

    });
  });
  
  function getJugadores(){
    var jugadores = "";
    $.ajax({
      url: '/getUsers',
      type: 'GET',
      dataType: 'json',
      error: function(){
        console.log("Hubo error en la peticion")
      },
      success: function(response){
        response.jugador.forEach((jugador)=>{
          jugadores += `<tr>
                            <td class="nombre">${jugador.nombre}</td>
                            <td class="apellido">${jugador.apellido}</td>
                            <td class="equipo">${jugador.equipo}</td>
                            <td class="edad">${jugador.edad}</td>
                            <td><button type="button" class="actualizar" data-id="${jugador._id}">Actualizar</button>
                            <button type="button" class="eliminar" data-id="${jugador._id}">Eliminar</button></td>
                      </tr>`;
        });
        $('#t-body').html(jugadores);
      }
    });
  };


  function crearJugador(){
    $.ajax({
      url: "/create",
      type: "POST",
      dataType: "json",
      data: {nombre: $("#nombre").val() , apellido: $("#apellido").val(), equipo: $("#equipo").val(), edad: $("#edad").val()},
      error: function(){
        console.log("Hubo error en la peticion");
      },
      success: function(response){
        var jugadores = `<tr>
                      <td class="nombre">${response.jugador.nombre}</td>
                      <td class="apellido">${response.jugador.apellido}</td>
                      <td class="equipo">${response.jugador.equipo}</td>
                      <td class="edad">${response.jugador.edad}</td>
                      <td><button type="button" class= "actualizar" data-id="${response.jugador._id}">Actualizar</button>
                          <button type="button" class="eliminar" data-id="${response.jugador._id}">Eliminar</button></td>
                    </tr>`;
        $('#t-body').append(jugadores);
      },
    });
  };

  function actualizarJugador(){
    var id = $('#id').val();
    $.ajax({
      url: "/update/" + id,
      type: "PUT",
      dataType: "json",
      data: {nombre: $("#nombre").val() , apellido: $("#apellido").val(), equipo: $("#equipo").val(), edad: $("#edad").val()},
      error: function(){
        console.log("Hubo error en la peticion");
      },
      success: function(response){
        getJugadores();
        $('#id').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#edad').val('');
        $('#equipo').val('');
      },
    });
  };

  function eliminarJugador(id){
    $.ajax({
      url: "/delete/" + id,
      type: "DELETE",
      dataType: "json",
      error: function(){
        console.log("Hubo error en la peticion");
      },
      success: function(response){
        getJugadores();
      },
    });
  };
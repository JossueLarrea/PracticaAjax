$(function () {
  let variable = false;
  obtenerTareas();

  $("#task-form").submit(function (e) {
    const datos = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: $("#taskId").val(),
    };

    let url = variable === false ? "insertar.php" : "modificar.php";
    $.post(url, datos, function (response) {
      console.log(response);
      obtenerTareas();
      $("#task-form").trigger("reset");
    });
    e.preventDefault();
  });

  function obtenerTareas() {
    $.ajax({
      url: "listar.php",
      type: "GET",
      success: function (response) {
        const tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `
                      <tr taskId="${task.id}">
                      <td>${task.id}</td>
                      <td>
                      <a href="#" class="task-item">
                        ${task.name} 
                      </a>
                      </td>
                      <td>${task.description}</td>
                      <td>
                        <button class="task-delete btn btn-danger">
                         Eliminar
                        </button>
                      </td>
                      </tr>
                    `;
        });
        $("#tasks").html(template);
      },
    });
  }
  $(document).on("click", ".task-item", (e) => {
    const elemento = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(elemento).attr("taskId");
    console.log(id);
    $.post("getTareas.php", { id }, (response) => {
      console.log(response);
      const task = JSON.parse(response);

      $("#name").val(task.name);
      $("#description").val(task.description);
      $("#taskId").val(task.id);
      variable = true;
    });
  });
  $(document).on("click",'.task-delete', (e)=>{
    if (confirm('Desea eliminar el registro')) {
      const elemento = $(this)[0].activeElement.parentElement.parentElement;
      const id=$(elemento).attr('taskId');
      $.post('eliminar.php',{id},(response)=>{
        obtenerTareas();
      });
    }
  });
  $('#search').keyup(function(){
    if ($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url :'buscar.php',
        type : 'POST',
        data : {search},
        success : function(response){
          let tasks = JSON.parse(response);
          let template = '';
          tasks.forEach(task=>{
            template+=` <td>
            <a href="#" class="task-item">
              ${task.name} 
            </a>
            </td>
            <td>${task.description}</td>
            <td>
              <button class="task-delete btn btn-danger">
               Eliminar
              </button>
            </td>
            </tr>`;
          });
          $('#container').html(template);
        }
      });
    }
  });
});

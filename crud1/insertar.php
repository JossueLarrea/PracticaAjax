<?php
include("database.php");

if (isset($_POST["name"])) {
    $name = $_POST["name"];
    $description = $_POST["description"];
    $query = "INSERT INTO task(name, description) VALUES ('$name', '$description')";
    $result = mysqli_query($conexion, $query);
    if (!$result) {
        die("La consulta de Insertar ha fallado");
    }
    echo "Tarea agregada con exito";
}

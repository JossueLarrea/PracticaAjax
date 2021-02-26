<?php
include('database.php');
if (isset($_POST['search'])) {
    $search = $_POST['search'];
    $query = "SELECT * FROM TASK WHERE name like '$search%'";
    $resultado = mysqli_query($conexion, $query);

    $json = array();
    while ($row = mysqli_fetch_array($resultado)) {
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

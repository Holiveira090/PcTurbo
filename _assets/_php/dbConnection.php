<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pcturbo_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados.");
    }
?>

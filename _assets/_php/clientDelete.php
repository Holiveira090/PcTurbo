<?php
    include('dbConnection.php');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $id = $_GET['id'];

        $sql = "DELETE FROM clientes WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('error' => $conn->error));
        }
    } else {
        echo json_encode(array('error' => 'Invalid request method'));
    }

    $conn->close();
?>

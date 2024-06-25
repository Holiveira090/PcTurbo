<?php
    include 'dbConnection.php';

    $id = $_GET['id'];

    $sql = "DELETE FROM produtos WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('error' => 'Erro ao excluir o produto: ' . $conn->error));
    }

    $conn->close();
?>

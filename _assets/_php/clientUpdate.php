<?php
include('dbConnection.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = $_GET['id'];
        $data = json_decode(file_get_contents("php://input"));

        $nomeCliente = $data->nomeCliente;
        $emailCliente = $data->emailCliente;
        $celularCliente = $data->celularCliente;
        $cidadeCliente = $data->cidadeCliente;

        $sql = "UPDATE clientes SET name='$nomeCliente', email='$emailCliente', number='$celularCliente', city='$cidadeCliente' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('error' => 'Erro na execução do SQL: ' . $conn->error));
        }
    } else {
        echo json_encode(array('error' => 'Invalid request method'));
    }

    $conn->close();

?>

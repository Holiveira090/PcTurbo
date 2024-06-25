<?php
    include('dbConnection.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nomeCliente = $_POST['nomeCliente'];
        $emailCliente = $_POST['emailCliente'];
        $celularCliente = $_POST['celularCliente'];
        $cidadeCliente = $_POST['cidadeCliente'];

        $sql = "INSERT INTO clientes (name, email, number, city) VALUES ('$nomeCliente', '$emailCliente', '$celularCliente', '$cidadeCliente')";

        if ($conn->query($sql) === TRUE) {
            $last_id = $conn->insert_id;

            $newClient = array(
                'id' => $last_id,
                'nome' => $nomeCliente,
                'email' => $emailCliente,
                'celular' => $celularCliente,
                'cidade' => $cidadeCliente
            );

            echo json_encode($newClient);
        } else {
            echo json_encode(array('error' => $conn->error));
        }
    } else {
        echo json_encode(array('error' => 'Invalid request method'));
    }

    $conn->close();
?>

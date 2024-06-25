<?php
    include('dbConnection.php');

    $sql = "SELECT * FROM clientes";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $clientes = array();
        while ($row = $result->fetch_assoc()) {
            $clientes[] = array(
                'id' => $row['id'],
                'nome' => $row['name'],
                'email' => $row['email'],
                'celular' => $row['number'],
                'cidade' => $row['city']
            );
        }
        echo json_encode($clientes);
    } else {
        echo json_encode(array('error' => 'Nenhum cliente encontrado.'));
    }

    $conn->close();
?>

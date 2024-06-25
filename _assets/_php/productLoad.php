<?php
    include 'dbConnection.php';

    $sql = "SELECT * FROM produtos";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $products = array();

        while ($row = $result->fetch_assoc()) {
            $products[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description'],
                'stock' => $row['stock'],
                'source' => $row['source'],
                'image' => $row['image']
            );
        }

        echo json_encode($products);
    } else {
        echo json_encode(array('error' => 'Nenhum produto encontrado.'));
    }

    $conn->close();
?>

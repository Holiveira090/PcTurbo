<?php
    include 'dbConnection.php';

    $nomeProduto = $_POST['nomeProduto'];
    $descricaoProduto = $_POST['descricaoProduto'];
    $estoqueProduto = $_POST['estoqueProduto'];
    $localProduto = $_POST['localProduto'];
    $urlProduto = $_POST['urlProduto'];

    $sql = "INSERT INTO produtos (name, description, stock, source, image) VALUES ('$nomeProduto', '$descricaoProduto', '$estoqueProduto', '$localProduto', '$urlProduto')";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $newProduct = array('id' => $last_id, 'name' => $nomeProduto, 'description' => $descricaoProduto, 'stock' => $estoqueProduto, 'source' => $localProduto, 'image' => $urlProduto);
        echo json_encode($newProduct);
    } else {
        echo json_encode(array('error' => 'Erro ao registrar o produto: ' . $conn->error));
    }

    $conn->close();
?>

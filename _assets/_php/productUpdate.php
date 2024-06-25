<?php
include 'dbConnection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_GET['id'];
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if (
        isset($data["nomeProduto"]) &&
        isset($data["descricaoProduto"]) &&
        isset($data["estoqueProduto"]) &&
        isset($data["localProduto"]) &&
        isset($data["urlProduto"])
    ) {
        $sql = "UPDATE produtos SET name = '$data[nomeProduto]', description = '$data[descricaoProduto]', stock = '$data[estoqueProduto]', source = '$data[localProduto]', image = '$data[urlProduto]' WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('error' => 'Erro ao atualizar o produto: ' . $conn->error));
        }
    } else {
        echo json_encode(array('error' => 'Dados necessários ausentes'));
    }
} else {
    echo json_encode(array('error' => 'Método de requisição inválido'));
}

$conn->close();
?>

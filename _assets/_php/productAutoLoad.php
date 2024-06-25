<?php
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "pcturbo_db";

$conexao = mysqli_connect($host, $usuario, $senha, $banco);

if (!$conexao) {
    die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
}

$query = "SELECT * FROM produtos";
$resultado = mysqli_query($conexao, $query);

if ($resultado) {
    $produtos = array();

    while ($row = mysqli_fetch_assoc($resultado)) {
        $produtos[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $produtos]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conexao)]);
}

mysqli_close($conexao);
?>

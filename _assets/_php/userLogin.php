<?php
    require_once 'dbConnection.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $email = $_POST["email"];
        $password = $_POST["password"];

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email=?");
        $stmt->bind_param("s", $email);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                header("Location: ../_content/homePage.html");
                exit();
            } else {
                echo "Credenciais inválidas. Tente novamente.";
            }
        } else {
            echo "Credenciais inválidas. Tente novamente.";
        }

        $stmt->close();
    }
?>
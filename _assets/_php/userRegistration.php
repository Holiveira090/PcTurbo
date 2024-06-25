<?php
    require_once 'dbConnection.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $stmt = $conn->prepare("INSERT INTO usuarios (firstname, lastname, email, number, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstname, $lastname, $email, $number, $hashed_password);

        $firstname = mysqli_real_escape_string($conn, $_POST["firstname"]);
        $lastname = mysqli_real_escape_string($conn, $_POST["lastname"]);
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $number = mysqli_real_escape_string($conn, $_POST["number"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        $confirmpassword = mysqli_real_escape_string($conn, $_POST["confirmpassword"]);
        
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt->execute();
        $stmt->close();

        if ($conn->error) {
            echo "Erro ao cadastrar o usuário: " . $conn->error;
        } else {
            header("Location: ../_content/loginPage.html");
            exit();
        }
    }

    $conn->close();
?>

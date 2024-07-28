<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $feedbackType = htmlspecialchars($_POST['feedback_type']);
    $comments = htmlspecialchars($_POST['comments']);
} else {
    echo "Wrong request, please correct request.";
}
?>
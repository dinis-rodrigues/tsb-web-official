<?php
// require_once('php\recaptchalib.php');
require '../api/phpmailer/PHPMailerAutoload.php';
require '../api/phpmailer/PHPMailerAutoload.php';
include "../protected/emailVariables.php";
include "../protected/captcha_variables.php";


$res = ["success" => false, "msg" => ""];
if ($_POST) {
    $mailer = new PHPMailer(true);
    $mailer->CharSet = 'UTF-8';
    $mailer->isSMTP();
    $mailer->Host = $emailHost;
    $mailer->SMTPSecure = $emailSMTP;
    $mailer->Port = $emailPort;
    $mailer->SMTPAuth = true;
    $mailer->Username = 'tecnico.solarboat@gmail.com';
    $mailer->Password = $emailPassword;
    $emailer->From = "tecnico.solarboat@gmail.com";


    $errors = array();
    $errors["success"] = false;



    if (isset($_POST['recaptcha'])) {
        $captcha = $_POST['recaptcha'];
    }

    if (!$captcha) {
        $errors['recaptcha'] = 'Please enter the reCaptcha';
    } else {
        $secretKey = $captcha_contact_key;

        $ip = $_SERVER['REMOTE_ADDR'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretKey . "&response=" . $captcha . "&remoteip=" . $ip);
        $responseKeys = json_decode($response, true);
        if ($responseKeys->success = false) {
            $errors['recaptcha'] = 'Please verify the reCaptcha';
            $res["msg"] = $errors['recaptcha'];
            $res["captcha"] = $errors['recaptcha'];
            echo json_encode($res);
            die();
        }
    }
    // Check if name has been entered
    if (!isset($_POST['name'])) {
        $errors['name'] = 'Please introduce your name.';
    }

    // Check if email has been entered and is valid
    if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please introduce your email.';
    }

    //Check if message has been entered
    if (!isset($_POST['message'])) {
        $errors['message'] = 'Please introduce a message.';
    }

    if ($errors["name"] || $errors["email"] || $errors["message"] || $errors['recaptcha']) {
        if (!empty($errors)) {
            $errorOutput = '';
            foreach ($errors as $key => $value) {
                $errorOutput .= $value . ' ';
            }
            $res["msg"] = $errorOutput;
            $res["success"] = false;
            echo json_encode($res);
            die();
        }
        die();
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = $email;
    $to = 'tecnico.solarboat@gmail.com';  // please change this email id
    $subject = 'Website Contact Form';
    $subject .= " -> ";
    $subject .= $name;
    $body = "From: $name <br> E-Mail: $email <br> <br> Menssage:<br> $message";
    $headers = "From: " . $from;

    $mailer->addAddress('tecnico.solarboat@gmail.com');
    $mailer->Subject = $subject;
    $mailer->Body = $body;
    $mailer->IsHTML(true);

    //send the email
    $result = '';
    if ($mailer->send()) {
        $candidate = $from;
        $corpo = "Thank you for reaching us! <br> <br> We have received your message and we will get back to you as soon as possible. <br> <br> Best Regards, <br> Técnico Solar Boat";

        $mailer->ClearAllRecipients();
        $mailer->addAddress($candidate);
        $mailer->Subject = 'Técnico Solar Boat - Submissão Efectuada';
        $mailer->Body = $corpo;
        $mailer->IsHTML(true);
        if ($mailer->send()) {
            $res["msg"] = "Submission success!";
            $res["success"] = true;
            echo json_encode($res);
            die();
        }
    }
    $res["msg"] = "The service seems to be down, please try again later.";
    echo json_encode($res);
    die();
}

$res["msg"] = "Only POST requests allowed";
echo json_encode($res);
die();

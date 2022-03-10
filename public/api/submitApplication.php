<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
include "../protected/mysqlVariables.php";
include "../protected/emailVariables.php";
include "../protected/captcha_variables.php";

function console_log($output, $with_script_tags = true)
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

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

    if (isset($_POST['recaptcha'])) {
        $captcha = $_POST['recaptcha'];
    }

    if (!$captcha) {
        $errors['recaptcha'] = 'Please enter the reCaptcha';
    } else {
        $secretKey = $captcha_recruit_key;

        $ip = $_SERVER['REMOTE_ADDR'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretKey . "&response=" . $captcha . "&remoteip=" . $ip);
        $responseKeys = json_decode($response, true);
        if ($responseKeys->success = false) {
            $res["msg"] = "I don't like spammers.";
            $res["success"] = false;
            echo json_encode($res["msg"] . " Your IP: " . $ip . " " . $responseKeys["success"]);
            die();
        }
    }
    // Check if fields have been entered
    if (!isset($_POST['activeTable'])) {
        $errors['activeTable'] = 'Recruitment is not open';
    }
    if (!isset($_POST['name'])) {
        $errors['name'] = 'Introduce your name';
    }
    if (!isset($_POST['degree'])) {
        $errors['degree'] = 'Introduce your degree';
    }
    if (!isset($_POST['curricularYear'])) {
        $errors['curricularYear'] = 'Introduce your curricular year';
    }
    if (!isset($_POST['country'])) {
        $errors['country'] = 'Introduce your country';
    }
    if (!isset($_POST['departments'])) {
        $errors['departments'] = 'Introduce at least one department';
    }
    if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Introduce a valid email';
    }

    $errorOutput = '';

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

    $activeTable = $_POST['activeTable'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $year = $_POST['curricularYear'];
    $degree = $_POST['degree'];
    $phoneNumber = $_POST['phoneNumber'];
    $socialLink = $_POST['socialLink'];

    // For SQL database
    // Create connection
    // $conn = new mysqli($sqlServername, $sqlUsername, $sqlPassword, $sqlDbname);
    // $activeTable_sql = utf8_encode(mysqli_real_escape_string($conn, $activeTable));
    // $name_sql = utf8_encode(mysqli_real_escape_string($conn, $name));
    // $email_sql = utf8_encode(mysqli_real_escape_string($conn, $email));
    // $message_sql = utf8_encode(mysqli_real_escape_string($conn, $message));
    // $year_sql = utf8_encode(mysqli_real_escape_string($conn, $year));
    // $degree_sql = utf8_encode(mysqli_real_escape_string($conn, $degree));
    // $phoneNumber_sql = utf8_encode(mysqli_real_escape_string($conn, $phoneNumber));
    // $socialLink_sql = utf8_encode(mysqli_real_escape_string($conn, $socialLink));

    $from = $email;
    $to = 'tecnico.solarboat@gmail.com';  // please change this email id
    $subject = 'Recrutamento ';

    $departmentsArray = json_decode($_POST['departments']);

    foreach ($departmentsArray as $dep) {
        $subject .= strtoupper($dep) . " ";
    }


    $subject .= " -> ";
    $subject .= $name;
    $body = "Name: $name <br><br>Degree: $degree <br><br>Year: $year <br><br>E-Mail: $email <br><br>Phone: $phoneNumber <br><br>Social: $socialLink <br><br> Motivation:<br> $message";
    $headers = "From: " . $from;

    $mailer->addAddress('tecnico.solarboat@gmail.com');
    $mailer->Subject = $subject;
    $mailer->Body = $body;
    $mailer->IsHTML(true);

    // echo $result .= "<script>senUserToDb('$name','$departments','$email','$phoneNumber','$socialLink','$degree','$year','$message')</script>";
    //send the email
    $result = '';
    try {
        $mailer->send();
        $candidate = $from;
        $corpo = file_get_contents('./RecruitmentEmailTemplate/applicationSubmittedFile.html');

        $mailer->ClearAllRecipients();
        $mailer->addAddress($candidate);
        $mailer->Subject = 'Técnico Solar Boat - Application Received';
        $mailer->Body = $corpo;
        $mailer->IsHTML(true);
        if ($mailer->send()) {
            // $datet = date('m/d/Y h:i:s a', time());
            // $sql = "INSERT INTO $activeTable (Name, Country, Email, Areas, Degree, Year, PhoneNumber, Social, Message, timedata)
            // 	VALUES ('$name', '$country', '$email', '$subject', '$degree', '$year', '$phoneNumber', '$socialLink', '$message', '$datet')";

            // // Check if it was sent to the database
            // if (mysqli_query($conn, $sql) === TRUE) {
            $res["msg"] = "Submission success!";
            $res["success"] = true;
            // } else {
            //     $res["msg"] = "There was a internal problem submitting the application. Please try again later. If this problem persists, please contact us.";
            //     $res["success"] = false;
            // }
            echo json_encode($res);
            die();
        } else {
            // echo("Error description: " . $conn -> error);
            $res["msg"] = "There was a problem submitting the application. We could not reach your email. Please try again later or contact us directly at tecnico.solarboat@gmail.com";
            $res["success"] = false;
            echo json_encode($res);
            die();
        }
    } catch (Exception $e) {
        // console_log($mailer->ErrorInfo);
        $res["msg"] = "There was a problem submitting the application, dunno. Please try again later or contact us directly at tecnico.solarboat@gmail.com";
        $res["success"] = false;
        echo json_encode($res);
        die();
    }
    echo $result;
} else {
    $res["msg"] = "Please fill all the fields";
    $res["success"] = false;
    echo json_encode($res);
}

<?php

header('Access-Control-Allow-Origin: *');

define('KB', 1024);
define('MB', 1048576);
define('GB', 1073741824);
define('TB', 1099511627776);

define('AI', 'application/postscript');
define('PDF', 'application/pdf');
define('JPEG', 'application/jpeg');
define('PNG', 'image/png');

$res = ["error" => false, "msg" => ""];

include 'firebaseAuth.php';
$userId = $_POST['userId'];
$auth = new FirebaseAuth();
$auth->isUserAllowed($userId);

if (!$auth->isUserAllowed($userId)) {
    $res["msg"] = "User not authenticated. Denied";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

if (!$_FILES["fileToUpload"] || !isset($_POST['sponsorId']) || !isset($_POST['fileToDelete']) || !isset($_POST['allowedLogoType'])) {
    $res["msg"] = "No files present.";
    $res["error"] = true;
    echo json_encode($res);
    exit();
}


// Checking file size
if ($_FILES["fileToUpload"]["size"] > 50 * MB) {
    $res["msg"] = "File too big.";
    $res["error"] = true;
    echo json_encode($res);
    exit();
}
if ($_POST['allowedLogoType'] == "svgPath") {
    if ($_FILES["fileToUpload"]["type"] != "image/svg+xml") {
        $res["msg"] = "Wrong file type.";
        $res["error"] = true;
        echo json_encode($res);
        exit();
    }
} else {
    $filetType = $_FILES["fileToUpload"]["type"];
    if ($filetType != AI && $filetType != PDF && $filetType != JPEG && $filetType != PNG) {
        $res["msg"] = "Wrong file type. " . $filetType . $filetType != AI;
        $res["error"] = true;
        echo json_encode($res);
        exit();
    }
}


$sponsorId = $_POST['sponsorId'];

// File to create
$target_dir = "../public/sponsorFiles/" . $sponsorId . "/";
$file = $_FILES['fileToUpload']['name'];
$path = pathinfo($file);
$filename = $path['filename'];
$ext = $path['extension'];
$temp_name = $_FILES['fileToUpload']['tmp_name'];
$path_filename_ext = $target_dir . $filename . "." . $ext;

// Delete Old file
$fileToDelete = $_POST['fileToDelete'];
$filePathToDelete = $target_dir . basename($fileToDelete);

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if (move_uploaded_file($temp_name, $path_filename_ext)) {
    if ($filePathToDelete && $filePathToDelete != $path_filename_ext) {
        unlink($filePathToDelete);
    }
    $res["msg"] = "https://tecnicosolarboat.tecnico.ulisboa.pt/public/" . $path_filename_ext;
    $res["error"] = false;
    echo json_encode($res);
} else {
    $res["msg"] = "Error while uploading file";
    $res["error"] = true;
    echo json_encode($res);
}

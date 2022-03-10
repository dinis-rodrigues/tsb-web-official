<?php

header('Access-Control-Allow-Origin: *');
include 'firebaseAuth.php';

define('KB', 1024);
define('MB', 1048576);
define('GB', 1073741824);
define('TB', 1099511627776);

define('AI', 'application/postscript');
define('PDF', 'application/pdf');
define('JPEG', 'image/jpeg');
define('JPG', 'image/jpg');
define('PNG', 'image/png');

function createResizedImage($image, $filename, $rzDir)
{
    $filename = $filename;
    $image = imagecreatefromstring(file_get_contents($image));
    if (!file_exists($rzDir)) {
        mkdir($rzDir, 0777, true);
    }

    $thumb_width = 640;
    $thumb_height = 360;

    $width = imagesx($image);
    $height = imagesy($image);

    $original_aspect = $width / $height;
    $thumb_aspect = $thumb_width / $thumb_height;

    if ($original_aspect >= $thumb_aspect) {
        // If image is wider than thumbnail (in aspect ratio sense)
        $new_height = $thumb_height;
        $new_width = $width / ($height / $thumb_height);
    } else {
        // If the thumbnail is wider than the image
        $new_width = $thumb_width;
        $new_height = $height / ($width / $thumb_width);
    }

    $thumb = imagecreatetruecolor($thumb_width, $thumb_height);

    // Resize and crop
    imagecopyresampled(
        $thumb,
        $image,
        0 - ($new_width - $thumb_width) / 2, // Center the image horizontally
        0 - ($new_height - $thumb_height) / 2, // Center the image vertically
        0,
        0,
        $new_width,
        $new_height,
        $width,
        $height
    );
    return imagejpeg($thumb, $rzDir . $filename, 80);
}


$userId = $_POST['userId'];
$auth = new FirebaseAuth();
$auth->isUserAllowed($userId);

if (!$auth->isUserAllowed($userId)) {
    $res["msg"] = "User not authenticated. Denied";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}


$res = ["success" => false, "msg" => ""];
if (!$_FILES["fileToUpload"] || !isset($_POST['galleryId'])) {
    $res["msg"] = "No files present.";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

$fileToUpload = $_FILES['fileToUpload'];
$galleryId = $_POST['galleryId'];

if (!$fileToUpload['tmp_name']) {
    $res["msg"] = "Internal error while uploading to server";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

// Check file type
$filetType = mime_content_type($fileToUpload['tmp_name']);


if ($filetType != JPEG && $filetType != PNG && $filetType != JPG) {
    $res["msg"] = "Wrong file type. " . $_FILES['fileToUpload']['name'] . " " . $filetType;
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

// Checking file size
if ($fileToUpload["size"] > 50 * MB) {
    $res["msg"] = "File too big.";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

// File to create
$target_dir = "../public/gallery/" . $galleryId . "/";
$file = $fileToUpload['name'];

$path = pathinfo($file);
$filename = uniqid() . "." . $path['extension'];

$temp_name = $fileToUpload['tmp_name'];
$path_filename_ext = $target_dir . $filename;

// Delete Old file (if equal and if any)
unlink($path_filename_ext);


// Create dir if first upload
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}


$rzDir = $target_dir . "thumb/";

$croppedFileName = "cropped_" . $filename;
// Upload resized image
$uploadedSuccess = createResizedImage($temp_name, $croppedFileName, $rzDir);

if ($uploadedSuccess) {
    $res["rzImg"] = "https://tecnicosolarboat.tecnico.ulisboa.pt/public/" . $rzDir . $croppedFileName;
} else {
    $res["msg"] = "Error creating resized image " . $_FILES['fileToUpload']['name'] . " " . $filetType;
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

// Upload file to  directory
if (move_uploaded_file($temp_name, $path_filename_ext)) {
    $res["msg"] = "https://tecnicosolarboat.tecnico.ulisboa.pt/public/" . $path_filename_ext;
    $res["success"] = true;
    echo json_encode($res);
} else {
    $res["msg"] = "Error while uploading file " . $fileToUpload;
    $res["success"] = false;
    echo json_encode($res);
}

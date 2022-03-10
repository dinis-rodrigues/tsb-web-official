<?php

header('Access-Control-Allow-Origin: *');
include 'firebaseAuth.php';

$svgString = $_POST['svgString'];
$sponsorId = $_POST['sponsorId'];
$fileName = $_POST['fileName'];

$userId = $_POST['userId'];
$auth = new FirebaseAuth();
$auth->isUserAllowed($userId);

if (!$auth->isUserAllowed($userId)) {
    $res["msg"] = "User not authenticated. Denied";
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

$fileName = urlencode($fileName);
$dir = "../public/sponsorFiles/" . urlencode($sponsorId);
if (isset($svgString)) {
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
        $filePath = $dir . '/' . $fileName;
        if (file_put_contents($filePath, json_decode($svgString))) {
            echo "https://tecnicosolarboat.tecnico.ulisboa.pt/public/" . $filePath;
        }
    } else {
        $filePath = $dir . '/' . $fileName;
        if (file_put_contents($filePath, json_decode($svgString))) {
            echo "https://tecnicosolarboat.tecnico.ulisboa.pt/public/" . $filePath;
        }
    }
} else {
    echo false;
}

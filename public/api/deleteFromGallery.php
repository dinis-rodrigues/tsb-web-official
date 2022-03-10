<?php

header('Access-Control-Allow-Origin: *');

$res = ["success" => false, "msg" => ""];

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

if (isset($_POST['galleryId']) && isset($_POST['deleteGallery']) && isset($_POST['imgId'])) {
    // example  "gallery/{galleryId}" or "gallery/{galleryId}/{photoID}"
    $galleryId = $_POST['galleryId'];
    $deleteGallery = $_POST['deleteGallery'];
    $imgId = $_POST['imgId'];
} else {
    errorMsg("Missing parameters");
}

if ($deleteGallery == "TRUE") {
    if ($galleryId) {
        $target_dir = "../public/gallery/" . $galleryId . "/";
        recursiveRemoveDirectory($target_dir);
        successMsg();
    } else {
        errorMsg("Gallery id missing");
    }
} else {
    if ($galleryId && $imgId) {
        // Delete image
        $target_dir = "../public/gallery/" . $galleryId . "/" . $imgId . ".*";

        // Retrieves the image, independently of the extension to delete
        foreach (glob($target_dir) as $pToDelete) {
            // echo json_encode(["success" => false, "msg" => $pToDelete]);
            $imgDel = unlink($pToDelete);
        }

        // Delete thumb
        $thumb_target_dir = "../public/gallery/" . $galleryId . '/thumb/cropped_' . $imgId . ".*";
        // Retrieves the image, independently of the extension to delete
        foreach (glob($thumb_target_dir) as $fToDelete) {
            $thumbDel = unlink($fToDelete);
        }


        if (!$imgDel && $thumbDel) {
            errorMsg("Primary image not deleted properly " . $target_dir . " " . $pToDelete);
        } elseif ($imgDel && !$thumbDel) {
            errorMsg("Thumb image not deleted properly " . $thumb_target_dir . " " . $fToDelete);
        } elseif (!$imgDel && !$thumbDel) {
            errorMsg("All images werent deleted " . $target_dir . " " . $pToDelete . " " . $thumb_target_dir . " " . $fToDelete);
        } else {
            successMsg();
        }
    } else {
        errorMsg("Missing gallery id or imgid");
    }
}

function recursiveRemoveDirectory($directory)
{
    foreach (glob("{$directory}/*") as $file) {
        if (is_dir($file)) {
            recursiveRemoveDirectory($file);
        } else {
            $succ = unlink($file);
            if (!$succ) {
                errorMsg("Error deleting file");
            }
        }
    }
    rmdir($directory);
}
errorMsg("something went wrong");
function errorMsg($msg)
{
    $res["msg"] = $msg;
    $res["success"] = false;
    echo json_encode($res);
    exit();
}

function successMsg()
{
    $res["msg"] = "Image deleted.";
    $res["success"] = true;
    echo json_encode($res);
    exit();
}

<?php

header('Access-Control-Allow-Origin: *');

$svgPath = $_POST['svgPath'];

if(isset($svgPath)){
    $svgString = file_get_contents($svgPath);
    echo json_encode($svgString);
}
 else {
    echo false;
}

// echo json_encode($svgString);
// Check that imageid exists.
// if(isset($params->imageid) == true) {
//     // Do code that needs $params->imageid;
// } else {
//     // Fail gracefully.
// }
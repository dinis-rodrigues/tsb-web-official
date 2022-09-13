<?php

// This code no longer doES anything, DEPECRECATED TO REMOVE IN THE FUTURE

include 'firebaseAuth.php';
$res = ["success" => false, "msg" => ""];

if ($_POST) {

	$userId = $_POST['userId'];
	$auth = new FirebaseAuth();
	$auth->isUserAllowed($userId);

	if (!$auth->isUserAllowed($userId)) {
		$res["msg"] = "User not authenticated. Denied";
		$res["success"] = false;
		echo json_encode($res);
		exit();
	}

	if (!isset($_POST['activeTable'])) {
		$res["msg"] = "Missing name of the table. Contact the admin";
		$res["success"] = false;
		echo json_encode($res);
	} else {
		$activeTable = $_POST['activeTable'];
	}

	try {
		// $conn = new mysqli($sqlServername, $sqlUsername, $sqlPassword, $sqlDbname);
		// $sql = "CREATE TABLE $activeTable LIKE DO_NOT_DELETE_Recruta_Template";

		// Check if it was sent to the database
		// console_log($conn->query($sql));
		if (TRUE) {
			$res["msg"] = "Table created successfully!";
			$res["success"] = true;
		} else {
			$res["msg"] = "Error";
			$res["success"] = false;
		}
		echo json_encode($res);
		die();
	} catch (Exception $e) {
		$res["msg"] = "Some error occured. Contact the admin.";
		$res["success"] = false;
		echo json_encode($res);
		die();
	}
	echo $result;
} else {
	$res["msg"] = "Missing name of the table. Contat the admin";
	$res["success"] = false;
	echo json_encode($res);
}

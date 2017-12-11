<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if (!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'ParkSearch');

$username = mysqli_real_escape_string($con, $_POST['username']);
$password = mysqli_real_escape_string($con, $_POST['password']);
$email = mysqli_real_escape_string($con, $_POST['email']);
$address = mysqli_real_escape_string($con, $_POST['address']);

$query = "SELECT * FROM USERS WHERE username='$username';";

$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
	$response['status'] = 'username_exists';
} else {

	$query = "SELECT * FROM USERS WHERE email='$email';";

	$result = mysqli_query($con, $query);

	if (mysqli_num_rows($result) > 0) {
		$response['status'] = 'email_exists';
	} else {
		$query = "INSERT INTO USERS ( username, password, email, address) VALUES ( '$username', '$password', '$email', '$address' );";

		$result = mysqli_query($con, $query);

		if ($result) {
			$response['status'] = 'signedup';
		} else {
			$response['status'] = 'error';
		}
	}
}

echo json_encode($response);

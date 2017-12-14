<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if (!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'parksearch');

$username = mysqli_real_escape_string($con, $_POST['username']);
$park_id = mysqli_real_escape_string($con, $_POST['park_id']);
$review = mysqli_real_escape_string($con, $_POST['review']);



		$query = "INSERT INTO REVIEWS (username, park_id, review) VALUES ( '$username', '$park_id', '$review');";

		$result = mysqli_query($con, $query);

		if ($result) {
			$response['status'] = 'entered';
		} else {
			$response['status'] = 'error';
		}
		

echo json_encode($response);

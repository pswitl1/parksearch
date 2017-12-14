<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");

$con = mysqli_connect('localhost', 'root', '', 'ParkSearch');

$result = $con->query("SELECT * FROM REVIEWS");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"username":"'  . $rs["username"] . '",';
    $outp .= '"park_id":"'  . $rs["park_id"] . '",';
     $outp .= '"review":"'  . $rs["review"] . '"}';
}

$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");

$con = mysqli_connect('localhost', 'root', '', 'ParkSearch');

$result = $con->query("SELECT * FROM FEATURES");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"feature":"'  . $rs["feature"] . '",';
    $outp .= '"park_id":"'  . $rs["park_id"] . '"}';
}

$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);

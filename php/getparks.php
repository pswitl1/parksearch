<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");

$con = mysqli_connect('localhost', 'root', '', 'ParkSearch');

$result = $con->query("SELECT * FROM PARKS");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"]        . '",';
    $outp .= '"website_link":"'   .$rs["website_link"]. '",';
    $outp .= '"description":"'   . $rs["description"]        . '",';
    $outp .= '"address":"'   . $rs["address"]        . '",';
    $outp .= '"phone":"'   . $rs["phone"]        . '",';
    $outp .= '"hours":"'   . $rs["hours"]        . '",';
    $outp .= '"photo_link":"'. $rs["photo_link"]     . '"}';
}

$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);

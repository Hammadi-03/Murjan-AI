<?php
$mysqli = new mysqli("127.0.0.1", "root", "", "murjan_ai");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$result = $mysqli->query("SHOW TABLES LIKE 'api_keys'");
if ($result->num_rows > 0) {
    echo "Table api_keys exists\n";
} else {
    echo "Table api_keys does not exist\n";
}
$mysqli->close();

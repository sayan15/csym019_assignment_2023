<?php
ob_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require 'pdo.php';


?>

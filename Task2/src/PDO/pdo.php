<?php
//
$host = 'db';
$user_name = 'root';
$pass = 'csym019';
$schema= 'Internet_programming';

global $pdo;
try {
 $pdo = new PDO("mysql:host=$host; dbname=$schema;", $user_name, $pass);
     $created = date("Y:m:d h:i:s");
     // foreach ($createTables as $createTable) {
     //       $success = $GLOBALS['pdo']->prepare($createTable);
     //       $success->execute();
     // }
} catch (PDOException $e) {
  echo "Error!: " . $e->getMessage() . "<br/>";
 //echo "Ooooops something bad happened";
}


$current_file  = $_SERVER['SCRIPT_NAME'];
$http_referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : "";

  ///QUERY MADE EASY
   function Query($query){
       $stmt = $GLOBALS['pdo']->prepare($query);
       $stmt->execute();
       return $stmt;
  }

  //select all record from table
  function fetchAllRecords($table)
  {
    $stmt = $GLOBALS['pdo']->prepare('SELECT * FROM ' . $table );
    $stmt->execute();
    return $stmt;
  }

  ?>
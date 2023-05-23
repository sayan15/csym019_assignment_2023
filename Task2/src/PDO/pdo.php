<?php
//
$host = 'db';
$user_name = 'root';
$pass = 'csym019';
$schema= 'Courses';

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

  // insert new record into database and handle ajax request
 function insert($table, $record)
 {
       $keys = array_keys($record);
       $values = implode(', ', $keys);
       $valuesWithColon = implode(', :', $keys);
       $query = 'INSERT INTO ' . $table . ' (' . $values . ') VALUES (:' . $valuesWithColon . ')';
       $insert_stmt = $GLOBALS['pdo']->prepare($query);
       $insert_stmt->execute($record);
       return $insert_stmt;
 
 }

  //insert and get the id
function insertAndgetId($table, $record)
{
      $keys = array_keys($record);
      $values = implode(', ', $keys);
      $valuesWithColon = implode(', :', $keys);
      $query = 'INSERT INTO ' . $table . ' (' . $values . ') VALUES (:' . $valuesWithColon . ')';
      
      $insert_stmt = $GLOBALS['pdo']->prepare($query);
      $insert_stmt->execute($record);
      
      $last_insert_id = $GLOBALS['pdo']->lastInsertId();
     return $last_insert_id;

}

//fetch course record from database with where
function fetchARecordWithOneWhereClause($table, $field, $value)
{
  $stmt = $GLOBALS['pdo']->prepare('SELECT * FROM ' . $table . ' WHERE ' . $field . ' = :value');
  $criteria = [
  'value' => $value
  ];
  $stmt->execute($criteria);
  return $stmt;
}



//insert with where condition
 function insertWhere($table, $field, $value, $record)
{

      $keys = array_keys($record);
      $values = implode(', ', $keys);
      $valuesWithColon = implode(', :', $keys);
      $query = 'INSERT INTO ' . $table . ' (' . $values . ') VALUES (:' . $valuesWithColon . ') WHERE '.$field.' = '.$value.' ';
      $insert_stmt = $GLOBALS['pdo']->prepare($query);
      $insert_stmt->execute($record);
      return $insert_stmt;

}

//delete course record from database and handle ajax request
function deleteRecord($table, $field, $value)
      {
      
        $stmt = $GLOBALS['pdo']->prepare('DELETE FROM ' . $table . ' WHERE ' . $field . ' = :value');
        $criteria = [
        'value' => $value
        ];
        $stmt->execute($criteria);
        return $stmt;
      
}

  ?>
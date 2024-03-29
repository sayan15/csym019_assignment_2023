<?php
//
$host = 'db';
$user_name = 'root';
$pass = 'csym019';
$schema= 'Courses';

global $pdo;
try {
 $pdo = new PDO("mysql:host=$host; dbname=$schema;", $user_name, $pass);//create new pdo object
} catch (PDOException $e) {
  echo "Error!: " . $e->getMessage() . "<br/>";
 //echo "Ooooops something bad happened";
}


$current_file  = $_SERVER['SCRIPT_NAME'];
$http_referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : "";


  //select all record from table
  function fetchAllRecords($table)
  {
    $stmt = $GLOBALS['pdo']->prepare('SELECT * FROM ' . $table );
    $stmt->execute();
    return $stmt;
  }

  // insert new record into database
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
  $resultAll = $stmt->fetchAll();
  return $resultAll;
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

//fetech all records
function fetchAllRecordsWithFetchAll($table)
{
 $stmt = $GLOBALS['pdo']->prepare('SELECT * FROM ' . $table );
 $stmt->execute();
 $resultAll = $stmt->fetchAll();
 return $resultAll;
}

//hash the password
function hashPass($pass){
  return password_hash($pass, PASSWORD_DEFAULT);
}

//verify the password with hash password
function passwordVerify($inputPass,$hashPass){
  return password_verify($inputPass,$hashPass);
}

//update table value with where clause
function update ($table, $data, $id, $whereClause)
{
    $setPart = array();
    $bindings = array();

    foreach ($data as $key => $value)
    {
        $setPart[] = "{$key} = '{$value}'";
    }


    $sql = "UPDATE {$table} SET ".implode(', ', $setPart)." WHERE $whereClause = $id ";
    $stmt = $GLOBALS['pdo']->prepare($sql);

    $stmt->execute($bindings);
    return $stmt;
}


  ?>
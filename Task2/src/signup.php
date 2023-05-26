<?php

    require_once './PDO/functions.php';
    $response = array();

        if(isset($_GET['username']) && !empty($_GET['username']) && !empty($_GET['password'])){
            $username=$_GET['username'];
            echo($username);
            $result=fetchARecordWithOneWhereClause("Users_tbl","username",$username);
            if($result){
                    $response['error'] = true;
                    $response['message'] = "user already exist";
            }
            else{
                $data = [
                    "username" => $_GET['username'],
                    "password" => hashPass($_GET['password']),
                    ];
                    $result = insert("Users_tbl", $data);
                    if($result){
                        $response['error'] = false;
                        $response['message'] = true;
                    }
                    else{
                        $response['error'] = false;
                        $response['message'] = false;
                    }
            }
        }else{
            $response['error'] = true;
            $response['message'] = 'Required Parameters are missing';
        }
    
    echo(json_encode($response));

?>






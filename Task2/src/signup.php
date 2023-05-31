<?php

    require_once './PDO/functions.php';//require functions.php to process further
    $response = array();// store the response values
        //check username and password value has been set
        if(isset($_GET['username']) && !empty($_GET['username']) && !empty($_GET['password'])){
            $username=$_GET['username'];//get username
            echo($username);
            $result=fetchARecordWithOneWhereClause("Users_tbl","username",$username);//get the values if the username already exist
            if($result){//if its already exist
                    $response['error'] = true;
                    $response['message'] = "user already exist";//throw error message
            }
            else{//if user not exist already assign values
                //assign values to data array 
                $data = [
                    "username" => $_GET['username'],
                    "password" => hashPass($_GET['password']),
                    ];
                    $result = insert("Users_tbl", $data);//call insert function to insert the user details
                    if($result){//if its success 
                        $response['error'] = false;//error is false
                        $response['message'] = true;//message is false
                    }
                    else{
                        $response['error'] = false;//error is false
                        $response['message'] = false;//message is false
                    }
            }
        }else{
            $response['error'] = true;//error is true
            $response['message'] = 'Required Parameters are missing';//set the message required parameter is missing
        }
    
    echo(json_encode($response));

?>






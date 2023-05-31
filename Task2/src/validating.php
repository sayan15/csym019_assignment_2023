<?php
if(isset($_POST['btn'])){//if login btn is pressed
            // Set the content type to JSON
    header('Content-Type: application/json');

    require_once './PDO/functions.php';//require functions.php to connect with db
    $response = array();

    if(isset($_GET['op'])){//check op has been set
    if(isset($_POST['username'])){//check username has been set
        if(isset($_POST['password'])){//check password has been set
            $username=$_POST['username'];
            $password=$_POST['password'];
            $result=fetchARecordWithOneWhereClause("Users_tbl","username",$username);//get the details related to username from the Users_tbl
            
            if($result){//if response is success
                $response['error'] = false;//make the error as false
                
                if(count(json_decode(json_encode($result)))==1){//and check wehther its only returns one record
                    //json encode will convert array to json string the decode the results to PHP associative array 
                    $decodedVal=json_decode(json_encode($result),true);
                    if(passwordVerify($password,$decodedVal[0]['password'])){//verfiy the user inputed password and hashed password
                        $response['verified'] = true;//set verified as true
                        $response['user_id']=$decodedVal[0]['user_id'];//get user id
                        $response['username']=$decodedVal[0]['username'];//get username
                        
                    }else
                    {
                        $response['verified'] = false;//set verified as false
                        
                    }                 
                }
                else{
                    $response['verified'] = false;//set verified as false
                    
                }
                
            }
            else{
                $response['error'] = true;
                $response['message'] = 'Unable to load data?data='.$response;//set error message if unable to load data from db
                
            }
        }
    }
    else{
        $response['error']=true;
        $response['message']="Required Parameters are missing";//set error message if required parameters are missing username and password
        

    }

        }else{

        $response['error']=true;
            $response['message']="Required Parameters are missing";//set error message if required parameters are op
            
        }

}
                // Send the response back to the client

                if($response['verified']===true){//if the username and password is verfied
                        session_start();//start session
                        $_SESSION['userData'] = $response;//store the userdata
                        header('Location: courseSelectionform.php');//navigate to courseSelectionform.php page
                        exit;
                    }
                    else{
                        session_start();//start the session
                        $_SESSION['error'] = $response;//store error response
                        header('Location: login.php');//navigate to login.php page
                        exit;
                    }

?>
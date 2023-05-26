<?php
if(isset($_POST['btn'])){
        // Set the content type to JSON
header('Content-Type: application/json');

require_once './PDO/functions.php';
$response = array();

if(isset($_GET['op'])){
   if(isset($_POST['username'])){
       if(isset($_POST['password'])){
           $username=$_POST['username'];
           $password=$_POST['password'];
           $result=fetchARecordWithOneWhereClause("Users_tbl","username",$username);
           
           if($result){
               $response['error'] = false;
               
               if(count(json_decode(json_encode($result)))==1){
                $decodedVal=json_decode(json_encode($result),true);
                   if(passwordVerify($password,$decodedVal[0]['password'])){
                       $response['verified'] = true;
                       $response['user_id']=$decodedVal[0]['user_id'];
                       $response['username']=$decodedVal[0]['username'];
                       
                   }else
                   {
                       $response['verified'] = false;
                       
                   }                 
               }
               else{
                   $response['verified'] = false;
                   
               }
             
           }
           else{
               $response['error'] = true;
             $response['message'] = 'Unable to load data?data='.$response;
             
           }
       }
   }
   else{
       $response['error']=true;
       $response['message']="Required Parameters are missing";
     

   }

    }else{

    $response['error']=true;
        $response['message']="Required Parameters are missing";
        
    }

}
                // Send the response back to the client

                if($response['verified']===true){
                    session_start();
                    $_SESSION['userData'] = $response;
                    header('Location: courseSelectionform.php');
                    exit;
                    }
                    else{
                    session_start();
                    $_SESSION['error'] = $response;
                    header('Location: login.php');
                    exit;
                    }

?>
<?php
// Set the content type to JSON
header('Content-Type: application/json');

require_once './PDO/functions.php';
$response = array();

if(isset($_POST['btn'])) {
    $btnValue = $_POST['btn'];

    if($btnValue==="Add Course"){
        addNewCourse();
    }
}

//function to add new course
function addNewCourse(){
    $data = [
        "title" => $_POST['title'],
        "overview"=>$_POST['overview'],	
        "higlights"	=>$_POST['heighlights'],	
        "details"	=>$_POST['course_details'],	    		
        "fees_UK"=>$_POST['uk'],	
        "fees_international"=>$_POST['international']

      ];
      //check whether with same name course exist or not
    $result=fetchARecordWithOneWhereClause("course_tbl","title",$_POST['title']);
    if($result)
    {
        $row=$result->fetch(PDO::FETCH_ASSOC);
    }
    else{
        $row=0;
    }
    
      if($row>0){
        //navigate to newCourse.php
        session_start();
        $_SESSION['error'] = "course already exist ".$_POST['title'];
        header('Location: newCourse.php');
        exit;
      }
      else{
        //process insertion
        echo($data["title"]);
        $courseId=insertAndgetId("course_tbl",$data);
        
        echo($courseId);
        if($courseId>0){
            // process modules
            $modules = $_POST['module'];
            $credits = $_POST['credit'];
            // Loop through the arrays to access the values
            for ($i = 0; $i <count($modules); $i++) {
                $module = $modules[$i];
                $credit =  $credits[$i];
                $data = [
                    "course_id"=>$courseId,
                    "module" => $module,
                    "credit"=>$credit        
                ];
                $moduleResult=insert("modules_tbl",$data);
                if($moduleResult!=true){
                    //delete course details
                    deleteRecord("course_tbl","id",$courseId);
                    //navigate to newCourse.php
                    session_start();
                    $_SESSION['error'] = "unable to insert modules";
                    header('Location: newCourse.php');
                    exit;
                }
            }

            // process requirements
            $requirements = $_POST['requirement'];

            // Loop through the arrays to access the values
            for ($i = 0; $i <count($requirements); $i++) {
                $requirement = $requirements[$i];
                
                $data = [
                    "course_id"=>$courseId,
                    "requirements" => $requirement                  
                ];
                $requirementResult=insert("entry_req_tbl",$data);
                if($requirementResult!=true){
                    //delete course details
                    deleteRecord("course_tbl","id",$courseId);
                    //navigate to newCourse.php
                    session_start();
                    $_SESSION['error'] = "unable to insert entry requirements";
                    header('Location: newCourse.php');
                    exit;
                }
            }

            // navigate with success message
            session_start();
            $_SESSION['success'] = true;
            header('Location: newCourse.php');
            exit;
        }
        else{
            // navigate with success message
            session_start();
            $_SESSION['success'] = false;
            header('Location: newCourse.php');
            exit;
        }

      }

}

//select which function to execute
if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'allCourses':
            allCourses();
            
            break;
        case 'getModules':
            $courseid = $_POST['courseid'];
            getModules($courseid);
            break;
        case 'deletCourse':
            $courseid = $_POST['courseid'];
            deletCourse($courseid);
            break;
        }
        
}

//get all course details
function allCourses(){
    //get course details
    $result=fetchAllRecordsWithFetchAll("course_tbl");
    $jsonResult = json_encode($result);


   echo $jsonResult;
}

//get modules
function getModules($courseId){
    $result=fetchARecordWithOneWhereClause("modules_tbl","course_id",$courseId);
    $jsonResult = json_encode($result);


   echo $jsonResult;
}

//delete Course
function deleteCourse($courseId){
    $result=deleteRecord("course_tbl","id",$courseId);
    return $result;
}
?>
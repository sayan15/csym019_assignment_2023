<?php
// Set the content type to JSON
header('Content-Type: application/json');
//rquire functions.php
require_once './PDO/functions.php';
$response = array();
//if submit button is clicked
if(isset($_POST['btn'])) {
    $btnValue = $_POST['btn'];//get the value

    if($btnValue==="Add Course"){//if the value of button is Add Course
        addNewCourse();//call addNewCourse function
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
        "fees_international"=>$_POST['international'],
        "type"=> $_POST['level']

      ];
      //check whether with same name course exist or not
    $result=fetchARecordWithOneWhereClause("course_tbl","title",$_POST['title']);
    
      if($result){//if course already exist
        //navigate to newCourse.php
        session_start();
        $_SESSION['error'] = "course already exist ".$_POST['title'];//set error message
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
                //if modules not added successfully delete the inserted course
                if($moduleResult!=true){
                    //delete course details
                    deleteRecord("course_tbl","id",$courseId);
                    //navigate to newCourse.php
                    session_start();
                    $_SESSION['error'] = "unable to insert modules";//set error message
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
                //if requirement not added successfully delete the inserted course
                if($requirementResult!=true){
                    //delete course details
                    deleteRecord("course_tbl","id",$courseId);
                    //navigate to newCourse.php
                    session_start();
                    $_SESSION['error'] = "unable to insert entry requirements";//set error message
                    header('Location: newCourse.php');
                    exit;
                }
            }

            // process faqs
            $questions = $_POST['question'];
            $answers = $_POST['answer'];
            // Loop through the arrays to access the values
            for ($i = 0; $i <count($questions); $i++) {
                $question = $questions[$i];
                $answer =  $answers[$i];
                $data = [
                    "course_id"=>$courseId,
                    "question" => $question,
                    "answer"=>$answer        
                ];
                $faqResult=insert("faq_tbl",$data);
                if($faqResult!=true){
                    //delete course details
                    deleteRecord("course_tbl","id",$courseId);
                    //navigate to newCourse.php
                    session_start();
                    $_SESSION['error'] = "unable to insert modules";
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

//select which function to execute based on action
if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'allCourses'://if its all courses call allCourses function
            allCourses();
            
            break;
        case 'getModules'://if its get modules call getModules function with courseid parameter
            $courseid = $_POST['courseid'];
            getModules($courseid);
            break;
        case 'getRequirements':
            $courseid = $_POST['courseid'];//if its get requirements call getRequirements function with courseid parameter
            getRequirements($courseid);
            break;
        case 'deletCourse':
            $courseid = $_POST['courseid'];//if its deleteCourse call getModules function with courseid parameter
            deletCourse($courseid);
            break;
        }
        
}

//get all course details
function allCourses(){
    //get all course details from the table course_tbl
    $result=fetchAllRecordsWithFetchAll("course_tbl");
    $jsonResult = json_encode($result);//encode is as json string


   echo $jsonResult;
}

//get modules
function getModules($courseId){
    //get the modules from the modules_tbl where course_id = $courseId
    $result=fetchARecordWithOneWhereClause("modules_tbl","course_id",$courseId);
    $jsonResult = json_encode($result);//encode is as json string


   echo $jsonResult;
}

//get requirements
function getRequirements($courseId){
    //get the requirements from the entry_req_tbl where course_id = $courseId
    $result=fetchARecordWithOneWhereClause("entry_req_tbl","course_id",$courseId);
    $jsonResult = json_encode($result);//encode is as json string


   echo $jsonResult;
}

//delete Course
function deleteCourse($courseId){
    //delete the course record from the course_tbl where course_id = $courseId
    $result=deleteRecord("course_tbl","id",$courseId);//encode is as json string
    return $result;
}
?>
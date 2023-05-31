<?php
    session_start();//start the session
    if(isset( $_SESSION['userData'])){//user data has been set load the page
                        
            //load the page
    }
    else{
            header('Location: login.php');//else navigate to login page
            exit;
    }

    if(isset($_POST['report_btn'])) {//check if the generate report buttton has been clicked
        $btnValue = $_POST['report_btn'];//get the value

        if($btnValue==="Create Report"){//if it is generate report buttton
            // process selected courses
            $checkboxs = $_POST['checkbox'];//get the selected values 
            $courseIds=array();//create array variable
             // Loop through the arrays to access the values
             for ($i = 0; $i <count($checkboxs); $i++) {
                $courseIds[$i]=$checkboxs[$i];//assign values to the variable
             }

        }
    }else if(isset($_POST['course_delete'])){//check if the delete buttton has been clicked
        $btnValue = $_POST['course_delete'];//get the value
        require_once './mainFunctions.php';//require mainFuncions.php to get methods
        session_start();
        try{
            
            deleteCourse($btnValue);//call deleteCourse function to delete the course
            $_SESSION['deletesuccess'] = true;//set as true if its success
        }catch (ExceptionType1 $e) {
            $_SESSION['deletesuccess'] = false;//set as false if its unsuccess
        }
        
        //navigate to courseSelectionform.php
        header('Location: courseSelectionform.php');
        exit;
    }
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Report</title>
        <link rel="stylesheet" href="report.css" />
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
		integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="report.js" defer></script>
        <script>
            //store the selected course id's in courseIds variable in js script to process in js file
            var courseIds = <?php echo json_encode($courseIds); ?>;

        </script>
	</head>
	<body>
        <main id="main_container">
            <div class="table-container">
                <table id="course_Tbl">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Overview</th>
                                <th>Higlights</th>
                                <th>Details</th>
                                <th>Fees Uk</th>
                                <th>Fees International</th>
                            </tr>
                        </thead>
                    <tbody id="courseDetailsBody">


                    </tbody>
                </table>
            </div>

        </main>
        
	</body>
    
    
</html>
<?php
    session_start();//start the session
    if(isset($_SESSION['userData'])){//user data has been set load the page
                    
        //load the page
    }
    else{//else navigate to login page
        header('Location: login.php');
        exit;
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Course List</title>
        <link rel="stylesheet" href="layout.css">
        <link rel="stylesheet" href="courseSelection.css">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
		integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

	    <script src='courseSelection.js' defer></script>
    </head>
    <body>
        <header>
            <h3>CSYM019 - UNIVERSITY COURSES</h3>
        </header>
        <nav>
            <ul>
                <li><a href="./courseSelectionForm.php">Course Report</a></li>
                <li><a href="./newCourse.php">New Course</a></li>
            </ul>
        </nav>
        <main>
            <h3>Course Selection Form</h3>
            
                <form action="report.php" method="post" class="addmore" target="_blank">
                    <div class="table-container">
                            <table id="course_Tbl">
                                <thead>
                                    <tr>
                                        <th style="display: flex; align-items: center; width:200px;">
                                            <input type="checkbox" id="selectAll" onclick="selectUnselctCheckboxes()" style="margin-right: 5px;">
                                            <label for="selectAll">Select All</label>
                                        </th>
                                        <th>Title</th>
                                        <th>Level</th>
                                        <th>Overview</th>
                                        <th>Location</th>
                                        <th>Month</th>
                                        <th>Fees Uk</th>
                                        <th>Fees International</th>
                                        <th>Entry Requirements</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                        <!-- Add more columns as needed -->
                                    </tr>
                                </thead>
                                <tbody id="courseDetailsBody">


                                </tbody>
                            </table>
                    </div>
                    <div class="inner_btn"> 
                        <input type="submit" value="Create Report" class="newCourseBtns" name="report_btn"/>
                    </div>
                           
                </form>
                <div id="popup-container">
                    <div id="details">
                        <input type="text" id="courseTitle" placeholder="title" required></input>
                        <textarea id="overview" name="overview" rows="4" cols="30" required></textarea>
                        <input type="text" id="level" placeholder="level" required></input>
                        <input type="text" id="month" placeholder="month" required></input>
                        <input type="text" id="location" placeholder="location" required></input>
                        <input type="text" id="UK" placeholder="uk fee" required></input>
                        <input type="text" id="International" placeholder="internatinal fee" required></input>
                    </div>
                    <div class="pop_up_btn_container">    
                        <button class="edit" id="submit-button">Submit</button>
                        <button class="edit" id="close-button">Close</button>  
                    </div> 
                </div>
        </main>
        <footer>&copy; CSYM019 2023</footer>

    </body>
</html>

<?php
    if (isset($_SESSION['deletesuccess'])) {
        $Message = $_SESSION['deletesuccess'];
        if($Message){
            echo "<script>alert('Course deleted successfully');</script>";
        }
        else{
            echo "<script>alert('Unable to delete the course at the moment');</script>";
        }
        
        unset($_SESSION['deletesuccess']); // Clear the session variable after displaying the alert
    }
?>


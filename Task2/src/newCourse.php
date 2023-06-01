<?php
    session_start();
    if(isset( $_SESSION['userData'])){
                        
            //load the page
    }
    else{
            header('Location: login.php');
            exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        include 'mainFunctions.php'; // include the PHP file that processes the form
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Course Report</title>
        <link rel="stylesheet" href="layout.css">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
		integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

	    <script src='newCourse.js' defer></script>
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
            <h3 id="new_course_h3">New Course Entry Form</h3>
            <form method="post" action="./mainFunctions.php">   
                <div class="addmore">
                    <div class="inner_Blocks">
                        <label for="title">Title:</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="inner_Blocks">
                        <label for="overview">overview:</label>
                        <textarea id="overview" name="overview" rows="4" cols="30" required></textarea>
                    </div>
                    <div class="inner_Blocks">
                        <label for="level">Level:</label>
                        <label>
                            <input type="radio" name="level" value="Undergraduate" id="rd_btn_1" checked>
                            Undergraduate
                        </label>
                        <label>
                            <input type="radio" name="level" value="Postgraduate" id="rd_btn_2">
                            Postgraduate
                        </label>
                    </div>
                    <div class="inner_Blocks">
                        <label for="level">Location:</label>
                        <label>
                            <input type="radio" name="location" value="Waterside" id="location_rd_btn_1" checked>
                            Waterside
                        </label>
                        <label>
                            <input type="radio" name="location" value="online" id="location_rd_btn_2">
                            online
                        </label>
                    </div>
                    <div class="inner_Blocks">
                        <label for="selectMonth">Starting Month:</label>
                        <select id="selectMonth" name="selectMonth">
                            <option value="January">January</option>
                            <option value="April">April</option>
                            <option value="Septemper">Septemper</option>
                        </select>
                    </div>
                    <div class="inner_Blocks_col">
                        <label>Course Contents:</label><br>
                        <div id="modulesContainer">
                            <div class="inner_Blocks_content">
                                <label for="module">- Modules:</label><br>
                                <input type="text" id="module" name="module[]" required placeholder="module">
                                <input type="number" id="credit" name="credit[]" required placeholder="credit">
                                <button type="button" onclick="addModules()" >Add Module</button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="inner_Blocks_col">    
                        
                        <label>Entry Requirements:</label><br>
                            <div id="requirementContainer">
                                <div class="inner_Blocks_content">
                                    <label for="requirement"></label><br>
                                    <textarea id="requirement" name="requirement[]" rows="4" cols="30" required></textarea>
                                    <button type="button" onclick="addRequirement()" id="addRequirementBtn">Add Requirement</button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="inner_Blocks">
                        <label>Fee and Funding:</label>
                        <div id="feesContainer">

                                <label for="uk">UK:</label><br>
                                <input type="text" id="uk" name="uk" required placeholder="UK"><br>
                                

                                <label for="international">International:</label><br>
                                <input type="text" id="international" name="international" required placeholder="international">

                        </div>
                    </div>
                    <div class="inner_Blocks_col">    
                        
                        <label>FAQs:</label><br>
                            <div id="faqContainer">
                                <div class="inner_Blocks_content">
                                    <label></label><br>
                                    <input type="text" id="question" name="question[]" required placeholder="question">
                                    <input type="text" id="answer" name="answer[]" required placeholder="answer">
                                    <button type="button" onclick="addFaq()" >Add FAQ</button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="inner_btn"> 
                        <input type="submit" value="Add Course" class="newCourseBtns" name="btn"/>
                    </div>
            </form>
        </main>
        <footer>&copy; CSYM019 2023</footer>
    </body>
</html>

<?php

if (isset($_SESSION['error'])) {
    $errorMessage = $_SESSION['error'];
    echo "<script>alert('$errorMessage');</script>";
    unset($_SESSION['error']); // Clear the session variable after displaying the alert
}

if (isset($_SESSION['success'])) {
    $Message = $_SESSION['success'];
    if($Message){
        echo "<script>alert('Course Registered Successfully');</script>";
    }
    else{
        echo "<script>alert('Unable to register the course at the moment');</script>";
    }
    
    unset($_SESSION['success']); // Clear the session variable after displaying the alert
}
?>
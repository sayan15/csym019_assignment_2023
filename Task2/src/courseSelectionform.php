

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
            
                <form action="report.php" method="post" class="addmore">
                    <div class="table-container">
                            <table id="course_Tbl">
                                <thead>
                                    <tr>
                                        <th>Checkbox</th>
                                        <th>Title</th>
                                        <th>Overview</th>
                                        <th>Higlights</th>
                                        <th>Details</th>
                                        <th>Fees Uk</th>
                                        <th>Fees International</th>
                                        <th>More Details</th>
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
        </main>
        <footer>&copy; CSYM019 2023</footer>
    </body>
</html>


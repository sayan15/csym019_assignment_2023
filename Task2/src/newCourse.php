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
                <li><a href="./courseSelectionForm.html">Course Report</a></li>
                <li><a href="./newCourse.php">New Course</a></li>
            </ul>
        </nav>
        <main>
            <h3 id="new_course_h3">New Course Entry Form</h3>
            <form action="post">   
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
                        <label for="heighlights">Heighlights:</label>
                        <textarea id="heighlights" name="heighlights" rows="4" cols="30" required></textarea>
                    </div>
                    <div class="inner_Blocks_col">
                        <label for="course_contents">Course Contents:</label><br>
                        <div class="inner_Blocks_content">
                            <label for="course_details">- Course details:</label><br>
                            <textarea id="course_details" name="course_details" rows="4" cols="30" required></textarea>
                        </div>
                        <div id="modulesContainer">
                            <div class="inner_Blocks_content">
                                <label for="modules">- Modules:</label><br>
                                <input type="text" id="module" name="module[]" required placeholder="module">
                                <input type="number" id="credit" name="credit[]" required placeholder="credit">
                                <button type="button" onclick="addModules()" >Add Module</button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="inner_Blocks_col">    
                        
                        <label for="entry_requirements">Entry Requirements:</label><br>
                            <div id="requirementContainer">
                                <div class="inner_Blocks_content">
                                    <label for="entry_requirement"></label><br>
                                    <textarea id="requirement" name="requirement[]" rows="4" cols="30" required></textarea>
                                    <button type="button" onclick="addRequirement()" >Add Requirement</button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="inner_Blocks">
                        <label for="fee">Fee and Funding:</label>
                        <div id="feesContainer">

                                <label for="uk">UK:</label><br>
                                <input type="text" id="uk" name="uk" required placeholder="UK"><br>
                                

                                <label for="uk">International:</label><br>
                                <input type="text" id="international" name="international" required placeholder="international">

                        </div>
                    </div>
                    <div class="inner_Blocks_col">    
                        
                        <label for="faqs">FAQs:</label><br>
                            <div id="faqContainer">
                                <div class="inner_Blocks_content">
                                    <label for="faq"></label><br>
                                    <input type="text" id="question" name="question[]" required placeholder="question">
                                    <input type="text" id="question" name="answer[]" required placeholder="answer">
                                    <button type="button" onclick="addRequirement()" >Add FAQ</button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="inner_btn"> 
                        <input type="submit" value="Add Course" class="newCourseBtns"/>
                    </div>
            </form>
        </main>
        <footer>&copy; CSYM019 2023</footer>
    </body>
</html>
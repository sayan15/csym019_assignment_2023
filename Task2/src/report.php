<?php

    if(isset($_POST['report_btn'])) {
        $btnValue = $_POST['report_btn'];

        if($btnValue==="Create Report"){
            // process selected courses
            $checkboxs = $_POST['checkbox'];
            $courseIds=array();
             // Loop through the arrays to access the values
             for ($i = 0; $i <count($checkboxs); $i++) {
                $courseIds[$i]=$checkboxs[$i];
             }

        }
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
                                <th>Modules</th>
                                <th>Entry Requirements</th>
                            </tr>
                        </thead>
                    <tbody id="courseDetailsBody">


                    </tbody>
                </table>
            </div>

        </main>
        
	</body>
    
    
</html>
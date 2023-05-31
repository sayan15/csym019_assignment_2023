<?php
session_start();
session_destroy();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'validating.php'; // include the PHP file that processes the form
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='style.css'>
    <title>Courses</title>
</head>
<body>
    <div class="main">
        <label>Login</label>
        <section id="form">
            <form action="validating.php?op=1" method="POST"> 
                <div class="input_data">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"/>
                </div>
                <div class="input_data">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"/>    
                </div>
                <div>
                    <input class="Btns" type="submit" name="btn" value="Login"/>
                </div>
                <div>
                    <label for="message"><?php
                         // Receiving data
                        if(isset( $_SESSION['error'])){
                            //if there is error meessge is set echo the error message inside label
                            echo("Username or Password is not valid!");
                        }


                    ?></label>  
                </div>
            </form>
        </section>
</div>

</body>
</html>

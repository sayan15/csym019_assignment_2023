//load courses
let jsonVal;
$(document).ready(function callBackFun() {



    setTimeout(function () {
        $.ajax({
            url: 'mainFunctions.php',
            dataType: 'json',
            type: "POST",
            data: { action: 'allCourses' },
            success: function (response) {
                console.log(response);
                getDetails(response);
                callBackFun();
            },
            error: function (xhr, status, error) {
                console.log('Error:', error, " ", xhr.responseText);
            }
        });
    }, 200)


});

function getRequirements(id, callback) {
    var entryRequirement = "";
    //get requirements
    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: {
            action: 'getRequirements',
            courseid: id
        },
        success: function (requirementsResponse) {
            //check for entry requirements
            for (let x = 0; x < requirementsResponse.length; x++) {
                entryRequirement += '<li>' + requirementsResponse[x].requirements + '</li>';
            }

            // Execute the callback function with the entryRequirement as the parameter
            callback(entryRequirement);

        },
        error: function (xhr, status, error) {
            console.log('Error:', error, " ", xhr.responseText);
        }
    });

}

//distribute the reponse of json to table values
function getDetails(response) {
    var html = "";
    //make the table in ascending order
    response.sort((a, b) => a.title > b.title ? 1 : -1);
    $.each(response, function () {

        let table = document.getElementById("course_Tbl");
        var requirements = "";

        //check whether number of rows and json response are equal otherwise update it
        if (response.length != (table.rows.length) - 1) {


            document.getElementById("courseDetailsBody").innerHTML = "";
            for (let i = 0; i < response.length; i++) {

                getRequirements(response[i].id, function (entryRequirement) {
                    // Use the entryRequirement here or perform other operations
                    $('#req-' + response[i].id).html(entryRequirement)

                });
                //create table body
                html += '<tr><td><input type="checkbox" name="checkbox[]" value="' + response[i].id + '"></td>';
                html += '<td>' + response[i].title + '</td>';
                html += '<td>' + response[i].type + '</td>';
                html += '<td ><div class="table-cell">' + response[i].overview + '</div></td>';
                html += '<td >' + response[i].higlights + '</td>';
                html += '<td >' + response[i].details + '</td>';
                html += '<td >' + response[i].fees_UK + '</td>';
                html += '<td >' + response[i].fees_international + '</td>';
                html += '<td <div class="table-cell" id="req-'+ response[i].id +'"><ul>' + requirements + '</ul></td>';
                html += '<td ><button class="edit" value="' + response[i].id + '" name="course_delete">Delete</button></td></tr>';

                document.getElementById("courseDetailsBody").innerHTML = html;

            }


        }

    }
    )

};



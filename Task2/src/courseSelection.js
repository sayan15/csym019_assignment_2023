//load courses
let jsonVal;
//callBackFun function to request data from db every 200 milliseconds
$(document).ready(function () {

    //sending ajax request to mainFunctions.php to get allcourses details by assiging the actio value as allCourses
    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: { action: 'allCourses' },
        success: function (response) {
            console.log(response);//for debugging purorse
            //call getDetails function to assign values to table body
            getDetails(response);
        },
        error: function (xhr, status, error) {
            console.log('Error:', error, " ", xhr.responseText);
        }
    });
});
//get the requiremnts for specific course 
function getRequirements(id, callback) {
    var entryRequirement = "";//store the entryRequirement Value
    //sending ajax request to mainFunctions.php to get requirement details by assiging the action value as getRequirements and courseId
    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: {
            action: 'getRequirements',
            courseid: id
        },
        success: function (requirementsResponse) {
            //loop through the requirementsResponse
            for (let x = 0; x < requirementsResponse.length; x++) {
                //assign value to entryRequirement as <Li>requirement</Li>
                entryRequirement += '<li>' + requirementsResponse[x].requirements + '</li>';
            }
            //callback is used to get the entry requirement value
            callback(entryRequirement);

        },
        error: function (xhr, status, error) {
            console.log('Error:', error, " ", xhr.responseText);
        }
    });

}

//distribute the reponse of json to table values
function getDetails(response) {
    var html = "";//store the html body value
    //make the table in ascending order
    response.sort((a, b) => a.title > b.title ? 1 : -1);


    let table = document.getElementById("course_Tbl");//get course table by id
    var requirements = "";//store the requirement for the course

    //check whether number of rows and json response are equal otherwise update it
    if (response.length != (table.rows.length) - 1) {


        document.getElementById("courseDetailsBody").innerHTML = "";//get course table body by id
        for (let i = 0; i < response.length; i++) {//loop through the response
            //call getRequirements function to get requirement for the specific id
            getRequirements(response[i].id, function (entryRequirement) {
                $('#req-' + response[i].id).html(entryRequirement)//assign the valuue to the specific cell in the tabel using id

            });
            //create table body
            html += '<tr><td><input type="checkbox" name="checkbox[]" value="' + response[i].id + '"></td>';
            html += '<td><div class="table-cell-title">' + response[i].title + '</td>';
            html += '<td>' + response[i].type + '</td>';
            html += '<td ><div class="table-cell">' + response[i].overview + '</div></td>';
            html += '<td >' + response[i].location + '</td>';
            html += '<td >' + response[i].start_month + '</td>';
            html += '<td >' + response[i].fees_UK + '</td>';
            html += '<td >' + response[i].fees_international + '</td>';
            html += '<td <div class="table-cell" id="req-' + response[i].id + '"><ul>' + requirements + '</ul></td>';
            html += '<td ><button  type="button" class="edit" value="' + response[i].id + '" name="course_update" onclick="updateDetails(' + response[i].id + ')">Update</button></td>';
            html += '<td ><button class="edit" value="' + response[i].id + '" name="course_delete">Delete</button></td></tr>';

            //assign the innser htm to the course body
            document.getElementById("courseDetailsBody").innerHTML = html;

        }


    }



};

//select and unselect all check boxes
function selectUnselctCheckboxes() {
    var selectAllCheckbox = document.getElementById('selectAll');//get selct all check box is checked or unchecked
    var checkboxes = document.getElementsByName('checkbox[]');//get all check boxes available

    for (var i = 0; i < checkboxes.length; i++) {//loop through all check boxes
        checkboxes[i].checked = selectAllCheckbox.checked;//check or uncheck it based on the selectAllCheckbox value
    }
}

//update data
function updateDetails(CourseId) {

    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: {
            action: 'specificCourse',
            courseid: CourseId
        },
        success: function (Response) {
            $('#courseTitle').val(Response[0].title);//course title vale
            $('#overview').val(Response[0].overview);//overview value
            $('#level').val(Response[0].type);//level value
            $('#month').val(Response[0].start_month);//month value
            $('#location').val(Response[0].location);// location value
            $('#UK').val(Response[0].fees_UK);//uk fee valule
            $('#International').val(Response[0].fees_international);//internation fee value
            //enable the pop up
            $('#popup-container').css({
                'display': 'block',
            });

        },
        error: function (xhr, status, error) {
            console.log('Error:', error, " ", xhr.responseText);
        }
    });


    //submit btn
    $('#submit-button').click(function () {
        var title = $('#courseTitle').val();
        var overview = $('#overview').val();
        var level = $('#level').val();
        var month = $('#month').val();
        var location = $('#location').val();
        var uk = $('#UK').val()
        var in_fee = $('#International').val();
        //check all the details hjave the valid input without null value
        if (title.trim().length > 0 && overview.trim().length > 0 && level.trim().length > 0 && month.trim().length > 0 && location.trim().length > 0 && uk.trim().length > 0 && in_fee.trim().length > 0) {

            $.ajax({
                url: 'mainFunctions.php',
                type: "POST",
                data: {
                    action: 'updateCourse',
                    courseid: CourseId,
                    title: title,
                    overview: overview,
                    type: level,
                    start_month: month,
                    fees_UK: uk,
                    fees_international: in_fee
                },
                success: function (Response) {
                    if (Response) {
                        alert("Succesfully updated", 200);//alert successfull message if update wass successfull
                    }
                    else {
                        alert("Unable to update course details", 200);//alert fail message if update wass unsuccessfull
                    }
                    //disable the update container
                    $('#popup-container').css({
                        'display': 'none',
                    });
                },
                error: function (xhr, status, error) {
                    console.log('Error:', error, " ", xhr.responseText);
                }
            });

        }
        else {
            alert("Please provide valid values!")
        }
    })

    //close btn
    $('#close-button').click(function () {
        //disable the update contaimer by disabling the diaplay field
        $('#popup-container').css({
            'display': 'none',
        });
    })

}



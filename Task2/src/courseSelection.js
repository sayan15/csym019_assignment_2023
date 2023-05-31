//load courses
let jsonVal;
//callBackFun function to request data from db every 200 milliseconds
$(document).ready(function(){

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
            html += '<td>' + response[i].title + '</td>';
            html += '<td>' + response[i].type + '</td>';
            html += '<td ><div class="table-cell">' + response[i].overview + '</div></td>';
            html += '<td >' + response[i].higlights + '</td>';
            html += '<td >' + response[i].details + '</td>';
            html += '<td >' + response[i].fees_UK + '</td>';
            html += '<td >' + response[i].fees_international + '</td>';
            html += '<td <div class="table-cell" id="req-' + response[i].id + '"><ul>' + requirements + '</ul></td>';
            html += '<td ><button class="edit" value="' + response[i].id + '" name="course_delete">Delete</button></td></tr>';

            //assign the innser htm to the course body
            document.getElementById("courseDetailsBody").innerHTML = html;

        }


    }



};



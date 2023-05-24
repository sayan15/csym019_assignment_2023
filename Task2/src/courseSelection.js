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
                console.log('Error:', error," ", xhr.responseText);
            }
        });
    }, 200)


});

//distribute the reponse of json to table values
function getDetails(response) {
    var html = "";
    //make the table in ascending order
    response.sort((a, b) => a.title  > b.title ? 1:-1 );
    $.each(response, function () {

        let table = document.getElementById("course_Tbl");

        var text2 = "";
        //check whether number of rows and json response are equal otherwise update it
        if (response.length != (table.rows.length)-1) {

            document.getElementById("courseDetailsBody").innerHTML = "";
                for (let i = 0; i < response.length; i++) {
                    html += '<tr><td><input type="checkbox" name="checkbox[]" value="' + response[i].id + '"></td>';
                    html +='<td>' + response[i].title + '</td>';
                    html +='<td>' + response[i].overview + '</td>';
                    html +='<td>' + response[i].higlights + '</td>';
                    html +='<td>' + response[i].details + '</td>';
                    html +='<td>' + response[i].fees_UK + '</td>';
                    html +='<td>' + response[i].fees_international + '</td>';
                    html +='<td><button class="edit" onclick="editModule(' + response[i].id + ')">Edit</button></td>';
                    html +='<td><button class="edit" onclick="editReuirement(' + response[i].id + ')">Edit</button></td></tr>';
                }
                
             document.getElementById("courseDetailsBody").innerHTML = html;

            }

        }
        )

    };

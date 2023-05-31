

const nav_searchbar = document.querySelector('.search-bar'),
    nav_list = document.querySelector('.primary_nav_list'),
    searchicon = document.querySelector('#search_icon'),
    menu_icon = document.querySelector('#menu_item_icon'),
    menu_close_icon = document.querySelector('#menu_close_icon')
    ;

var feeType = "UK";// decide which fee type user is prefered
var pre_FeeType = "";// previously which was selected

//when serach icon click add new class call enable searcha and enable my hidden class and change my icon
searchicon.addEventListener('click', () => {
    nav_searchbar.classList.toggle("enable-Search");
    nav_list.classList.remove("enableMenu")
    if (nav_searchbar.classList.contains("enable-Search")) {
        return searchicon.classList.replace("uil-search", "uil-times")
    }
    searchicon.classList.replace("uil-times", "uil-search")
})


menu_icon.addEventListener('click', () => {
    nav_list.classList.add("enableMenu")
    nav_searchbar.classList.remove("enable-Search");
    searchicon.classList.replace("uil-times", "uil-search")

})

menu_close_icon.addEventListener('click', () => {
    nav_list.classList.remove("enableMenu")
})


//load details from json file
let jsonVal;
$(document).ready(function callBackFun() {

    setTimeout(function () {
        $.ajax({
            url: 'course.json',
            type: 'GET',
            dataType: "json",
            success: function (response) {
                jsonVal = response;
                console.log("call again");//for debugging purporse 
                getDetails(response);// calling getDetails function again
                callBackFun();// after success execution call the function agaian
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }, 200)


});

//distribute the reponse of json to table values
function getDetails(response) {
    $.each(response, function () {
        var html = "";//to store the table body
        let table = document.getElementById("course_Tbl");

        var text2 = "";// to store the course level msc or bsc
        var entryRequirement = "";
        //check whether number of rows and json response are equal otherwise update it
        if (response.courses.length != table.rows.length || feeType != pre_FeeType) {
            document.getElementById("courseDetailsBody").innerHTML = "";//get table body by id
            pre_FeeType = feeType;//assign value which used has selected previously
            for (let i = 0; i < response.courses.length; i++) {//loop through the courses
                //make it blank 
                entryRequirement = "";
                // assign course level values
                if (response.courses[i].level === "Postgraduate") {

                    text2 = "Msc"
                }
                else {

                    text2 = "Bsc"
                }
                //check for entry requirements
                for (let x = 0; x < response.courses[i].entry_requirements.length; x++) {
                    entryRequirement+='<p>- ' + response.courses[i].entry_requirements[x] + '</p>';// assign each requirements inside <p> element
                }
                /*get all details in json file assign those values to each rows
                the row has been desigined to include divs
                its include 3 divs
                one to hold the image
                second one to hold the course details and third one to hold the entry requirements*/
                html += '<tr><td><div class="row">';
                html += '<div class="course_icon"><img src="' + response.courses[i].image + '" alt="course_icon" class="icon"></div>';
                html += '<div class="details">';
                html += '<h3>' + response.courses[i].name + '</h3>';
                html += '<p>' + response.courses[i].details + '</p>';
                html += '<ul class="categories">';
                html += '<li><span class="icon_cat"><img src="assets/degree.png" alt="degree_icon" class="small_icon"><label>' + response.courses[i].level + '</label></span></li>';
                html += '<li><span class="icon_cat"><img src="assets/trophy.png" alt="trophy_icon" class="small_icon"><label>' + text2 + '</label></span></li>';
                html += '<li><span class="icon_cat"><label>' + 'Fees:- ' + '</label><label>' + response.courses[i].fees[feeType] + '</label></span></li>';//based on Feetype variable it will chnage
                html += '<li><span class="icon_cat"><label>' + 'Duration:- ' + '</label><label>' + response.courses[i].duration + '</label></span></li>';
                html += '<li><span class="icon_cat"><label>' + 'Location:- ' + '</label><label>' + response.courses[i].location.name + '</label></span></li>';
                html += '<li><span class="icon_cat"><label>' + 'Number of modules:- ' + '</label><label>' + response.courses[i].modules.length + '</label></span></li>';
                html += '</ul>';
                html += '<div class="entryRequirements">';
                html += '<h4>Entry Reuirements</h4>';
                html += entryRequirement;
                html +='</div></td></tr>'
            }
            //assign the table htm body value to the id
            document.getElementById("courseDetailsBody").innerHTML = html;
            
        }

    });
}

//function to decide which radio button user has selected
$(document).ready(function ()  {
    $("#rd_btn_1,#rd_btn_2,#rd_btn_3").change(function (e) {
        if ($("#rd_btn_1").prop("checked")) {//if radio button 1 means user selected UK
            feeType = "UK"
            console.log("UK");
        };
        if ($("#rd_btn_2").prop("checked")) {//if radio button 1 means user selected EURO
            feeType = "EURO"
            console.log("EURO");
        };
        if ($("#rd_btn_3").prop("checked")) {//if radio button 1 means user selected US
            feeType = "US";
            console.log("US");
        };
        //after user selcted the currency call getDetails function to update table body
        getDetails(jsonVal);
    })
})



//filter function
$(document).ready(function () {

    var diplayrow = false
    $("#option1,#option2").change(function (e) {
        //check for post graduate records
        if ($("#option1").prop("checked") && $("#option2").prop("checked") != true) {
            //get how many rows has been there
            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows
            rows.forEach((row) => {
                // get the value from the each row inside details div under un orderd list first child label value
                const labelval = row.querySelector('td>div.row>div.details>ul.categories>li:first-child>span.icon_cat>label');
                if (labelval.textContent === "Postgraduate") {
                    diplayrow = true;//if its Postgraduate assign displayrow value as true
                }
                else {
                    diplayrow = false;//if its not Postgraduate assign displayrow value as false
                };
                displayRow(diplayrow, row);//call displayRow function to do the display action
            })
        }

        //check for undergraduate records
        if ($("#option2").prop("checked") && $("#option1").prop("checked") != true) {
            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows
            rows.forEach((row) => {
                // get the value from the each row inside details div under un orderd list first child label value
                const labelval = row.querySelector('td>div.row>div.details>ul.categories>li:first-child>span.icon_cat>label');
                if (labelval.textContent === "Undergraduate") {
                    diplayrow = true;//if its Undergraduate assign displayrow value as true
                }
                else {
                    diplayrow = false;//if its not Undergraduate assign displayrow value as false
                };
                displayRow(diplayrow, row);//call displayRow function to do the display action
            })
        }

        //if both are selected and both are un selected display all the rows
        if (($("#option1").prop("checked") && $("#option2").prop("checked")) || ($("#option1").prop("checked") != true && $("#option2").prop("checked") != true)) {
            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows and display all
            rows.forEach((row) => {

                diplayrow = true;//assign displayrow value as true to display all the rows


                displayRow(diplayrow, row);//call displayRow function to do the display action
            })
        }


    });


})

//display row function
function displayRow(diplayrow, row) {
    //display row or not
    if (diplayrow) {
        row.style.display = "table-row"//make the row style to display
        console.log("true");
    } else {
        row.style.display = "none"//make the row style to none
        console.log("false");
    }
}



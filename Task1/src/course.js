

const nav_searchbar = document.querySelector('.search-bar'),
    nav_list = document.querySelector('.primary_nav_list'),
    searchicon = document.querySelector('#search_icon'),
    menu_icon = document.querySelector('#menu_item_icon'),
    menu_close_icon = document.querySelector('#menu_close_icon')
    ;

var feeType = "UK";
var pre_FeeType = "";

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

function getUniqueValuefromCoulmn() {
    //create dictionary variable
    var unique_val_dic = {}
    var cellValue = ""
    var allfilter = document.querySelectorAll('.table_filter')
    allfilter.forEach((filter_i) => {
        col_index = filter_i.parentElement.parentElement.getAttribute('col-index')
        //get all the rows
        const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

        rows.forEach((row) => {
            cellValue = row.querySelector("td:nth-child(" + col_index + ")").innerHTML

            if (col_index in unique_val_dic) {
                //check already have that value
                if (unique_val_dic[col_index].includes(cellValue)) {

                } else {
                    unique_val_dic[col_index].push(cellValue)
                }
            }
            else {
                unique_val_dic[col_index] = new Array(cellValue)
            }
        })

        //update option value
        var alreadyExist = false;
        unique_val_dic[col_index].forEach((i) => {
            if (filter_i.options.length >= 1) {
                //loop through the existing options
                for (let x = 0; x < filter_i.options.length; x++) {
                    console.log(filter_i.options[x].value);
                    console.log('Option value ' + i);
                    //if its same already exist don't update
                    if (filter_i.options[x].value === i) {
                        console.log('Option with value ' + i + ' exists.');
                        alreadyExist = true;
                        break;
                    }
                    else {
                        console.log('Option with value ' + i + 'not exist');
                        alreadyExist = false;

                    }

                }
                if (alreadyExist === false) {
                    filter_i.innerHTML = filter_i.innerHTML + "\n <option value=" + i + ">" + i + "</option>"
                }
            } else {
                filter_i.innerHTML = filter_i.innerHTML + "\n <option value=" + i + ">" + i + "</option>"
            }

        })
    })
}

//load details
let jsonVal;
$(document).ready(function callBackFun() {



    setTimeout(function () {
        $.ajax({
            url: 'course.json',
            type: 'GET',
            dataType: "json",
            success: function (response) {
                jsonVal = response;
                console.log("call again");
                getDetails(response);
                callBackFun();
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
        var html = "";
        let table = document.getElementById("course_Tbl");

        var text2 = "";
        var entryRequirement = "";
        //check whether number of rows and json response are equal otherwise update it
        if (response.courses.length != table.rows.length || feeType != pre_FeeType) {
            document.getElementById("courseDetailsBody").innerHTML = "";
            pre_FeeType = feeType;
            for (let i = 0; i < response.courses.length; i++) {
                //make it blank 
                entryRequirement = "";

                if (response.courses[i].level === "Postgraduate") {

                    text2 = "Msc"
                }
                else {

                    text2 = "Bsc"
                }
                //check for entry requirements
                for (let x = 0; x < response.courses[i].entry_requirements.length; x++) {
                    entryRequirement+='<p>- ' + response.courses[i].entry_requirements[x] + '</p>';
                }
                html += '<tr><td><div class="row">';
                html += '<div class="course_icon"><img src="' + response.courses[i].image + '" alt="course_icon" class="icon"></div>';
                html += '<div class="details">';
                html += '<h3>' + response.courses[i].name + '</h3>';
                html += '<p>' + response.courses[i].details + '</p>';
                html += '<ul class="categories">';
                html += '<li><span class="icon_cat"><img src="assets/degree.png" alt="degree_icon" class="small_icon"><label>' + response.courses[i].level + '</label></span></li>';
                html += '<li><span class="icon_cat"><img src="assets/trophy.png" alt="trophy_icon" class="small_icon"><label>' + text2 + '</label></span></li>';
                html += '<li><span class="icon_cat"><label>' + 'Fees:- ' + '</label><label>' + response.courses[i].fees[feeType] + '</label></span></li>';
                html += '<li><span class="icon_cat"><label>' + 'Number of modules:- ' + '</label><label>' + response.courses[i].modules.length + '</label></span></li>';
                html += '</ul>';
                html += '<div class="entryRequirements">';
                html += '<h4>Entry Reuirements</h4>';
                html += entryRequirement;
                html +='</div></td></tr>'
            }

            document.getElementById("courseDetailsBody").innerHTML = html;
            // Initial display of table rows and pagination links
        }

    });
}

//validate currencies
//get currency value
$(document).ready(function ()  {
    $("#rd_btn_1,#rd_btn_2,#rd_btn_3").change(function (e) {
        if ($("#rd_btn_1").prop("checked")) {
            feeType = "UK"
            console.log("UK");
        };
        if ($("#rd_btn_2").prop("checked")) {
            feeType = "EURO"
            console.log("EURO");
        };
        if ($("#rd_btn_3").prop("checked")) {
            feeType = "US";
            console.log("US");
        };

        getDetails(jsonVal);
    })
})



//filter function
$(document).ready(function () {

    var diplayrow = false
    $("#option1,#option2").change(function (e) {
        //check for post graduate records
        if ($("#option1").prop("checked") && $("#option2").prop("checked") != true) {

            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows
            rows.forEach((row) => {

                const labelval = row.querySelector('td>div.row>div.details>ul.categories>li:first-child>span.icon_cat>label');
                if (labelval.textContent === "Postgraduate") {
                    diplayrow = true;
                }
                else {
                    diplayrow = false;
                };
                displayRow(diplayrow, row);
            })
        }

        //check for undergraduate records
        if ($("#option2").prop("checked") && $("#option1").prop("checked") != true) {
            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows
            rows.forEach((row) => {

                const labelval = row.querySelector('td>div.row>div.details>ul.categories>li:first-child>span.icon_cat>label');
                if (labelval.textContent === "Undergraduate") {
                    diplayrow = true;
                }
                else {
                    diplayrow = false;
                };
                displayRow(diplayrow, row);
            })
        }

        //if both are selected and both are un selected
        if (($("#option1").prop("checked") && $("#option2").prop("checked")) || ($("#option1").prop("checked") != true && $("#option2").prop("checked") != true)) {
            const rows = document.querySelectorAll('#course_Tbl>tbody>tr')

            //loop through rows and display all
            rows.forEach((row) => {

                diplayrow = true;


                displayRow(diplayrow, row);
            })
        }


    });


})

//display row function
function displayRow(diplayrow, row) {
    //display row or not
    if (diplayrow) {
        row.style.display = "table-row"
        console.log("true");
    } else {
        row.style.display = "none"
        console.log("false");
    }
}



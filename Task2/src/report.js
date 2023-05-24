

//load courses
let jsonVal;
$(document).ready(function () {
    var html = "";
    var i = 0;
    let table = document.getElementById("course_Tbl");
    var barChartData = [];
    var coursetitles=[];
    document.getElementById("courseDetailsBody").innerHTML = "";
    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: { action: 'allCourses' },
        success: function (response) {
            console.log(response);

            //make the table in ascending order
            response.sort((a, b) => a.title > b.title ? 1 : -1);

            for (let i = 0; i < response.length; i++) {
                if (courseIds.includes(response[i].id)) {
                    //assign course title
                    coursetitles[i]=response[i].title;
                    html += '<td>' + response[i].title + '</td>';
                    html += '<td>' + response[i].overview + '</td>';
                    html += '<td>' + response[i].higlights + '</td>';
                    html += '<td>' + response[i].details + '</td>';
                    html += '<td>' + response[i].fees_UK + '</td>';
                    html += '<td>' + response[i].fees_international + '</td>';
                    html += '<td><button class="edit" onclick="editModule(' + response[i].id + ')">Edit</button></td>';
                    html += '<td><button class="edit" onclick="editReuirement(' + response[i].id + ')">Edit</button></td></tr>';

                    //get modules
                    $.ajax({
                        url: 'mainFunctions.php',
                        dataType: 'json',
                        type: "POST",
                        data: {
                            action: 'getModules',
                            courseid: response[i].id
                        },
                        success: function (moduleResponse) {
                            var modules = [];
                            var credits = [];
                            //loop thorugh modules
                            for (let i = 0; i < moduleResponse.length; i++) {
                                modules[i] = moduleResponse[i].module;
                                credits[i] = moduleResponse[i].credit;
                            }
                            //load pie chat
                            loadPie(response[i].title, response[i].id, modules, credits);
                            //assign values for barchart
                            var data  = {
                                label: modules,
                                data: credits,
                                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Set desired color
                                borderColor: 'rgba(0, 123, 255, 1)', 
                                borderWidth: 1
                            }

                            //selected courses and data assigened are equal then call bar chart
                            barChartData.push(data);
                            console.log(JSON.stringify(barChartData));
                            if (barChartData.length === courseIds.length) {
                                barChart(coursetitles,barChartData);
                            }
                        },
                        error: function (xhr, status, error) {
                            console.log('Error:', error, " ", xhr.responseText);
                        }
                    }
                    );
                }



            }

            document.getElementById("courseDetailsBody").innerHTML = html;




        },
        error: function (xhr, status, error) {
            console.log('Error:', error, " ", xhr.responseText);
        }
    });
}

);


//pie chart


function loadPie(title, courseId, modules, credits) {
    //get modules container
    var container = document.getElementById("main_container");
    //create div and assign class
    var div = document.createElement("div");
    div.classList.add("pie-container");
    //create Headind
    var h3 = document.createElement("h3");
    h3.textContent = title;
    div.appendChild(h3);

    //create canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", courseId);
    div.appendChild(canvas);
    container.appendChild(div);

    const ctx = document.getElementById(courseId);

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: modules,
            datasets: [{

                data: credits,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


function barChart(courses,barDataSet) {
    //get modules container
    var container = document.getElementById("main_container");
    //create div and assign class
    var div = document.createElement("div");
    div.classList.add("pie-container");
    //create Headind
    var h3 = document.createElement("h3");
    h3.textContent = "Descriptive Data";
    div.appendChild(h3);

    //create canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "barChart");
    div.appendChild(canvas);
    container.appendChild(div);

    const ctx = document.getElementById('barChart').getContext('2d');
    var myChartConfig = {
        type: 'bar',
        data: {
            labels: courses,
            /* The two datasets are given below as twi items in an array of json objects, i.e. [{}, {}]*/
            datasets: barDataSet
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    const myChart = new Chart(ctx, myChartConfig);
}





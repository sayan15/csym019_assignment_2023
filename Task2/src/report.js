

//load courses
let jsonVal;
$(document).ready(function () {
    var html = "";
    var i = 0;
    let table = document.getElementById("course_Tbl");
    var barChartData = [];
    var coursetitles=[];
    var ProccesedCourseCount=0;

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

                    html += '<td>' + response[i].title + '</td>';
                    html += '<td>' + response[i].overview + '</td>';
                    html += '<td>' + response[i].higlights + '</td>';
                    html += '<td>' + response[i].details + '</td>';
                    html += '<td>' + response[i].fees_UK + '</td>';
                    html += '<td>' + response[i].fees_international + '</td></tr>';

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
                            //assign course title

                            coursetitles[ProccesedCourseCount]=response[i].title;
                            //increment the processed courde count
                            ProccesedCourseCount+=1;
                            var modules = [];
                            var credits = [];
                            //loop thorugh modules
                            for (let i = 0; i < moduleResponse.length; i++) {
                                modules[i] = moduleResponse[i].module;
                                credits[i] = moduleResponse[i].credit;
                                //assign values for barchart
                                var labelExists = false;
                                var data={};
                                //loop through data object
                                for (var x = 0; x < data.length; x++) {
                                    if (data[x].label === modules[i]) {
                                        labelExists = true;
                                        data[x].data.push(parseInt(credits[i])); // Append the new value to existing data array
                                        break;
                                    }
                                }

                                //loop through narchart array 
                                if(labelExists===false){
                                    for (var y = 0; y < barChartData.length; y++) {
                                        var currentLabel = modules[i];
                                    
                                        // Check if label already exists
                                        var existingIndex = barChartData.findIndex(obj => obj.label === currentLabel);
                                    
                                        if (existingIndex !== -1) {
                                            // Append value to existing "data" array
                                            barChartData[existingIndex].data[ProccesedCourseCount-1]=parseInt(credits[i]);
                                            labelExists = true;
                                            break;
                                        }
                                    }
                                }
                                
                                //if its new label create object
                                var creditArray=[];
                                creditArray[ProccesedCourseCount-1]=parseInt(credits[i]);
                                if(labelExists===false){
                                    data  = {
                                        label: modules[i],
                                        data: creditArray,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)'
                                        ],
                                        borderWidth: 1
                                    }
                                }

                                
                                // Check if label already exists
                                 var existingIndex = barChartData.findIndex(obj => obj.label === currentLabel);
                                    
                                if (existingIndex === -1) {
                                    //push the data to barchart array
                                    barChartData.push(data);
                                }
                                
                            }
                            //load pie chat
                            loadPie(response[i].title, response[i].id, modules, credits);

                            //selected courses and data assigened are equal then call bar chart

                            console.log(JSON.stringify(barChartData));
                            if (courseIds.length===ProccesedCourseCount && courseIds.length>1) {
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

//create modules table
function formModuleTable(title,div,modules, credits) {
    //create inner container
    var div2 = document.createElement("div");
    div2.classList.add("moudule-Table");

    var html = "";
    html += '<h3>'+title+'</h3>' ;
    html += '<table><thead><tr>' ;
    html += '<th>Modules</th>';
    html += '<th>Credits</th></tr></thead>';
    html += '<tbody>' ;
        //loop thorugh modules
        for (let i = 0; i < modules.length; i++) {
            html += '<tr><td>' + modules[i] + '</td>';
            html += '<td>' + credits[i]+ '</td></tr>';
        }
    html += '</tbody>' ;
    html += '</table>' ;
    //append table
    div2.innerHTML = html
    //append pie chart
    div.appendChild(div2);
}
//pie chart
function loadPie(title, courseId, modules, credits) {
    //get modules container
    var container = document.getElementById("main_container");
    //create div and assign class
    var div = document.createElement("div");
    div.classList.add("pie-container");


    //call module table creation
    formModuleTable(title,div,modules, credits);

    //create inner container
    var div2 = document.createElement("div");
    div2.classList.add("pie-chart");

    //create canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", courseId);
    div2.appendChild(canvas);
    //append pie chart
    div.appendChild(div2);
    //div to cintainer
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
    div.classList.add("bar-container");
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Credits',
                        font: {
                          weight: 'bold'
                        }
                      }
                }
            }
        }
    };
    const myChart = new Chart(ctx, myChartConfig);
}





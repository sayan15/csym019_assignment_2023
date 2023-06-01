

//load courses
let jsonVal;
$(document).ready(function () {
    var html = "";
    var i = 0;
    let table = document.getElementById("course_Tbl");
    var barChartData = [];//store the barchart dataset
    var coursetitles=[];//store course titles to display in barchart
    var ProccesedCourseCount=0;//store the count of how many courses has been so far processed

    document.getElementById("courseDetailsBody").innerHTML = "";//make the table body empty
    //make ajax request to get all course details
    $.ajax({
        url: 'mainFunctions.php',
        dataType: 'json',
        type: "POST",
        data: { action: 'allCourses' },
        success: function (response) {
            console.log(response);

            //make the table in ascending order using title
            response.sort((a, b) => a.title > b.title ? 1 : -1);
            //loop throgh courses
            for (let i = 0; i < response.length; i++) {
                //check whether to process only the user selected courses
                if (courseIds.includes(response[i].id)) {
                    //create table body
                    html += '<td>' + response[i].title + '</td>';
                    html += '<td>' + response[i].overview + '</td>';
                    html += '<td>' + response[i].location + '</td>';
                    html += '<td>' + response[i].start_month + '</td>';
                    html += '<td>' + response[i].fees_UK + '</td>';
                    html += '<td>' + response[i].fees_international + '</td></tr>';

                    //get modules for the specific selected courses using ajax request
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
                            //increment the processed course count
                            ProccesedCourseCount+=1;
                            var modules = [];//store the modules
                            var credits = [];//stores credits for that module
                            //loop thorugh modules
                            for (let i = 0; i < moduleResponse.length; i++) {
                                modules[i] = moduleResponse[i].module;
                                credits[i] = moduleResponse[i].credit;
                                //assign values for barchartdat aset
                                var labelExists = false;
                                var data={};//object to store new module values for courses
                                //loop through data array
                                for (var x = 0; x < data.length; x++) {
                                    //if the data object have that module already
                                    if (data[x].label === modules[i]) {
                                        //make it as label already exist in the array
                                        labelExists = true;

                                        data[x].data.push(parseInt(credits[i])); // Append the new value to existing data array inside data object
                                        break;
                                    }
                                }

                                //if the module was not exist in this course previously check for other courses have that module already
                                if(labelExists===false){
                                    //loop through barchart array 
                                    for (var y = 0; y < barChartData.length; y++) {
                                        var currentLabel = modules[i];//get currently what module we are processing
                                    
                                        // Check if label already exists
                                        var existingIndex = barChartData.findIndex(obj => obj.label === currentLabel);
                                        //if already exist
                                        if (existingIndex !== -1) {
                                            // Append value to existing barChartData "data" array for the specific course using ProccesedCourseCount variable
                                            barChartData[existingIndex].data[ProccesedCourseCount-1]=parseInt(credits[i]);
                                            //make labelExists  true
                                            labelExists = true;
                                            break;
                                        }
                                    }
                                }
                                
                                //if its new label create object
                                var creditArray=[];//to store credit values for new module
                                creditArray[ProccesedCourseCount-1]=parseInt(credits[i]);//assign values based on which course we are processing now
                                if(labelExists===false){// if the module is no already exist
                                    var randomColor = getRandomColor();//get the random color
                                    //assign values to data object
                                    data  = {
                                        label: modules[i],
                                        data: creditArray,
                                        backgroundColor: [
                                            randomColor
                                        ],
                                        borderColor: [
                                            randomColor
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

                            console.log(JSON.stringify(barChartData));//for debugging purporse
                            //check all the selected courses has been processed and number of slected course should be freater than 1
                            if (courseIds.length===ProccesedCourseCount && courseIds.length>1) {
                                //call bar chart
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
            //assign table body
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
    var div2 = document.createElement("div");//create div element
    div2.classList.add("moudule-Table");//add class to div element

    var html = "";//to store html elements
    html += '<h3>'+title+'</h3>' ;
    html += '<table><thead><tr>' ;
    html += '<th>Modules</th>';
    html += '<th>Credits</th></tr></thead>';
    html += '<tbody>' ;
        //loop thorugh modules
        for (let i = 0; i < modules.length; i++) {
            html += '<tr><td>' + modules[i] + '</td>';//assign module name
            html += '<td>' + credits[i]+ '</td></tr>';//assign credit value
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
    //create Heading
    var h3 = document.createElement("h3");
    h3.textContent = "Descriptive Data";
    div.appendChild(h3);

    //create canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "barChart");//set id
    div.appendChild(canvas);//append it to div
    container.appendChild(div);//append it to main conatiner

    const ctx = document.getElementById('barChart').getContext('2d');
    var myChartConfig = {
        type: 'bar',
        data: {
            labels: courses,
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

//create random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';//store string value
    var color = '#';
    for (var i = 0; i < 6; i++) {//loop until i is less than 6
      color += letters[Math.floor(Math.random() * 16)];//create hexadecimal color value
    }
    return color;
  }




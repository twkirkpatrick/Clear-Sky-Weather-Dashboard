

https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}

$(document).ready(function(){

    var APIKey = "6c280cb21fdeb9b935ffbeed4ff11c37";
    var city = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=imperial&appid=";
    var lat = "";
    var lon = "";
    var secondURL = "https://api.openweathermap.org/data/2.5/onecall?";

    $("#search-btn").on("click", function(){
        
        if($("#citySearch").val().trim() != ''){
            runQuery(); 
        }else{
            alert("you must enter a city in the field");
        }


    }

        

        

        function runQuery(){
            

            $("#current-weather").empty();

            var search = queryURL + city + units +  APIKey;
            console.log(queryURL);

            $.ajax({
                url: search,
                method: "GET"
              }).then(function(currentData){

                     
                    

                    
                lat = currentData.coord.lat;
                lon = currentData.coord.lon;
                
                var oneCall = secondURL + "lat=" + lat + "&lon=" + lon + units + APIKey;
                console.log(secondURL);
                $.ajax({
                    url: oneCall,
                    method: "GET"
                  }).then(function(oneCallData){
                    console.log(oneCallData);
                    console.log(secondURL);

                    var cityName = $("<h2>" + currentData.name + "</h2>");

                    //button for city searched is dynamically created
                   
                    
                    var iconCode = oneCallData.current.weather[0].icon;
                    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    var iconAppend = $("<img>").attr("src", iconURL);
                    var date = moment().format("MMMM Do[,] YYYY");
                    var dateAppend = $("<h5>").text(date);
                    dateAppend.append(iconAppend);
                    var temp = oneCallData.current.temp;
                    console.log(temp);
                    var tempDisplay = $("<p>").text("Temperature: "+ temp + " °F");
                    var humid = oneCallData.current.humidity;
                    var humidDisplay = $("<p>").text("Humidity: " + humid + "%" );
                    var wind = oneCallData.current.wind_speed;
                    var windDisplay = $("<p>").text("Wind Speed: " + wind + " MPH" );
                    var uv = oneCallData.current.uvi;
                    var uvDisplay = $("<p>").text("UV Index: " + uv);

                    if (uv > 5 && uv < 8){
                        uvDisplay.css("color", "orange");
                    }

                    if (uv < 6){
                        uvDisplay.css("color", "yellow");
                    }

                    if (uv > 8){
                        uvDisplay.css("color", "red");
                    }
            
        
                    $("#current-weather").append(cityName);
                    $("#current-weather").append(dateAppend);
                    $("#current-weather").append(tempDisplay);
                    $("#current-weather").append(humidDisplay);
                    $("#current-weather").append(windDisplay);
                    $("#current-weather").append(uvDisplay);

                    populateForecast();

                }























        

        
                   
                    
                  

                  
    
                
              
        

        



    

   












































              function populateForecast(){
                //Date
                //Weather Icon
                //Temp
                //Humidity

                //forecast starts at index 1

                 
                var alteredArr = oneCallData.daily;

                console.log(alteredArr);

                alteredArr.shift();

                console.log(alteredArr);

                alteredArr.splice([5]);
                
                console.log(alteredArr);


                 


                

                for(var i = 0; i < alteredArr.length; i++){

                    var block = $("<div>");

                    block.attr("class", "col");

                    var temp = $("<p>").text(alteredArr[i].temp.day);

                    block.append(temp);

                    $("#forecastDiv .row").append(block)
                }
                
            }






















































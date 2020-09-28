$(document).ready(function () {

    var APIKey = "6c280cb21fdeb9b935ffbeed4ff11c37";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=imperial&appid=";
    var lat = "";
    var lon = "";
    var secondURL = "https://api.openweathermap.org/data/2.5/onecall?";
    var oneCall = "";
    
    //on search, current weather div empties and runQuery function fires. Value of input field passed as paramater.
    $("#search-btn").on("click", function () {

        $("#current-weather").empty();

        var city = $("#citySearch").val().trim();

        runQuery(city);

    });

    //When search history button is clicked, runQuery function is fired; Pass in text of button as parameter.

    $(document).on("click", ".cityHistory", function () {

        runQuery($(this).text())
    })


    //Using the data from oneCall API call, populate information using dynamically created HTML.
    function populateForecast(oneCallData) {
       
        var alteredArr = oneCallData.daily;

        alteredArr.shift();

        alteredArr.splice([5]);

        $(".historyRow").empty()

        for (var i = 0; i < alteredArr.length; i++) {

            var block = $("<div>");
            block.attr("class", "col");

            var icon = alteredArr[i].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            var iconAppend = $("<img>").attr("src", iconURL);
            iconAppend.addClass("forecast-img");

            var temp = $("<p>").text("Temperature: " + alteredArr[i].temp.day + " °F");

            var humidity = $("<p>").text("Humidity: " + alteredArr[i].humidity + " %");

            var timeStamp = alteredArr[i].dt;

            var date = moment(timeStamp * 1000).format("dddd");

            block.append(date + "<br>");
            block.append(iconAppend);
            block.append(temp);
            block.append(humidity);

            $("#forecastDiv .row").append(block)

        }

    };

    //This function dynamically creates list items for searched cities.
    function makeRow(str) {
        var li = $("<li>").addClass("cityHistory").text(str)
        $("#history").append(li)
    }

    //When the clear history button is clicked, the cities are removed local storage and list items disappear.

    $("#clearHistory").on("click", function(){

        localStorage.removeItem("history");

        $("#history").empty();

    });

    //This function takes in the first API call object, and uses the information to dynamically create the current weather section.
    function secondCall(currentData) {

        $.ajax({
            url: oneCall,
            method: "GET"
        }).then(function (oneCallData) {
            console.log(oneCallData);
            console.log(oneCall);

            var cityName = $("<h2>" + currentData.name + "</h2>");
            
            var iconCode = oneCallData.current.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var iconAppend = $("<img>").attr("src", iconURL);
            
            var date = moment().format("MMMM Do[,] YYYY");
            var dateAppend = $("<h5>").text(date);
            dateAppend.append(iconAppend);
            
            var temp = oneCallData.current.temp;
            var tempDisplay = $("<p>").text("Temperature: " + temp + " °F");
            
            var humid = oneCallData.current.humidity;
            var humidDisplay = $("<p>").text("Humidity: " + humid + "%");
           
            var wind = oneCallData.current.wind_speed;
            var windDisplay = $("<p>").text("Wind Speed: " + wind + " MPH");
            
            var uv = oneCallData.current.uvi;
            var uvDisplay = $("<p>" + "UV Index: " + uv + "</p>");

            //conditionals change the color of the UV index based on severity.

            if (uv > 5 && uv < 8) {
                uvDisplay.css("color", "orange");
            }

            if (uv < 6) {
                uvDisplay.css("color", "yellow");
            }

            if (uv > 8) {
                uvDisplay.css("color", "red");
            }


            $("#current-weather").append(cityName);
            $("#current-weather").append(dateAppend);
            $("#current-weather").append(tempDisplay);
            $("#current-weather").append(humidDisplay);
            $("#current-weather").append(windDisplay);
            $("#current-weather").append(uvDisplay);

            populateForecast(oneCallData);
        })

    }
    //Initial API call which grabs the latitude and longitude of the city, making it possible to execute the second call.
    function runQuery(city) {

        var search = queryURL + city + units + APIKey;
        $("#current-weather").empty();

        $.ajax({
            url: search,
            method: "GET"
        }).then(function (currentData) {

            //setting the cities to local storage and executes makeRow function.
            if (history.indexOf(city) === -1) {
                history.push(city);
                localStorage.setItem("history", JSON.stringify(history));
                makeRow(city)
            }

            lat = currentData.coord.lat;
            lon = currentData.coord.lon;
            oneCall = secondURL + "lat=" + lat + "&lon=" + lon + units + APIKey;

            secondCall(currentData);
        })
    }

    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        runQuery(history[history.length - 1]);
    }

    for (let i = 0; i < history.length; i++) {

        makeRow(history[i])

    }


});
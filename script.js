$(document).ready(function () {

    var APIKey = "6c280cb21fdeb9b935ffbeed4ff11c37";
    // var city = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=imperial&appid=";
    var lat = "";
    var lon = "";
    var secondURL = "https://api.openweathermap.org/data/2.5/onecall?";
    var oneCall = "";
    var date = "";



    $("#search-btn").on("click", function () {

        $("#current-weather").empty();

        var city = $("#citySearch").val().trim();

        runQuery(city);

    });

    $(document).on("click", ".cityHistory", function () {

        runQuery($(this).text())
    })



    function populateForecast(oneCallData) {
       
        var alteredArr = oneCallData.daily;

        alteredArr.shift();

        alteredArr.splice([5]);

        $(".historyRow").empty()

        for (var i = 0; i < alteredArr.length; i++) {

            var block = $("<div>");

            block.attr("class", "col");

            var icon = alteredArr[i].weather[0].icon;
            console.log(icon);

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

    

    function makeRow(str) {
        var li = $("<li>").addClass("cityHistory").text(str)
        $("#history").append(li)
    }

    $("#clearHistory").on("click", function(){

        localStorage.removeItem("history");

        $("#history").empty();


    });





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

    function runQuery(city) {

        var search = queryURL + city + units + APIKey;
        console.log(queryURL);
        $("#current-weather").empty();

        $.ajax({
            url: search,
            method: "GET"
        }).then(function (currentData) {


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
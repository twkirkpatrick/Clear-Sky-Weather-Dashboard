$(document).ready(function(){

    var APIKey = "6c280cb21fdeb9b935ffbeed4ff11c37";
    var city = "";
    
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="

    $("#search-btn").on("click", function(){

         city = $("#citySearch").val().trim();


        
        
        if(city != ''){
            queryURL = queryURL + city + "&units=imperial&appid=" + APIKey;
            
            $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(weatherData){
    
    
                console.log(weatherData);
                console.log(queryURL);
              })
        } else{
            alert("you must enter a city in the field");
        }

        



    })


































































































});
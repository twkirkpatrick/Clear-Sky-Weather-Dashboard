var APIKey = "6c280cb21fdeb9b935ffbeed4ff11c37";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Richmond,Virginia&units=imperial&appid=" + APIKey;  ** units=imperial converts to fahrenheit **

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        **** looking at 3 potential AJAX calls ****
            1. Current weather
            2. forecast
            3. UV index

            


         1. with this AJAX call, the forecast gives data for every 3 hours of the day.  Which data should we pull?

         

         2. separate ajax call for UV index???

         **** multiple functions for separate API calls? ****

         **** pull icons from API or font awesome? ****



         1. grab value from search bar and insert into ajax call

         2. current conditions and 5 day forecast show up in column

         3. city added to search history 

         4. for each city searched:
            ** city name
            ** date
            ** icon representing the weather
            ** temperature
            ** humidity
            ** wind speed
            **** UV INDEX (background color based on severity);

        5. When presented with 5 day forecast: 
            ** date
            ** weather icon
            ** temp
            ** humidity

        6. when city in search history is clicked on, current conditions and forecast is displayed.

        7. When i open the weather dashboard, then i am presented with the last searched city forecast.







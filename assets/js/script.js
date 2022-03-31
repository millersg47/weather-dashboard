var searchBtnEl = document.querySelector(".search-btn");
var reloadEl = document.querySelector(".navbar-content");
var inputEl = document.querySelector(".input-field");
var searchedCitiesEl = document.querySelectorAll(".searched-city");
var searchedCitiesText = [];
var placeHeading = document.querySelector(".city-name");
var dateEl = document.querySelector(".date");
var weatherApiKey = "ca2644c88ede23db704959631753520b";
var today = moment();
var currentConditions = document.querySelectorAll("city-specific");
console.log(currentConditions);


//adds current date to span
dateEl.append(today.format("(MM/DD/YYYY)"));

function searchBtnHandler(event) {
    event.preventDefault();
    //declares variable for the user's input to be used throughout function
    var userCity = inputEl.value;
    console.log(userCity);

    //replaces city name in current weather box
    placeHeading.innerHTML = userCity;

    //adds city name to buttons storing recent searches under searchbar. Need to work on this so it adds the searchedCitiesText to next available button.
    searchedCitiesText.push(userCity);
    console.log(searchedCitiesText);


    //holds the url to access the geocoding API using the city entered by user. 
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + weatherApiKey;

    fetch(geocodeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;

         //holds the url to access the open weather API using defined variables based on the lon lat data from the geocoding API
        var weatherRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude +"&lon=" + longitude +"&units=imperial&appid=" + weatherApiKey;


        return fetch(weatherRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentTemp = data.current.temp;
            var currentWind = data.current.wind_speed;
            var currentHumidity = data.current.humidity;
            var currentUv = data.current.uvi;
            var currentData = [];
            currentData.push(currentTemp, currentWind, currentHumidity, currentUv);
            console.log(currentData);

            // need to work on the weather icon var. This is not working (reading zero as undefined)
            // var currentWeatherIcon = data.weather[0].icon;
            // console.log(currentWeatherIcon);

            for (var i = 0; i < currentConditions.length; i++) {
                currentConditions[i].textContent = currentData[i].value;
            }


        });

        //prompt user to enter a new city if the first city searched returns no data
        if (!data) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No weather data found, try another city!</h3>';
            return;
        }
    });
};

searchBtnEl.addEventListener("click", searchBtnHandler);
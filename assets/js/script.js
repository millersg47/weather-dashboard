var searchBtnEl = document.querySelector(".search-btn");
var reloadEl = document.querySelector(".navbar-content");
var inputEl = document.querySelector(".input-field");
var searchedCitiesEl = document.querySelectorAll(".searched-city");
var searchedCitiesText = [];
var placeHeading = document.querySelector(".city-name");
var dateEl = document.querySelector(".date");
var weatherApiKey = "ca2644c88ede23db704959631753520b";
var today = moment();


//adds current date to the span
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


    //holds the url to access the geocoding API using the city and state or country entered by user. 
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + weatherApiKey;

    fetch(geocodeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(latitude);
        console.log(longitude);

         //holds the url to access the open weather API using globally defined variables
        var weatherRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude +"&lon=" + longitude +"&units=imperial&appid=" + weatherApiKey;


        return fetch(weatherRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentTemp = data[0].current.temp;
            var currentWind = data[0].current.wind_speed;
            var currentHumidity = data[0].current.humidity;
            var currentUv = data[0].current.uvi;
            var currentWeatherIcon = data[0].current.weather[0].icon;

        });
    });
};

searchBtnEl.addEventListener("click", searchBtnHandler);
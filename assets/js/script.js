var searchBtnEl = $(".search-btn");
var reloadEl = $(".navbar-content");
var cityInput = $(".input-field");
var searchedUl = $(".searched-cities");
var dateEl = $(".date");
var weatherApiKey = "ca2644c88ede23db704959631753520b";
var today = moment();
var userCity;
var userState;
var userCountry; 
var longitude;
var latitude;

dateEl.text(today.format("(MM/DD/YYYY)"));

function getWeatherApi() {
    //holds the url to access the open weather API using globally defined variables
    var weatherRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude +"&lon=" + longitude +"&appid=" + weatherApiKey;

    fetch(weatherRequestUrl) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i=0; i<data.length; i++) {

            }
        });
}

var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "," + userState + "," + userCountry +"&limit=1&appid=" + weatherApiKey;

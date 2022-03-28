var searchBtnEl = $(".search-btn");
var reloadEl = $(".navbar-content");
var cityInput = $(".input-field");
var searchedUl = $(".searched-cities");
var dateEl = $(".date");
var today = moment();

dateEl.text(today.format("(MM/DD/YYYY)"));

function getWeatherApi() {
    var requestUrl = 'https://api.github.com/users/octocat/repos';
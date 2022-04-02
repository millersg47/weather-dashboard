var searchBtnEl = document.querySelector(".search-btn");
var reloadEl = document.querySelector(".navbar-content");
var inputEl = document.querySelector(".input-field");
var searchedCitiesEl = document.querySelectorAll(".searched-city");
var searchHistContainer = document.querySelector(".search-history");
var searchedCitiesText = JSON.parse(localStorage.getItem("searchedCity"))||[];
var placeHeading = document.querySelector(".city-name");
var dateEl = document.querySelector(".date");
var weatherApiKey = "ca2644c88ede23db704959631753520b";
var today = moment();
var currentConditions = document.querySelectorAll(".city-specific");
var currentIconEl = document.querySelector(".current-icon");
var forecastDateEls = document.querySelectorAll(".date-forecast");
console.log(forecastDateEls);

//adds current date to span
dateEl.append(today.format("(MM/DD/YYYY)"));

function searchBtnHandler(event) {
    event.preventDefault();
    //declares variable for the user's input to be used throughout function
    var userCity = inputEl.value;
    console.log(userCity);

     //replaces city name in current weather box
     placeHeading.innerHTML = userCity;

     //adds city name to buttons storing recent searches under searchbar
     searchedCitiesText.unshift(userCity);
     console.log(searchedCitiesText);
     localStorage.setItem("searchedCity", JSON.stringify(searchedCitiesText));


    for(var i = 0; i < searchedCitiesEl.length; i++) {
        searchedCitiesEl[i].textContent = searchedCitiesText[i];
    }

     searchCity(userCity);
};

function cityBtnHandler(event) {
    event.preventDefault();
    var userCity = event.target.textContent;

    placeHeading.innerHTML = userCity;

    searchCity(userCity);
};

function pageLoad() {
    var userCity = "Seattle";
    //replaces city name in current weather box
    placeHeading.innerHTML = userCity;
    
    for(var i = 0; i < searchedCitiesEl.length; i++) {
        searchedCitiesEl[i].textContent = searchedCitiesText[i];
    }
   
    searchCity(userCity);
}

pageLoad();

function searchCity (userCity) {

        //holds the url to access the geocoding API using the city entered by user. 
        var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + weatherApiKey;


        fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //prompt user to enter a new city if the city searched returns no data
            if (!data.length) {
                console.log("No results found!");
                placeHeading.innerHTML = "No weather data found, try another city!";
                return;
            } 
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
                var currentIcon = data.current.weather[0].icon;
                var currentData = [];

                currentIconEl.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";

                currentData.push(currentTemp, currentWind, currentHumidity, currentUv);
                console.log(currentData);
    
                
                console.log(currentConditions);
                //for loop to pass the currentData values into the currentConditions array. Not working
                for (var i = 0; i < currentConditions.length; i++) {
                    currentConditions[i].innerHTML = currentData[i];
                }

                var uvStatus = document.querySelector(".uv-specific");
                if(currentUv <=2) {
                    uvStatus.style.backgroundColor = "#8EC442";
                } else if(currentUv >=8) {
                    uvStatus.style.backgroundColor = "#D2394A";
                } else {
                    uvStatus.style.backgroundColor = "#FDD835";
                }

               
                for (var i = 0; i < forecastDateEls.length; i++) {
                    var time = data.daily[i+1].dt;
                    var date = moment(time*1000);
                    console.log(date);
                    forecastDateEls[i].innerHTML = date.format("dddd");
                }   
    
                var forecastIconEl = document.querySelectorAll(".forecast-icon");
                var temp = document.querySelectorAll(".temp");
                var wind = document.querySelectorAll(".wind");
                var humidity = document.querySelectorAll(".humidity");
                for (var i = 0; i < forecastDateEls.length; i++) {
                    var forecastIconData = data.daily[i+1].weather[0].icon;
                    forecastIconEl[i].src = "http://openweathermap.org/img/wn/" + forecastIconData + "@2x.png";
                    temp[i].innerHTML = data.daily[i+1].temp.max;
                    wind[i].innerHTML = data.daily[i+1].wind_speed;
                    humidity[i].innerHTML = data.daily[i+1].humidity;
                }
    
                
    
            });
    
        });
}

searchBtnEl.addEventListener("click", searchBtnHandler);
searchHistContainer.addEventListener("click", cityBtnHandler);
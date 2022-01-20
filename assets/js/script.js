var submitBtn = $('.submitBtn')
var searchType
var tripTypeCard = $('.tripType')
var userWalk = $('#userWalk')
var userDay = $('#userDay')
var userWeekend = $('#userWeekend')
var tripSelection
var selectedTrip = userDay;

// Locally stored values
var citySearch = localStorage.getItem('citySearch', '') || [''];
var searchRadius = localStorage.getItem('searchRadius', '') || ['100'];
var minPopulation = localStorage.getItem('minPopulation', '') || ['50000'];
var cityID = localStorage.getItem('cityID', '') || [''];;

// localStorage.clear();

// Function for when the user selects the walk option
var walkSelect = userWalk.click(function() {
    searchRadius= 20;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWalk;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

})

// Function for when the user selects the Day Trip option
var daySelect = userDay.click(function() {
    searchRadius = 100;
    minPopulation = 50000;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userDay;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

    checkAndSetLocalStorage(minPopulation, 'minPopulation');
    checkAndSetLocalStorage(searchRadius, 'searchRadius');
});

// Function for when the user selects the Weekend Getaway option
var weekendSelect = userWeekend.click(function() {
    searchRadius = 400;
    minPopulation = 150000;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWeekend;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

    checkAndSetLocalStorage(minPopulation, 'minPopulation');
    checkAndSetLocalStorage(searchRadius, 'searchRadius');
});

// Get Weather data for results page
function getApi(weatherUrl, index) {
    fetch(weatherUrl)
      .then(function (response) {
        if (response.status === 200) {
          }
          return response.json();
      })
      .then(function(data){
          displayWeather(data, index);
          return data;
      })
    //   catch any errors
      .catch(function(){
      });
};

// Function to display weather data on results page
function displayWeather(data, index){
  var currentF = document.getElementsByClassName('currentF');
  var weatherDescrip = document.getElementsByClassName('weather-description');
  var weatherHiLo = document.getElementsByClassName('weather-HiLo');
  var currentTemp = data.current.temp;
  var iconCode = data.current.weather[0].icon;
  var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
  var highTemp = data.daily[0].temp.max;
  var lowTemp = data.daily[0].temp.min;
  var feelsLike = 'Feels Like:' + data.current.feels_like;
  var sunCloud = data.current.weather[0].description;
  var sunnyCloudy = sunCloud.charAt(0).toUpperCase() + sunCloud.slice(1);
  let Temp = currentTemp.toFixed(1);
  let highF = highTemp.toFixed(1);
  let lowF = lowTemp.toFixed(1);
  // add conditional statement 
  // if user selects hike or day trip, display current temp
  // else display four-day forecast
  currentF[index].textContent = Temp + '\u00B0F';
  
  // Still need to correct spacing & embed weather icon - var iconUrl - into html 
  weatherDescrip[index].textContent = sunnyCloudy + ' ';
  weatherHiLo[index].textContent = '-H: ' + highF + '\u00B0 L: ' +lowF + '\u00B0';
};

// Function to access the maps on results page and a description of the location
function locationMapImage(city, index){
  var MapImageURL = "https://google-maps-geocoding-plus.p.rapidapi.com/geocode?address=" + city + "&language=en";
  
  var maps = document.getElementsByClassName('google-maps');

  fetch(MapImageURL, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "google-maps-geocoding-plus.p.rapidapi.com",
      "x-rapidapi-key": '9255887eb5msh9ac0f92f92b85e6p171474jsn9a553aea0426'
    }
  })
  .then(response => {
    return response.json();
  })
  .then(function(data){
    console.log(data);
    // Load in city map
    var mapLink = data.response.place.place_link;
    mapLink = mapLink + '&output=embed';

    maps[index].children[0].src = mapLink;
    
    // Load in city description
    var descriptionText = document.getElementsByClassName('location-description');

    descriptionText[index].innerText = data.response.place.quick_facts[0].text;

    return data;
  })
  .catch(err => {
    console.error(err);
  });
}

// When you click the search butotn on the default screen, then the window stores that input into local storage and switches the html to the results page html
function searchCity(){
  citySearch = $('#user-location').val();

  checkAndSetLocalStorage(searchRadius, 'searchRadius');
  checkAndSetLocalStorage(minPopulation, 'minPopulation');
  
  var findCityURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&minPopulation=100000&namePrefix=" + citySearch;

  getData(findCityURL);
}

// Convert the input city into an id that can be used to find that city's data
function getData(URL){
  fetch(URL, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key":"dc52e1306fmsh499b745225e0ed7p1f9230jsnd35ba4c60dc2" //this is the key for the paid subscription
          // "x-rapidapi-key": "2ad8fcafecmsh3b2f55fa0261ecfp1301a0jsn70db2fbb2f15"
      }
      })
      .then(response => {
          return response.json();
      })
      .then(function(data){
        cityID = data.data[0].id.toString();

        // Default city is Abu Dhabi... if the program says you put in Abu Dhabi but that is not your input value then display an error
        if((data.data[0].city.toLowerCase() === 'abu ahabi') && ($('#user-location').val().toLowerCase() != 'abu dhabi')){
          console.log('Please enter your location and select your trip type')
        }
        else{
          citySearch = data.data[0].city;
  
          checkAndSetLocalStorage(citySearch, 'citySearch');
          checkAndSetLocalStorage(cityID, 'cityID');
  
          location.href='./results.html';
        }
      })
      // If the input is not a valid input or not a city within our database then turn on error catch
      .catch(err => {
        console.log('Please enter your location and select your trip type')
        console.error(err);
      });
}

function checkAndSetLocalStorage(storedValue, valueString){
  // If the local storage is an array then splice the first value and equal it to the stored value
  if(storedValue[0] === ''){
    storedValue.splice(0, 1, storedValue);
    localStorage.setItem(valueString, storedValue);
  }
  // If the local storage is a string then change the string to the stored value
  else{
    localStorage.setItem(valueString, storedValue);
  }
}
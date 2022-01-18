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
var searchRadius = localStorage.getItem('searchRadius', '') || [''];
var minPopulation = localStorage.getItem('minPopulation', '') || [''];

// Function for when the user selects the walk option
var walkSelect = userWalk.click(function() {
    searchRadius= 20;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWalk;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

})

// Function for when the user selects the Day Trip option
var daySelect = userDay.click(function() {
    searchRadius= 100;
    minPopulation = 50000;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userDay;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

    if(minPopulation[0] === ''){
      minPopulation.splice(0, 1, minPopulation);
      localStorage.setItem('minPopulation', minPopulation);
    }
    else{
      localStorage.setItem('minPopulation', minPopulation);
    }

    if(searchRadius[0] === ''){
      searchRadius.splice(0, 1, searchRadius);
      localStorage.setItem('searchRadius', searchRadius);
    }
    else{
      localStorage.setItem('searchRadius', searchRadius);
    }

    console.log(localStorage);
    searchCity();
});

// Function for when the user selects the Weekend Getaway option
var weekendSelect = userWeekend.click(function() {
    searchRadius=400;
    minPopulation = 150000;
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWeekend;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

    if(minPopulation[0] === ''){
      minPopulation.splice(0, 1, minPopulation);
      localStorage.setItem('minPopulation', minPopulation);
    }
    else{
      localStorage.setItem('minPopulation', minPopulation);
    }

    if(searchRadius[0] === ''){
      searchRadius.splice(0, 1, searchRadius);
      localStorage.setItem('searchRadius', searchRadius);
    }
    else{
      localStorage.setItem('searchRadius', searchRadius);
    }
    console.log(localStorage);
    searchCity();
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
      "x-rapidapi-key": '2ad8fcafecmsh3b2f55fa0261ecfp1301a0jsn70db2fbb2f15'
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

  if(citySearch[0] === ''){
    citySearch.splice(0, 1, citySearch);
    localStorage.setItem('citySearch', citySearch);
  }
  else{
    localStorage.setItem('citySearch', citySearch);
  }

  location.href='./results.html';

  if ((citySearch != '') && (searchRadius !== 0)){
    window.location.href='./results.html';
  }
  else{
    console.log('Please enter your location and select your trip type')
    alert("Please enter your location and choose the type of trip you'd like to go on")
  }
}
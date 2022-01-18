var submitBtn = $('.submitBtn')
var searchRadius = 0
var searchType
const userType = ['Walk', 'DayTrip', 'Weekend']
var tripTypeCard = $('.tripType')
var userWalk = $('#userWalk')
var userDay = $('#userDay')
var userWeekend = $('#userWeekend')
var tripSelection
var userZipcode
var selectedTrip = userWalk
var zipCodeStorage = window.localStorage.setItem('zipcode','')

// Function for when the user selects the walk option
var walkSelect = userWalk.click(function() {
    searchRadius= 20;
    searchType = userType[0];

    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWalk;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

})

// Function for when the user selects the Day Trip option
var daySelect = userDay.click(function() {
    searchRadius= 75;
    searchType = userType[1];

    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userDay;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

});

// Function for when the user selects the Weekend Getaway option
var weekendSelect = userWeekend.click(function() {
    searchRadius=200;
    searchType = userType[2];
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWeekend;
    selectedTrip.css('box-shadow', '0 0 10px 10px #F2BE22');

});

// Function for what happens when the user clicks the button to show them the trips
submitBtn.click(function() {
    userZipcode = $('#user-location').val();
    window.localStorage.setItem('zipcode', userZipcode);
    window.location.href='./results.html';

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
  currentF[index].textContent = Temp + '\u00B0F '
  
  //   Still need to correct spacing & embed weather icon - var iconUrl - into html 
  weatherDescrip[index].textContent = sunnyCloudy;
  weatherHiLo[index].textContent = ' H: ' + highF + '\u00B0 L: ' +lowF + '\u00B0';
};

// Convert dt to date for multi-day forecast for weekend getaway results
// const dt = data.current.dt;
// var day = new Date(dt*1000);
// console.log(day.toDateString());

function locationDescription(city, index){
  var descriptionURL = "https://google-search1.p.rapidapi.com/google-search?limit=5&hl=en&q=" + city + "&gl=us"
  var descriptionText = document.getElementsByClassName('location-description');

  fetch(descriptionURL, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "google-search1.p.rapidapi.com",
      "x-rapidapi-key": "9255887eb5msh9ac0f92f92b85e6p171474jsn9a553aea0426"
    }
  })
  .then(response => {
    return response.json();
  })
  .then(function(data){
    // console.log(data)
    for(let i=0; i<data.organic.length; i++){
      var currentDomain = data.organic[i].domain;

      if(currentDomain === 'en.wikipedia.org'){
        if(data.organic[i].snippet !== ''){
          console.log(descriptionText[index])
          descriptionText[index].innerText = data.organic[i].snippet;
        }
        else{
          descriptionText[index].innerText = 'We could not find a description for this city...'
        }
      }
    }
     return data;
  })
  .catch(err => {
    console.error(err);
  });
}

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
    console.log(data)
    var mapLink = data.response.place.place_link;
    mapLink = mapLink + '&output=embed';

    maps[index].children[0].src = mapLink;
    return data;
  })
  .catch(err => {
    console.error(err);
  });
}

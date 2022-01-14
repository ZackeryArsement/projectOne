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
    selectedTrip.css('box-shadow', '0 0 10px 10px blue');

})

// Function for when the user selects the Day Trip option
var daySelect = userDay.click(function() {
    searchRadius= 75;
    searchType = userType[1];

    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userDay;
    selectedTrip.css('box-shadow', '0 0 10px 10px blue');

});

// Pulling Weather API data and appending to webpage
var userZip_test = '60660';
// var userZip = document.getElementbyID("user-location"); [user input - this will replace the userZip_test above]
// var userChoice = [condition onclick - userHike, userDaytrip, or userGetaway]
// var userHike = userZip + 20 miles radius search (Parks)
// var userDaytrip = userZip + 75 miles radius search (Restaurants, Museums, Parks, Events?)
// var userGetaway = userZip + 200 miles radius search (Cities & Parks)
var userLat = "";
var userLng = ""; 

// API variables:
// var googleUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' +userZip_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6&units=imperial';
// var weather4Url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +userLat+ '&lon=' +userLng+ '&appid=be4771db9c53103bf67e6e18d9ddacc6';

// Function for when the user selects the Weekend Getaway option
var weekendSelect = userWeekend.click(function() {
    searchRadius=200;
    searchType = userType[2];
    selectedTrip.css('box-shadow', 'none');
    selectedTrip = userWeekend;
    selectedTrip.css('box-shadow', '0 0 10px 10px blue');

});

// Function for what happens when the user clicks the button to show them the trips
submitBtn.click(function() {
    userZipcode = $('#user-location').val();
    window.localStorage.setItem('zipcode', userZipcode);
    window.location.href='./results.html';

});


var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' +userZip_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// var weather4Url = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + 60660 + ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';

// Get weather data for Hike and Daytrip
function getApi(weatherUrl) {
    fetch(weatherUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          }
          return response.json();
      })
      .then(function(data){
          console.log(data);
          displayWeather(data);
          return data;
      })
    //   catch any errors
      .catch(function(){
      });
    };

getApi(weatherUrl);

function displayWeather(data){
    var weatherNav = document.getElementById('weather-data');
    var currentTemp = data.main.temp;
    var highTemp = 'H:' + data.main.temp_max;
    var lowTemp = 'L:' + data.main.temp_min;
    var feelsLike = 'Feels Like:' + data.main.feels_like;
    var sunCloud = data.weather[0].description;
    var sunnyCloudy = sunCloud.charAt(0).toUpperCase() + sunCloud.slice(1);
    console.log(sunnyCloudy); 
    // Working on getting the text on results page to look right...
    weatherNav.textContent = currentTemp + '\u00B0F ' + sunnyCloudy;
};

// Converting zipcode or city and state to latitude/longitude
    // Need to pull Geocoding Service from Google Maps API: https://developers.google.com/maps/documentation/javascript/geocoding

// Lane's code for converting zipcode to lat/lng:
function geocode(){
    var location = userZip_test;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?components=country:US|postal_code'+userZip_test, {
        params: {
            address:location,
            key: 'AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8'
        }
    })
    .then(function(response){
        console.log(response);
        if (response.status === 200) {
        }
        return response;
    })
    .then(function(data){
        console.log(data);
        return data;
    })
    .catch (function (error){
        console.log(error);
    })
    grabLatLng(data);
    };

// Trying to figure out the right syntax to pass the right data in () 
// - results, data and response lead to error "Uncaught Reference Error - data is not defined"
function grabLatLng(data){
    userLat = data.results[0].geometry.location.lat();
    userLng = data.results[0].geometry.location.lng();
    return [userLat, userLng];
};

console.log(userLat, userLng);

geocode();


// Example Code: Option 1
// var latitude = '';
// var longitude = '';
// var address = {userZip} || {userCitystate};
// geocoder.geocode( { 'address': address}, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//      latitude = results[0].geometry.location.lat();
//      longitude = results[0].geometry.location.lng();
//     });
//   } else {
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
// alert('Latitude: ' + latitude + ' Logitude: ' + longitude);

// Example Code: Option 2
// function getGeocode(zipcode) 
// {
//     var geocoder = new google.maps.Geocoder();
//     var address = zipcode;
//     geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//         } else {
//             alert("Request failed.")
//         }
//     });
//     return [latitude, longitude];
// }

// Get Weather data for Weekend Getaway
// function getApi(weather4Url) {
//     fetch(weather4Url)
//     .then(function (response) {
//       console.log(response);
//       if (response.status === 200) {
//         }
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         display4Weather(data); 
//     })
  //   catch any errors
//     .catch(function(){
//     });
//   }

//     getApi(weather4Url);

// function display4Weather(data){
//     var weatherNav = document.getElementById('weather-data');
//     var currentTemp = data.main.temp;
//     var highTemp = 'H:' + data.main.temp_max;
//     var lowTemp = 'L:' + data.main.temp_min;
//     var feelsLike = 'Feels Like:' + data.main.feels_like;
//     var sunCloud = data.weather[0].description;
//     var sunnyCloudy = sunCloud.charAt(0).toUpperCase() + sunCloud.slice(1);
//     console.log(sunnyCloudy); 
//     // Working on getting the text on results page to look right...
//     weatherNav.textContent = currentTemp + '\u00B0 F ' + sunnyCloudy;
// };

//     getApi(weather4Url);

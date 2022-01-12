var arrayLocation = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayDescription = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayWeather = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayImages = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayMap = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayCards = [];
var arrayNewRows = [];

var firstRow = $('#first-row');
var firstColumn = $('#card-column')

var rowCount;

// Load the cards and fill them with content
loadEmptyCards();
fillEmptyCards();
// clearScreen();

// Create 9 empty duplicate cards
function loadEmptyCards(){
    arrayCards[0] = firstColumn;
    // Keep track of what is the current row, so we know which row to append new rows onto
    var currentRow;
    // Keep track of what the last card added was... so we know which card to add the new card after
    var lastCard;

    // Keep track of how many new rows we have added... this is needed for when we refresh the search and need to delete all the rows other than the first row
    rowCount = 0;

    // Duplicate the first card 9 times onto the webpage
    for(i=0; i<9; i++){
        //Create a new card and add it into the card array
        var newCard = firstColumn.clone();
        arrayCards[i+1] = newCard;

        // If this is the first duplicate then add it to the first row
        if(i===0){
            // Add the new card after the first card column
            newCard.insertAfter(firstColumn);

            // The new card is now your 'last placed card'
            lastCard = newCard;

            // The current row is the first row
            currentRow = firstRow;
        }

        // Every other card has to create a new row to be placed on... we only want 2 cards per row
        else if(i%2 !== 0){
            // Empty row element for adding onto page
            var newRow = $('<div class="row"></div>');

            // Add this new empty row after the last row on screen
            newRow.insertAfter(currentRow);

            // Add this new row to an array of newly created rows and then keep track of how many rows have been created
            arrayNewRows[rowCount] = newRow;
            rowCount++;
 
            // The newly added row is now the current row
            currentRow = newRow;

            // Add a new card to the current row
            currentRow.append(newCard);

            // The new card placed onto the page is now the 'last card placed'
            lastCard = newCard;
        }
        else{
            // Place the new card after the 'last card placed'
            newCard.insertAfter(lastCard);
        }
    }
}

// Fill each card with its weather, map, image, and description
function fillEmptyCards(){
    for(i=0; i<10; i++){
        // Weather Description
        arrayCards[i]
            .children('#main-card')
            .children('#top-card')
            .children('#weather-nav')
            .children('p')
            .text(arrayWeather[i]);

        // Map Image
        arrayCards[i]
            .children('#main-card')
            .children('#top-card')
            .children('#map-column')
            .children('#map-card')
            .children('#map-image')
            .children('img')
            .attr('src', arrayImages[i]);

        // Image Image
        arrayCards[i]
            .children('#main-card')
            .children('#top-card')
            .children('#image-column')
            .children('#image-card')
            .children('#image-image')
            .children('img')
            .attr('src', arrayImages[i]);

        // Location Name
        arrayCards[i]
            .children('#main-card')
            .children('#card-description')
            .children('span')
            .text(arrayLocation[i]);

        // Description
        arrayCards[i]
            .children('#main-card')
            .children('#card-description')
            .children('p')
            .text(arrayDescription[i]);
    }
}

// Clear the screen of extra cards and extra rows
function clearScreen(){
    for(i=1; i<arrayCards.length; i++){
        arrayCards[i].remove();
    }
    for(i=0; i <(rowCount-1); i++){
        arrayNewRows[i].remove();
    }
}

// Pulling API data
var userZip_test = '60660'
// var userZip = document.getElementbyID("user-location"); [user input - this will replace the userZip_test above]
// var userChoice = [condition onclick - userHike, userDaytrip, or userGetaway]
// var userHike = userZip + 20 miles radius search (Parks)
// var userDaytrip = userZip + 75 miles radius search (Restaurants, Museums, Parks, Events?)
// var userGetaway = userZip + 200 miles radius search (Cities & Parks)

// API variables:
// var googleUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' +userZip_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6&units=imperial';
// var weather4Url = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=' +userZip_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';

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
    }

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
    weatherNav.textContent = currentTemp + '\u00B0 F ' + sunnyCloudy;
};

// Converting zipcode or city and state to latitude/longitude
    // Need to pull Geocoding Service from Google Maps API: https://developers.google.com/maps/documentation/javascript/geocoding

// Option 1
// var lat = '';
// var lng = '';
// var address = {userZip} || {userCitystate};
// geocoder.geocode( { 'address': address}, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//      lat = results[0].geometry.location.lat();
//      lng = results[0].geometry.location.lng();
//     });
//   } else {
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
// alert('Latitude: ' + lat + ' Logitude: ' + lng);

// Option 2
// function getLatLngByZipcode(zipcode) 
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

// For Weekend Getaway
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
//     })
//   //   catch any errors
//     .catch(function(){
//     });
//   }

//     getApi(weather4Url);

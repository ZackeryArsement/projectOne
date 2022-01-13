var arrayLocation = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayDescription = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayWeather = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayDistance = [1, 200, 130, 220, 350, 250, 50, 400, 375, 175]
var arrayImages = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayMap = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayCards = [];
var arrayDataObjects = [];
var arrayNewRows = [];

var firstRow = $('#first-row');
var firstColumn = $('#card-column')

// Keep track of which cards have been selected for favorite bar
var favoriteSelectedCards = [];

// Keep track of the clone cards in the favorite bar
var favoriteCardList = [];

var favoritesCol = $('#favorites-column');
var favoriteFirstRow = $('#favorites-first-row');

// Keep track of the rows in the favorite bar... this is so we can delete the last row whenever we remove a card from the favorite list... We do not want empty divs cluttering our html
var favoriteRows = [];
favoriteRows[0] = favoriteFirstRow;

var rowCount;

// Load the cards and fill them with content
createDataObjects();

loadEmptyCards();
fillEmptyCards();

favoriteButton();
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

// Create 9 objects that contains the data for each card... This will be used to organize the cards dependant on their distance value
function createDataObjects(){
    for(i=0; i<10; i++){
        arrayDataObjects[i] = {
            'location': arrayLocation[i],
            'description': arrayDescription[i],
            'weather': arrayWeather[i],
            'distance': arrayDistance[i],
            'image': arrayImages[i],
            'map': arrayMap[i]
        }
    }

    // Sort the data objects based on their distance value
    arrayDataObjects.sort(function(a, b) {
        return parseFloat(a.distance) - parseFloat(b.distance);
    });
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
            .text(arrayDataObjects[i].weather);

        // Map Image
        arrayCards[i]
            .children('#main-card')
            .children('#top-card')
            .children('#map-column')
            .children('#map-card')
            .children('#map-image')
            .children('img')
            .attr('src', arrayDataObjects[i].map);

        // Image Image
        arrayCards[i]
            .children('#main-card')
            .children('#top-card')
            .children('#image-column')
            .children('#image-card')
            .children('#image-image')
            .children('img')
            .attr('src', arrayDataObjects[i].image);

        // Location Name
        arrayCards[i]
            .children('#main-card')
            .children('#card-description')
            .children('span')
            .text(arrayDataObjects[i].location + ' (' + arrayDataObjects[i].distance + ' mi)');

        // Description
        arrayCards[i]
            .children('#main-card')
            .children('#card-description')
            .children('p')
            .text(arrayDataObjects[i].description);
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

function favoriteButton(){
    var newRow = $("<div class='row'></div>");
    var favoritesCurrentRow;

// document.querySelector('#user-location').click();
//     console.log('clicked')

    // Change the ID of the clone card to the location of the parent card being cloned
    selectedCard.attr('id', buttonParent.children('#main-card')
        .children('#card-description')
        .children('span')
        .text());

    if(favoriteSelectedCards.includes(buttonParent)){
        console.log('You have arleady selected this card for the favorite list.');
    }
    else{
        favoriteSelectedCards.push(buttonParent);
// function favoriteButton(){
//     var newRow = $("<div class='row'></div>");
//     var favoritesCurrentRow;

//     // Assume we know the parent card of the button pressed... make it variable 'buttonParent'
//     var buttonParent = arrayCards[3];
//     var selectedCard = buttonParent.children('#main-card').clone();

//     if(favoriteSelectedCards.includes(buttonParent)){
//         console.log('You have arleady selected this card for the favorite list.');
//     }
//     else{
//         favoriteSelectedCards.push(buttonParent);

//         // If there is only the first row available then put the card in the first row and add a row after it
//         if(favoriteRows.length === 1){
//             currentRow = favoriteFirstRow;
//             favoriteRows[(favoriteRows.length-1)].append(selectedCard);
//             currentRow = newRow;
//         }
//         else{
//             favoriteRows[(favoriteRows.length-1)].append(selectedCard);
//             currentRow = newRow;
//         }
//         // console.log('added');
//     }
// }

        // If there is only the first row available then put the card in the first row and add a row after it
        if(favoriteRows.length === 1){
            currentRow = favoriteFirstRow;
            favoriteRows[(favoriteRows.length-1)].append(selectedCard);
            currentRow = newRow;
        }
        else{
            favoriteRows[(favoriteRows.length-1)].append(selectedCard);
            currentRow = newRow;
        }
        // console.log('added');
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

// var weatherUrl ='api.openweathermap.org/data/2.5/weather?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// var 4day-weatherUrsl = 'pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';

// var userZip = document.get ElementbyID(""); [user input - grab from html input element]
// **userZip - currently inserted in API variables above - should be replaced by radius search var userChoice**
// var userChoice = [condition onclick - userHike, userDaytrip, or userGetaway]
// var userHike = userZip + x miles radius search
// var userDaytrip = userZip + y miles radius search
// var userGetaway = userZip + z miles radius search


// Starting code for getting APIs: we will want to parse these by userHike, userDaytrip and userGetaway...

// function getApi() {
//     const requestUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
    
//     fetch(requestUrl)
//         .then(function (response) {
//         return response.json(); {
//         }
//     })}

//     getApi(googleUrl);

// For Hike and Daytrip
// function getApi(weatherUrl) {
//     fetch(weatherUrl)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//             responseText.textContent = response.status;
//           }
//           return response.json();
//       });
//     }


//     getApi(weatherUrl);

// For Weekend Getaway
// function getApi(4day-weatherUrl) {
//     fetch(googleUrl)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//             responseText.textContent = response.status;
//           }
//           return response.json();
//       });
//     }
//     getApi(4day-weatherUrl);
//     getApi(googleUrl);












// HOMEPAGE JAVASCRIPT

// **things that need to happen
// Create event listener on the cards so when they're clicked it counts as a selection
// have submit button redirect to result page

// var submitBtn = $('.submitBtn')
// var userTrip = $('.')
// var searchRadius
// var tripType = $('.tripType')

// submitBtn.click(function() {
//     window.location.replace('./results.html');

//     console.log('click');
// })

// console.log(submitBtn);

// var tripSelection = tripType.click(function() {
//     preventDefault(e);
//     tripType.css('border-color', 'blue');
//     console.log('type selct');
// });

// var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' +userZip_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// // var weather4Url = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + 60660 + ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';

// // Get weather data for Hike and Daytrip
// function getApi(weatherUrl) {
//     fetch(weatherUrl)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//           }
//           return response.json();
//       })
//       .then(function(data){
//           console.log(data);
//       })
//     //   catch any errors
//       .catch(function(){
//       });
//  }

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
var selectedBox 

selectedBox.css('box-shadow', '0 0 10px 10px red')


submitBtn.click(function() {
    // window.location.href='./results.html';

    userZipcode = $('#user-location').val();
    console.log('click');
    console.log(searchRadius);
    console.log(searchType);
    console.log(userZipcode)
});

console.log(submitBtn);

// tripTypeCard.on('click',function(this) {
//     this.css('box-shadow', '0 0 10px 10px red')
// })



userWalk.click(function() {
    searchRadius= 20;
    searchType = userType[0];
    userWalk.css('box-shadow', '0 0 10px 10px red')
    // console.log('user has selected walk/hike');
    // console.log(searchRadius);
    // console.log(searchType);
})

userDay.click(function() {
    searchRadius= 75;
    searchType = userType[1];
    userDay = selectedBox;
    // console.log('user has selected Day trip');
    // console.log(searchRadius);
    // console.log(searchType);
})

userWeekend.click(function() {
    searchRadius=200;
    searchType = userType[2];
    userWeekend = selectedBox;
    
    // console.log('User has selected a weekend getaway');
    // console.log(searchRadius);
    // console.log(searchType);
})


console.log(userZipcode);
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
    }

// getApi(weatherUrl);

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
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

// function to set the map properties
function initMap() {
    var options = {
        zoom:15,
        center:{lat:42.3601,lng:-71.0589}
        }
        var map = new google.maps.Map(document.getElementById('map'),options);
    }

document.querySelector('#user-location').click();
    console.log('clicked')


// API variables:
// var googleUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
// var weatherUrl ='api.openweathermap.org/data/2.5/weather?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// var 4day-weatherUrsl = 'pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';

// var userZip = document.get ElementbyID(""); [user input - grab from html input element]
// **userZip - currently inserted in API variables above - should be replaced by radius search var userChoice**
// var userChoice = [condition onclick - userHike, userDaytrip, or userGetaway]
// var userHike = userZip + x miles radius search
// var userDaytrip = userZip + y miles radius search
// var userGetaway = userZip + z miles radius search


// Starting code for getting APIs: we will want to parse these by userHike, userDaytrip and userGetaway...

function getApi() {
    const requestUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
    
    fetch(requestUrl)
        .then(function (response) {
        return response.json(); {
        }
    })}

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
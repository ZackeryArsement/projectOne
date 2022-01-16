var arrayLocation = [];
var arrayDescription = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayWeather = ['Austin', 'Dallas', 'San Antonio', 'Houston', 'Beaumont', 'Galveston', 'Waco', 'Amarillo', 'Lubbock', 'Corpus Christi'];
var arrayDistance = [];
var arrayImages = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayMap = ["./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG","./assets/images/IMG_3935.JPG"];
var arrayCards = [];
var arrayDataObjects = [];
var arrayNewRows = [];
var loadedCardLength = 0;

var firstRow = $('#first-row');
var firstColumn = $('#card-column')

// Keep track of which cards have been selected for favorite bar
var emptyArray = ['', '', '', '', '', '', '', '', '', ''];
var favoriteSelectedCards = localStorage.getItem("favoriteSelectedCards") || emptyArray;

// Keep track of the clone cards in the favorite bar
var favoriteCardList = [];

var favoritesCol = $('#favorites-column');
var favoriteFirstRow = $('#favorites-first-row');

// Keep track of the first rows html... if the html is ever 'undefined' then reset back to default html
var favoriteFirstRowHtml = favoriteFirstRow.html();

var rowCount;

// Retrieves stored array or initializes a new one if blank nothing previously stored
// localStorage.clear();
var savedFavorites = localStorage.getItem("savedFavorites") || [null]

//Load the saved favorites bar
favoriteFirstRow.html(savedFavorites);

// Load the cards and fill them with content
setStoredFavoritesStorageToArray()
clearScreen();

// Fetch data
// API Values
var inputCity = 'austin';
var cityID;
var findCityURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&minPopulation=100000&namePrefix=" + inputCity;
var cityData;

getData(findCityURL);


// clearScreen();

// When you click the favorite button 
function favoriteButton(button){
    // Assume we know the parent card of the button pressed... make it variable 'buttonParent'
    var buttonParent = $(button).parent().parent().parent().parent().parent().parent();

    
    
    // Make a clone of the card you favorited so you can put this clone in the favorite bar
    var selectedCard = buttonParent.children('#main-card').clone();

    // Access the location text of the card being selected
    var cardLocationText = buttonParent.children('#main-card').children('#card-description').children('span').text();

    // We want the id of the clones card to be the location of the parent card
    var newID = cardLocationText.replaceAll(" ", "-"); // Remove all whitespace from the id

    // Change the ID of the clone card to the location of the parent card being cloned... this us allows us to know the parent card associated with each clone
    selectedCard.attr('id', newID);

    var locationIndex;

    // If the favorite button you selected is a parent card then add/remove a clone to the favorite sidebar
    if(buttonParent.children().attr('id') === 'main-card'){
        // If you already have a card selected with the corresponding location in the favorites bar then remove it from the favorites bar
        if(favoriteSelectedCards.includes(cardLocationText)){
            // Access the clone in the favorites bar with the selected location and remove the card and its row
            var deleteCard = document.getElementById(selectedCard.attr('id'));
            deleteCard.remove();

            // Remove the location string from the selected card array
            locationIndex = (favoriteSelectedCards.indexOf(cardLocationText));

            favoriteSelectedCards.splice(locationIndex, 1, '');
            localStorage.setItem('favoriteSelectedCards', favoriteSelectedCards);
        }
        else{
            // Add the card location to the array of selected card locations
            favoriteSelectedCards.splice(favoriteSelectedCards.indexOf(''), 1, cardLocationText);
            localStorage.setItem('favoriteSelectedCards', favoriteSelectedCards);

            // Add the selected card 
            favoriteFirstRow.append(selectedCard);
        }
    }
    // If the favorite button you selected is a cloned card then remove the card from the sidebar
    else{
        // Take out the '-' in the id to match the parent cards location string
        var cloneLocation = $(button).parent().parent().parent().parent().parent().attr('id').replaceAll("-", " ");

        // Delete the clone card that the button you pressed is attached to
        $(button).parent().parent().parent().parent().parent().remove();

        // Remove the location string from the selected card array
        locationIndex = (favoriteSelectedCards.indexOf(cloneLocation));

        favoriteSelectedCards.splice(locationIndex, 1, '');
        localStorage.setItem('favoriteSelectedCards', favoriteSelectedCards);
    }

    // Pull the html of the favorites row and save it to local storage
    var favoriteRowHtml = $('#favorites-first-row').html();

    //saves array as string in localstorage
    localStorage.setItem("savedFavorites", favoriteRowHtml);

    if((typeof favoriteRowHtml) === 'undefined'){
        localStorage.setItem("savedFavorites", favoriteFirstRowHtml);
    }
}

// Create 9 empty duplicate cards
function loadEmptyCards(length){
    arrayCards[0] = firstColumn;
    // Keep track of what is the current row, so we know which row to append new rows onto
    var currentRow;
    // Keep track of what the last card added was... so we know which card to add the new card after
    var lastCard;

    // Keep track of how many new rows we have added... this is needed for when we refresh the search and need to delete all the rows other than the first row
    rowCount = 0;

    // Duplicate the first card 9 times onto the webpage
    for(let i=0; i<(length-1); i++){
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
function createDataObjects(length){
    for(let i=0; i<length; i++){
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
function fillEmptyCards(length){
    for(let i=0; i<length; i++){
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
    for(let i=1; i<arrayCards.length; i++){
        arrayCards[i].remove();
    }
    for(let i=0; i <(rowCount-1); i++){
        arrayNewRows[i].remove();
    }
}

// When Document is ready to load
$( document ).ready(function() {
    // Dropdown trigger JS (With Hover Dropdown)
    $(".dropdown-trigger").dropdown({ hover: true });
});

function setStoredFavoritesStorageToArray(){
    // If the locally storaged string with our saved favorite locations is not empty then create an array out of the string with ',' as the delimeter
    if((favoriteSelectedCards !== ',,,,,,,,,') && (favoriteSelectedCards !== emptyArray)){
        favoriteSelectedCards = localStorage.getItem("favoriteSelectedCards").split(',');
    }
    // If the locally stored favorites are a empty string of commas then set the stored favorite locations as an empty array
    else if(favoriteSelectedCards === ',,,,,,,,,'){
        favoriteSelectedCards = emptyArray;
    }
}

function getData(URL){
    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "2ad8fcafecmsh3b2f55fa0261ecfp1301a0jsn70db2fbb2f15"
        }
        })
        .then(response => {
            return response.json();
        })
        .then(function(data){
            cityID = data.data[0].id.toString();

            getCityData(cityID);

            return data;
        })
        .catch(err => {
            console.error(err);
        });
}

function getCityData(id){
    var nearbyCityURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + id + "/nearbyCities?limit=10&offset=0&radius=100&types=CITY";
            
    setTimeout(function(){
        fetch(nearbyCityURL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": "2ad8fcafecmsh3b2f55fa0261ecfp1301a0jsn70db2fbb2f15"
            }
            })
            .then(response => {
                return response.json();
            })
            .then(function(data){
                var userLat;
                var userLng;
                var weatherUrl2;

                loadedCardLength = data.data.length;
                console.log(loadedCardLength);

                for(let i=0; i< loadedCardLength; i++){
                    cityData = data.data[i];
                    arrayLocation[i] = cityData.city;
                    arrayDistance[i] = cityData.distance;

                    userLat = cityData.latitude;
                    userLng = cityData.longitude;
                    weatherUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + userLat + '&lon=' + userLng + '&appid=be4771db9c53103bf67e6e18d9ddacc6&units=imperial';

                    var index = i;

                    getApi(weatherUrl2, index);
                }

                createDataObjects(loadedCardLength);
                loadEmptyCards(loadedCardLength);
                fillEmptyCards(loadedCardLength);
            })
            .catch(err => {
                console.error(err);
            });
    },1500);
    
}
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

var rowCount;

// Load the cards and fill them with content
createDataObjects();

loadEmptyCards();
fillEmptyCards();

// clearScreen();

favoriteButton(3);
favoriteButton(4);
favoriteButton(5);
favoriteButton(6);

favoriteButton(3);
favoriteButton(4);
favoriteButton(5);
favoriteButton(6);

// When you click the favorite button 
function favoriteButton(arrayNumb){
    // Assume we know the parent card of the button pressed... make it variable 'buttonParent'
    // var buttonParent = arrayCards[arrayNumb];

    var buttonParent = elem.
    
    var selectedCard = buttonParent.children('#main-card').clone();

    // Access the location text of the card being selected
    var cardLocationText = buttonParent.children('#main-card').children('#card-description').children('span').text();

    // We want the id of the clones card to be the location of the parent card
    var newID = cardLocationText.replaceAll(" ", "-"); // Remove all whitespace from the id

    // Change the ID of the clone card to the location of the parent card being cloned... this us allows us to know the parent card associated with each clone
    selectedCard.attr('id', newID);

    // If you already have a card selected with the corresponding location in the favorites bar then remove it from the favorites bar
    if(favoriteSelectedCards.includes(cardLocationText)){
        console.log('You have arleady selected this card for the favorite list.');

        // Access the clone in the favorites bar with the selected location and remove the card and its row
        var deleteCard = document.getElementById(selectedCard.attr('id'));

        // Don't remove the row if it is the first row
        if(deleteCard.parentElement.id === 'favorites-first-row'){
            deleteCard.remove();

            // Remove the location string from the selected card array
            favoriteSelectedCards.splice(favoriteSelectedCards.indexOf(cardLocationText), 1);
        }
        else{
            deleteCard.parentElement.remove();

            // Remove the location string from the selected card array
            favoriteSelectedCards.splice(favoriteSelectedCards.indexOf(cardLocationText), 1);
        }
    }
    else{
        // Add the card location to the array of selected card locations
        favoriteSelectedCards.push(cardLocationText);

        // Add the selected card 
        favoriteFirstRow.append(selectedCard);
    }
}

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

// When Document is ready to load
$( document ).ready(function() {
    console.log( "ready!" );
    
    // Dropdown trigger JS
    $(".dropdown-trigger").dropdown();
});

// Dropdown Menu Take 2
function myFunction() {
    document.getElementById(dropdown1).classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('dropdown-trigger btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns [i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
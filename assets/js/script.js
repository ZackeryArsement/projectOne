// API variables:
// var googleUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2j53y5S7r1DhmM9s62cuB-vC0mPX9TQ8&callback=initMap';
// var weatherUrl ='api.openweathermap.org/data/2.5/weather?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// var 4day-weatherUrl = 'pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + userZip ',us&appid=be4771db9c53103bf67e6e18d9ddacc6';
// var instagramUrl = 'https://graph.instagram.com/{media-id}?fields={fields}&access_token={access-token}';

// var userZip = document.get ElementbyID(""); [user input - grab from html input element]
// **userZip - currently inserted in API variables above - should be replaced by radius search var userChoice**
// var userChoice = [condition onclick - userHike, userDaytrip, or userGetaway]
// var userHike = userZip + x miles radius search
// var userDaytrip = userZip + y miles radius search
// var userGetaway = userZip + z miles radius search


// Starting code for getting APIs: we will want to parse these by userHike, userDaytrip and userGetaway...
// function getApi(googleUrl) {
//     fetch(googleUrl)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//             responseText.textContent = response.status;
//           }
//           return response.json();
//       });
//     }

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
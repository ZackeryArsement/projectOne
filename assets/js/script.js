// API variables:
// var googleUrl = 'https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY}&callback=initMap';
// var weatherUrl ='api.openweathermap.org/data/2.5/weather?zip=' + userZip ',us&appid={API key}';
// var 4day-weatherUrl = 'pro.openweathermap.org/data/2.5/forecast/hourly?zip=' + userZip ',us&appid={API key}';
// var instagramUrl = 'https://graph.instagram.com/{media-id}?fields={fields}&access_token={access-token}';

// var userZip = [user input - grab from html input element]


// Starting code for getting APIs:
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
b0b1a57dd6c32f78f9ea0a44ec5499f1;
//api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// search weather data
function searchLocation() {
  fetch("http://example.com/movies.json")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

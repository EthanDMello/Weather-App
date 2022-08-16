// API Key: b0b1a57dd6c32f78f9ea0a44ec5499f1;
// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function searchLocation(city) {
  // search api for lat and long geo data
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q={" +
      city +
      "}&limit={1}&appid={b0b1a57dd6c32f78f9ea0a44ec5499f1}"
  )
    .then((response) => response.json())
    .then((data) => {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log("Success:", data, lat, lon);
      searchWeather(lat, lon);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchWeather(lat, lon) {
  // search api for weather data with lat and lon
  fetch(
    "  https://api.openweathermap.org/data/3.0/onecall?lat={" +
      lat +
      "}&lon={" +
      lon +
      "}&exclude=minutely,alerts&appid={b0b1a57dd6c32f78f9ea0a44ec5499f1}"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      appendWeatherData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function appendWeatherData(data) {}

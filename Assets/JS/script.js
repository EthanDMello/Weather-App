// API Key: b0b1a57dd6c32f78f9ea0a44ec5499f1;
// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// DIRECT LOCATION http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// FORECAST CALL https://api.openweathermap.org/data/2.5/forecast?q=Birmingham,uk&units=metric&appid=b0b1a57dd6c32f78f9ea0a44ec5499f1

// function searchLocation(city) {
//   // search api for lat and long geo data
//   fetch(
//     "api.openweathermap.org/geo/1.0/direct?q=" +
//       city +
//       "&limit=5&appid=b0b1a57dd6c32f78f9ea0a44ec5499f1"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const lat = data[0].lat;
//       const lon = data[0].lon;
//       console.log("Success:", data, lat, lon);
//       searchWeather(lat, lon);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function searchWeather(lat, lon) {
//   // search api for weather data with lat and lon
//   fetch(
//     "api.openweathermap.org/data/3.0/onecall?lat={" +
//       lat +
//       "}&lon={" +
//       lon +
//       "}&exclude=minutely,alerts&appid={b0b1a57dd6c32f78f9ea0a44ec5499f1}"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//       appendWeatherData(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

function appendWeatherCurrentData(temp, wind, pressure, humidity) {
  console.log("appendWeatherData go!");
  document.getElementById("currentTemp").textContent = temp;
  document.getElementById("currentWind").textContent = wind;
  document.getElementById("currentPressure").textContent = pressure;
  document.getElementById("currentHumidity").textContent = humidity;
}
function appendWeatherForecastData(temp, weather, wind, time, id) {
  console.log("appendForecastData go!");
  document.getElementById("temp1").textContent = temp;
  // document.getElementById("currentWind").textContent = wind;
  document.getElementById("weather1").textContent = weather;
  document.getElementById("date1").textContent = time;
}

function searchCurrentWeatherTest() {
  fetch("Assets/JS/data.JSON")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const wind = data.wind.speed;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      console.log("Success:", temp, wind, pressure, humidity);
      appendWeatherCurrentData(temp, wind, pressure, humidity);
    });
}

function forecastWeatherTest() {
  fetch("Assets/JS/dataForecast.JSON")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("sesh");
      for (let i = 0; i < 40; i += 8) {
        const temp = data.list[i].main.temp;
        const weather = data.list[i].weather[0].main;
        const wind = data.list[i].wind.speed;
        const time = data.list[i].dt_txt;
        console.log(
          "weather forecast",
          temp + "°C",
          weather,
          wind + "m/s",
          time
        );
        appendWeatherForecastData(temp, weather, wind, time);
      }
    });
}

searchCurrentWeatherTest();
forecastWeatherTest();

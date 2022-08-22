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
  document.getElementById("currentTemp").textContent = temp + "°C";
  document.getElementById("currentWind").textContent = wind + "m/s";
  document.getElementById("currentPressure").textContent = pressure + "hPa";
  document.getElementById("currentHumidity").textContent = humidity + "%";
}
function appendWeatherForecastData(temp, weather, wind, time, id) {
  let parsedTime = "";
  if (id === 1) {
    time = "Today";
  } else if (id === 2) {
    time = "Tomorrow  ";
  } else {
    parsedTime = moment.unix(time).format("ddd Do");
  }
  document.getElementById("temp" + id).textContent = temp + "°C";
  document.getElementById("wind" + id).textContent = wind + "m/s";
  document.getElementById("weather" + id).textContent = weather;
  if (id < 3) {
    document.getElementById("date" + id).textContent = time;
  } else {
    document.getElementById("date" + id).textContent = parsedTime;
  }
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
      appendWeatherCurrentData(temp, wind, pressure, humidity);
    });
}

function forecastWeatherTest() {
  // https://api.openweathermap.org/data/2.5/forecast?q=Birmingham,uk&units=metric&appid=b0b1a57dd6c32f78f9ea0a44ec5499f1
  fetch("Assets/JS/dataForecast.JSON")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let idCount = 1;
      for (let i = 0; i < 40; i += 8) {
        const temp = data.list[i].main.temp;
        const weather = data.list[i].weather[0].main;
        const wind = data.list[i].wind.speed;
        const time = data.list[i].dt;
        appendWeatherForecastData(temp, weather, wind, time, idCount);
        idCount++;
      }
    });
}

if (localStorage.getItem("recentSearches") === null) {
  searchAr = [];
  localStorage.setItem("recentSearches", JSON.stringify(searchAr));
} else searchAr = JSON.parse(localStorage.getItem("recentSearches"));

$(".searchButton").click(function () {
  userSearch = $("#searchInput").val();
  JSON.parse(localStorage.getItem("recentSearches"));
  searchAr.push(userSearch);
  localStorage.setItem("recentSearches", JSON.stringify(searchAr));
  console.log(userSearch);

  $("#searchInput").val("");
});

searchCurrentWeatherTest();
forecastWeatherTest();

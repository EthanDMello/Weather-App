// API Key: b0b1a57dd6c32f78f9ea0a44ec5499f1;
// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// DIRECT LOCATION http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// FORECAST CALL https://api.openweathermap.org/data/2.5/forecast?q=Birmingham,uk&units=metric&appid=b0b1a57dd6c32f78f9ea0a44ec5499f1

function appendWeatherForecastData(temp, weather, wind, time, humidity, id) {
  let parsedTime = "";
  if (id === 0) {
    time = "Tomorrow";
  } else {
    parsedTime = moment.unix(time).format("ddd Do");
  }
  document.getElementById("temp" + id).textContent = temp + "°C";
  document.getElementById("wind" + id).textContent = wind + "m/s";
  document.getElementById("weather" + id).textContent = weather;
  document.getElementById("humidity" + id).textContent = humidity + "%";
  if (id < 1) {
    document.getElementById("date" + id).textContent = time;
  } else {
    document.getElementById("date" + id).textContent = parsedTime;
  }
}

recentSearchArArea = $("#recentLocation").children();
const appendRecentSearches = (array) => {
  array.forEach((search, i) => {
    recentSearchArArea[i].textContent = search;
  });
};

if (localStorage.getItem("recentSearches") === null) {
  searchAr = [];
  localStorage.setItem("recentSearches", JSON.stringify(searchAr));
} else {
  searchAr = JSON.parse(localStorage.getItem("recentSearches"));
  searchAr.forEach((search, i) => {
    recentSearchArArea[i].textContent = search;
  });
  getLonLat("Birmingham");
}

function getLonLat(location) {
  // get lon and lat from API
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&APPID=b0b1a57dd6c32f78f9ea0a44ec5499f1"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $("#currentCity").text(data.name);
      const lon = data.coord.lon;
      const lat = data.coord.lat;
      console.log(lon, lat);
      searchOneCallWeather(lon, lat, data.name);
    });
}

function searchOneCallWeather(lon, lat, name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&units=metric&appid=178231eb35d5ca1d0cc2ad44abbbcaa4"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem(name, JSON.stringify(data));
      console.log(data);
      appendAllWeatherData(data, name);
    });
}

function appendAllWeatherData(data, name) {
  $("#currentCity").text(name);
  $("#currentIcon").attr(
    "src",
    "http://openweathermap.org/img/wn/" +
      data.current.weather[0].icon +
      "@2x.png"
  );
  document.getElementById("currentTemp").textContent = data.current.temp + "°C";
  document.getElementById("currentWind").textContent =
    data.current.wind_speed + "m/s";
  document.getElementById("currentUv").textContent = data.current.uvi + "index";
  if (data.current.uvi <= 2) {
    $("#currentUv").attr("class", "has-text-white has-background-success");
  } else if (data.current.uvi > 2 && data.current.uvi < 6) {
    $("#currentUv").attr("class", "has-text-white has-background-warning");
  } else {
    $("#currentUv").attr("class", "has-text-white has-background-danger");
  }
  document.getElementById("currentHumidity").textContent =
    data.current.humidity + "%";
  for (let i = 0; i < 5; i++) {
    const temp = data.daily[i].temp.day;
    const weather = data.daily[i].weather[0].main;
    const wind = data.daily[i].wind_speed;
    const humidity = data.daily[i].humidity;
    const time = data.daily[i].dt;
    appendWeatherForecastData(temp, weather, wind, time, humidity, i);
  }
}

$(".searchButton").click(function () {
  userSearch = $("#searchInput").val();
  searchAr = JSON.parse(localStorage.getItem("recentSearches"));
  searchAr.unshift(userSearch);
  if (searchAr.length > 8) searchAr.pop();
  localStorage.setItem("recentSearches", JSON.stringify(searchAr));
  appendRecentSearches(searchAr);
  getLonLat(userSearch);
  $("#searchInput").val("");
});

$(".panel-block").click(function (event) {
  let location = event.target.textContent;
  dataAr = JSON.parse(localStorage.getItem(location));
  appendAllWeatherData(dataAr, location);
  console.log("clicked", location, dataAr);
});

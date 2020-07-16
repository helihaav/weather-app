let now = new Date();

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = addZero(now.getMinutes());

console.log(`${day}, ${hours}, ${minutes}`);
let date = document.querySelector("#day-time");
date.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  let myCity = document.querySelector("#main-city");
  myCity.innerHTML = response.data.name;

  let myCityTemp = document.querySelector("#real-temperature");
  myCityTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

  let myCityHum = document.querySelector("#humidity");
  myCityHum.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let myCityWind = document.querySelector("#wind");
  myCityWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}m/s`;

  celsiusTemperature = response.data.main.temp;
}

function weatherSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = `${searchInput.value}`;
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${city}`;
  }
  search(city);
}

function search(city) {
  let apiKey = "99fa2ab95f6627691849388c94fbc8df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#real-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#real-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchMyCity = document.querySelector("#search-form");
searchMyCity.addEventListener("submit", weatherSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Tallinn");

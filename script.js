function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature-value");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} KmH`;
}

let apiKey = "655cc338645c52514e1df31b37348c78";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

let now = new Date();

let dayOfMonth = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let weekDay = now.getDay();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let h1 = document.querySelector("#dateTitle");
h1.innerHTML = `${months[month]} ${dayOfMonth}, ${year}`;

let dayAndHour = document.querySelector("#dayAndTime");
dayAndHour.innerHTML = `${weekDays[weekDay]} - ${hours}:${minutes}H`;

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-City-Form");
searchForm.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

let fahrenheitConvertLink = document.querySelector("#fahrenheit-convert-link");
fahrenheitConvertLink.addEventListener("click", convertToFahrenheit);

let celsiusConvertLink = document.querySelector("#celsius-convert-link");
celsiusConvertLink.addEventListener("click", convertToCelsius);

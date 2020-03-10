let now = new Date();
let dayOfMonth = now.getDate();
let year = now.getFullYear();

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
let month = months[now.getMonth()];

function formatDate(timestamp) {
  let now = new Date(timestamp);

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDays[now.getDay()];
  return `Last updated: ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let completeDateElement = document.querySelector("#dateTitle");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayAndTimeElement = document.querySelector("#dayAndTime");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let mainIconElement = document.querySelector("#mainIcon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  completeDateElement.innerHTML = `${month} ${dayOfMonth}, ${year}`;
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} Km/H`;
  dayAndTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}º`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}º`;
  mainIconElement.setAttribute(
    "src",
    `https://eager-meitner-dd6cbe.netlify.com/src/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `  
    <div class="col-3">
              <h3>${formatHours(forecast.dt * 1000)}</h3>
              <img
                src="https://eager-meitner-dd6cbe.netlify.com/src/${
                  forecast.weather[0].icon
                }@2x.png"
              />
              <div class="weather-forecast-temperature">
                <strong>${Math.round(
                  forecast.main.temp_max
                )}º</strong> ${Math.round(forecast.main.temp_min)}º
          </div>
        </div>`;
  }
}

function search(city) {
  let apiKey = "655cc338645c52514e1df31b37348c78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature-value");
  celsiusConvertLink.classList.remove("active");
  fahrenheitConvertLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusConvertLink.classList.add("active");
  fahrenheitConvertLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-City-Form");
form.addEventListener("submit", handleSubmit);

let fahrenheitConvertLink = document.querySelector("#fahrenheit-convert-link");
fahrenheitConvertLink.addEventListener("click", convertToFahrenheit);

let celsiusConvertLink = document.querySelector("#celsius-convert-link");
celsiusConvertLink.addEventListener("click", convertToCelsius);

search("Tokyo");

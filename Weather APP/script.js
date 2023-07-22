//variables for fetching api data
const apikey = "266c8dfd4053a93349aaaf1a93cf1283"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

//variables to take input entered in search bar
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

//points at the weather icon for changing it according to api's data
const weatherIcon = document.querySelector(".weather-icon")

//an async function to take response from api, setting different values and changing the icon using if-else
async function checkWeather(city){
  const response = await fetch(apiURL + city + `&appid=${apikey}`)

  //checking for error, if error then show '.error' part else show the weather data
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"
    document.querySelector(".weather").style.display = "none"
  } 
  else {

  const data = await response.json()

  document.querySelector(".city").innerHTML = data.name;

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

  if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
  else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
  else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
  else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
  else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
  else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
        }

  document.querySelector(".weather").style.display = "block"
  document.querySelector(".error").style.display = "none"
      }
}

//taking user input
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value=""
})


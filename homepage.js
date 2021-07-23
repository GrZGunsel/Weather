const api = {
  key: "5bf8736b313d13a6a29e63d428cdc8ed",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".searchbar");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".temperature .city .cities");
  city.innerText = `${weather.name}`;

  let icon = document.querySelector(".temperature .icon");
  icon.src = `https://openweathermap.org/img/wn/04n.png`;
  let now = new Date();
  let date = document.querySelector(".temperature .city  .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temperature .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;`;

  let weather_el = document.querySelector(
    ".temperature .weather .currentweather "
  );
  weather_el.innerText = weather.weather[0].main;

  let humidity = document.querySelector(".content .weatherdetail .humidity");
  humidity.innerHTML = `${weather.main.humidity}%`;

  let pressure = document.querySelector(".content .weatherdetail .pressure");
  pressure.innerHTML = `${weather.main.pressure}%`;

  let wind = document.querySelector(".content .weatherdetail .wind");
  wind.innerHTML = `${weather.wind.speed}km/hr`;

  let country = document.querySelector(".content .weatherdetail .Country");
  country.innerHTML = `${weather.sys.country}`;
}

function dateBuilder(d) {
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
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

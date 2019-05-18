const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const body = document.querySelector("body");
const forecast = new Forecast();

updateUI = data => {
  /*
  destructure properties, instead of 
        const cityInfo = data.cityInfo;
        const weather = data.weather;
   */
  const { cityInfo, weather } = data;

  //update details template
  details.innerHTML = `
        <h5 class="my-3">${cityInfo.name}</h5>
        <div class="my-3">${weather.weather[0].description}</div>
        <div class="display-4 my-4">
        <span>${weather.main.temp}</span>
        <span>&deg;C</span>
        </div>
    `;

  const isDay = (citySunrise, citySunset) => {
    //get current time
    const date = new Date();
    //Convert a Unix timestamp to time
    const sunrise = new Date(citySunrise * 1000);
    const sunset = new Date(citySunset * 1000);
    let day = true;
    //check for daytime
    if (
      date.getHours() >= sunrise.getHours() &&
      date.getHours() < sunset.getHours()
    ) {
      day = true;
    } else {
      day = false;
    }
    return day;
  };
  const now = isDay(weather.sys.sunrise, weather.sys.sunset);

  //update day/night images
  now
    ? time.setAttribute("src", "img/day.svg")
    : time.setAttribute("src", "img/night.svg");

  //update background based on time of day
  now
    ? (body.style.backgroundColor = "#c5eeff")
    : (body.style.backgroundColor = "#002636");

  //update icon based on API response
  const iconSrc = `img/icons/${weather.weather[0].icon}.svg`;
  icon.setAttribute("src", iconSrc);

  //remove display none from card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", e => {
  //prevent default reload
  e.preventDefault();
  //get city value from user
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //Update UI with information
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(e => console.log(e));
  //save to local storage
  localStorage.setItem("city", city);
});
//checking for values in local storage
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(e => console.log(e));
}
//test
forecast
  .getCity("aarhus")
  .then(data => {
    return forecast.getWeather(data.id);
  })
  .catch(e => console.log(e));

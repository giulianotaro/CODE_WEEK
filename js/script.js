import { place } from "./data.js";

const today = new Date();
document.querySelector(".date").textContent = today.toString();

const choosePlace = document.getElementById("choosePlace");

const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".btnclose");

modal.style.display = "flex";
btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

choosePlace.innerHTML = place.reduce(
  (options, { value, name }) =>
    (options += `<option class="ok" value="${value}">${name}</option>`)
);

const select = document.querySelector(".select");

choosePlace.addEventListener("change", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      choosePlace.value +
      "&units=metric&appid=97cb9169215648941878bdef535de1fd"
  )
    .then((response) => response.json())
    .then((data) => {
      const tempValue = data["main"]["temp"];
      const nameValue = data["name"];
      const descValue = data["weather"][0]["description"];
      const humValue = data["main"]["humidity"];
      const windValue = data["wind"]["speed"];

      let temperatureNum = Math.floor(`${tempValue}`);
      let windNum = Math.floor(`${windValue}`);

      const nameofcity = document.querySelector(".nameofcity");
      const weather = document.querySelector(".weather");
      const wind = document.querySelector(".wind");
      const temperature = document.querySelector(".temperature");
      const humidity = document.querySelector(".humidity");

      nameofcity.replaceChildren(`${nameValue}`);
      weather.replaceChildren(` weather: ${descValue} `);
      wind.replaceChildren(` speed's wind: ${windNum} `);
      temperature.replaceChildren(`temperature: ${temperatureNum}°C `);
      humidity.replaceChildren(` humidity: ${humValue}% `);
    });
});

import { place } from "./data.js";

/* const API = { apiKey : `97cb9169215648941878bdef535de1fd`,
              weatherUrl : `https://api.openweathermap.org/data/2.5/weather?`
} */

const choosePlace = document.getElementById("choosePlace");
const nameOfCity = document.querySelector(`#name`);
const temp = document.querySelector(".main");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const card = document.querySelector(".card");

choosePlace.innerHTML = place.reduce(
  (options, { value, name }) =>
    (options += `<option value="${value}">${name}</option>`),
  '<option value="" selected></option>'
);

choosePlace.addEventListener("change", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      choosePlace.value +
      "&units=metric&appid=97cb9169215648941878bdef535de1fd"
  )
    .then((response) => response.json())
    .then((data) => {
      const tempValue = data["main"]["temp"] 
      const nameValue = data["name"];
      const descValue = data["weather"][0]["description"];
      const humValue = data["main"]["humidity"];
      const windValue = data["wind"] ["speed"];

      let temperature = (Math.floor(`${tempValue}`));
      let wind = (Math.floor(`${windValue}`));
      
      

      let pElement = document.querySelectorAll("div > p")[0];

      while (pElement.firstChild) pElement.removeChild(pElement.firstChild);
      pElement.appendChild(
       document.createElement ("p") ( `  ${nameValue} 
            
            weather: ${descValue} 
                  
            speed's wind: ${wind} 

            temperature: ${temperature}°C
            
            
            humidity: ${humValue}%

          
           ` 
        )
      );
    });
});

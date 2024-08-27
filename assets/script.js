let apiKey = "cebcd482eda57fa9a6714c1c2ba91885";
const typingPlaceholderText = "Choose a place";

function typePlaceholder() {
    const searchInput = document.querySelector(".search");
    let index = 0;

    function type() {
        if (index < typingPlaceholderText.length) {
            searchInput.placeholder += typingPlaceholderText[index];
            index++;
            setTimeout(type, 150); 
        }
    }

    searchInput.placeholder = "";
    type();
}

function displayWeather(data) {
    console.log(data);
    document.querySelector(".third-background").style.display = "block";
    document.querySelector(".htxt").innerHTML = "Weather in " + data.name;
    document.querySelector(".temperature").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".climate").innerHTML = data.weather[0].description;
    document.querySelector(".img").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    document.querySelector(".humidity").innerHTML = "Humidity " + data.main.humidity + "%";
}

async function fetchCityWeather(city) {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&appid=" + 
    apiKey + 
    "&lang=en" +
    "&units=metric"
    );
    let data = await response.json();

    displayWeather(data);
}

document.querySelector(".button-search").addEventListener("click", function() {
    let city = document.querySelector(".search").value;
    fetchCityWeather(city);
});

document.addEventListener("DOMContentLoaded", typePlaceholder);

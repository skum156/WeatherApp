

const apiKey = '7441b308a66f466ddb6c353c74c8432f'; // Get this from OpenWeatherMap


function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found!");
                return;
            }
            const weatherInfo = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        })
        .catch(error => alert("Error fetching weather data"));
}


function showInfo() {
    alert("PM Accelerator - Innovative tech solutions for business growth. Visit our LinkedIn page for more details.");
}


fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        let forecastHTML = "<h3>5-Day Forecast:</h3>";
        data.list.slice(0, 5).forEach(item => {
            forecastHTML += `
                <p>${new Date(item.dt_txt).toLocaleString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>
            `;
        });
        document.getElementById('weatherInfo').innerHTML += forecastHTML;
    });
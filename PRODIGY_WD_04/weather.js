document.getElementById('getWeather').addEventListener('click', function() {
    let location = document.getElementById('location').value;
    let apiKey = '1ec73d8a2a62f1e77b85025a2e2e0aa9'; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let weatherOutput = document.getElementById('weatherOutput');
            if (data.cod === 200) {
                let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherOutput.innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                weatherOutput.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

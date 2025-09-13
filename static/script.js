document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const weatherCard = document.getElementById('weatherCard');
    const currentCity = document.getElementById('currentCity');
    const currentIcon = document.getElementById('currentIcon');
    const currentDescription = document.getElementById('currentDescription');
    const currentTemp = document.getElementById('currentTemp');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const visibility = document.getElementById('visibility');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const forecastContainer = document.getElementById('forecastContainer');

    // Helper: Animate weather card fade-in
    function fadeIn(element) {
        element.style.opacity = 0;
        element.classList.remove('d-none');
        let last = +new Date();
        const tick = function() {
            element.style.opacity = +element.style.opacity + (new Date() - last) / 300;
            last = +new Date();
            if (+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }

    // Function to display weather data
    function displayWeather(data) {
        // Update current weather
        currentCity.textContent = `${data.current.city}, ${data.current.country}`;
        currentIcon.src = `https://openweathermap.org/img/wn/${data.current.icon}@4x.png`;
        currentIcon.style.filter = "drop-shadow(0 4px 16px rgba(102,166,255,0.25))";
        currentDescription.textContent = data.current.description;
        currentTemp.textContent = data.current.temperature;
        feelsLike.textContent = `${data.current.feels_like}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        windSpeed.textContent = `${data.current.wind_speed} m/s`;
        visibility.textContent = `${data.current.visibility.toFixed(1)} km`;
        sunrise.textContent = data.current.sunrise_time;
        sunset.textContent = data.current.sunset_time;

        // Clear existing forecast items
        forecastContainer.innerHTML = '';

        // Add forecast items with card style and subtle animation
        data.forecast.forEach((day, i) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'col-12 col-md-6 forecast-item';
            dayElement.style.background = 'rgba(255,255,255,0.18)';
            dayElement.style.borderRadius = '18px';
            dayElement.style.margin = '10px 0';
            dayElement.style.boxShadow = '0 2px 12px rgba(102,166,255,0.10)';
            dayElement.style.padding = '14px 0 10px 0';
            dayElement.style.transition = 'transform 0.3s, box-shadow 0.3s';
            dayElement.style.opacity = '0';
            dayElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
                dayElement.style.opacity = '1';
                dayElement.style.transform = 'translateY(0)';
            }, 100 * i);

            // Format date (remove year and just show month/day)
            const dateObj = new Date(day.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });

            dayElement.innerHTML = `
                <div class="forecast-date" style="font-weight:600;color:#0984e3;">${formattedDate}</div>
                <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}" class="forecast-icon" style="margin:8px 0;filter:drop-shadow(0 2px 8px rgba(102,166,255,0.18));">
                <div class="forecast-temp" style="font-size:1.2em;font-weight:700;color:#222;">
                    ${Math.round(day.high)}°C / ${Math.round(day.low)}°C
                </div>
                <div class="forecast-desc" style="font-size:1em;color:#636e72;">${day.description}</div>
            `;

            forecastContainer.appendChild(dayElement);
        });

        // Show weather card with fade-in
        fadeIn(weatherCard);
        loading.classList.add('d-none');
        errorMessage.classList.add('d-none');
    }

    // Function to handle search
    async function searchWeather() {
        const city = cityInput.value.trim();

        if (!city) {
            showError('Please enter a city name');
            return;
        }

        // Show loading state
        loading.classList.remove('d-none');
        weatherCard.classList.add('d-none');
        errorMessage.classList.add('d-none');

        try {
            const response = await fetch(`/forecast?city=${encodeURIComponent(city)}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch weather data');
            }

            const data = await response.json();
            displayWeather(data);

        } catch (error) {
            showError(error.message);
        }
    }

    // Function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
        loading.classList.add('d-none');
        weatherCard.classList.add('d-none');
    }

    // Event listeners
    searchBtn.addEventListener('click', searchWeather);

    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });

    
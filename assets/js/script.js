
const htmlData = {
    button : document.querySelector('.submit-btn'),
    cityInput : document.querySelector('#city_name'),
    tempData : document.querySelector(".temp-data"),
    humadityData : document.querySelector(".humadity-data"),
    locationData : document.querySelector(".location-data"),
    feelsLike : document.querySelector(".feels-like-data"),
    weatherTitle : document.querySelector(".weather-title-data"),
    sunset : document.querySelector(".sunset-data"),
    sunrise : document.querySelector(".sunrise-data"),
    weatherIcon : document.querySelector(".weather-icon"),
};




const getWeatherData = (cityName = "Dhaka", units = "metric") => {
    const api_key = "b166da0adc6b8afcd15e2169e127785e"
    const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${api_key}`
    const requestedMethod = { method: "GET" }
    // let = result
    return fetch(base_url, requestedMethod)
        .then(response => response.json())
        .then(result =>   result)
        .catch(error => {
            console.log(error);
            return null;
        })
}

const updateWeatherInfo = (weatherData) => {
    htmlData.tempData.innerText = Math.round(weatherData.temp)
    htmlData.humadityData.innerText = Math.round(weatherData.humadity)
    htmlData.locationData.innerText = weatherData.city+", "+weatherData.country
    htmlData.feelsLike.innerText = Math.round(weatherData.feels_like)
    htmlData.weatherTitle.innerText = weatherData.weatherTitle
    htmlData.sunset.innerText = weatherData.sunset 
    htmlData.sunrise.innerText = weatherData.sunrise 
    htmlData.weatherIcon.src = weatherData.icon 
    
}


htmlData.button.addEventListener('click', ()=>{
    const weatherData = {}
    const openWeatherIconbaseUrl = "";
    getWeatherData(htmlData.cityInput.value)
        .then(result => {
            if (result.cod == 200) {
                const time1 = new Date(result.sys.sunrise);
                const time2 = new Date(result.sys.sunset);
                weatherData.temp = result.main.temp
                weatherData.humadity =  result.main.humidity
                weatherData.feels_like =  result.main.feels_like
                weatherData.city =  result.name
                weatherData.country =   result.sys.country
                weatherData.lat =  result.coord.lat
                weatherData.lon =  result.coord.lon
                weatherData.sunrise =  time1.toLocaleTimeString('en-US')
                weatherData.sunset =  time2.toLocaleTimeString('en-US')
                weatherData.weatherTitle =  result.weather[0].description
                weatherData.icon = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`
                updateWeatherInfo(weatherData)
                console.log(weatherData);
            }
    })
    .catch(error => {
        // Handle the error case
        console.log('Error:', error);
    });
    
})


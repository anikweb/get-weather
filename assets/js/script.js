const  button = document.querySelector('.submit-btn');
const cityInput = document.querySelector('#city_name');
const tempData = document.querySelector(".temp-data");
const humadityData = document.querySelector(".humadity-data");
const locationData = document.querySelector(".location-data");

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
    tempData.innerText = Math.round(weatherData.temp)
    humadityData.innerText = Math.round(weatherData.humadity)
    locationData.innerText = weatherData.city+", "+weatherData.country
}


button.addEventListener('click', ()=>{
    const weatherData = {}
    getWeatherData(cityInput.value)
        .then(result => {
            if (result.cod == 200) {
                weatherData.temp = result.main.temp
                weatherData.humadity =  result.main.humidity
                weatherData.feels_like =  result.main.pressure
                weatherData.city =  result.name
                weatherData.country =   result.sys.country
                weatherData.lat =  result.coord.lat
                weatherData.lon =  result.coord.lon
                weatherData.sunset =  result.sys.sunrise
                weatherData.sunset =  result.sys.sunset
                weatherData.weatherTitle =  result.weather[0].description
                weatherData.icon = result.weather[0].icon
                updateWeatherInfo(weatherData)
                console.log(result);
            }
    })
    .catch(error => {
        // Handle the error case
        console.log('Error:', error);
    });
    
})


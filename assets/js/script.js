const setCookie = (name,value,days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

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
    const options = { method: "GET" }

    return fetch(base_url, options)
        .then(response => response.json())
        .then(result =>   result)
        .catch(error => {
            console.log(error);
            return null;
        })
}

htmlData.button.addEventListener('click', ()=>{
    const openWeatherIconbaseUrl = "";
    getWeatherData(htmlData.cityInput.value)
        .then(result => {
            if (result.cod == 200) {
                // Destruct Object
                const { main,sys,coord,weather,wind,...res } = result
                const time1 = new Date(sys.sunrise);
                const time2 = new Date(sys.sunset);
                // Save Data to cookie
                setCookie('getWeather.temp', main.temp, 30);
                setCookie('getWeather.humadity', main.temp, 30);
                setCookie('getWeather.feels_like', main.feels_like, 30);
                setCookie('getWeather.city',  result.name, 30);
                setCookie('getWeather.country', sys.country, 30);
                setCookie('getWeather.lat', coord.lat, 30);
                setCookie('getWeather.lon', main.lon, 30);
                setCookie('getWeather.sunrise', time1.toLocaleTimeString('en-US'), 30);
                setCookie('getWeather.sunset', time2.toLocaleTimeString('en-US'), 30);
                setCookie('getWeather.weatherTitle', weather[0].description, 30);
                setCookie('getWeather.icon', `https://openweathermap.org/img/wn/${weather[0].icon}.png`, 30);
                updateWebsiteDatas();
            }
    })
    .catch(error => {
        // Handle the error case
        console.log('Error:', error);
    });
    
})
//  const cookieItems = {
//     currentLat : getCookie('getWeather.lat'),
//     currentLon : getCookie('getWeather.lon'),
//     currentSunrise : ,
//     currentSunset : ,
//     currentWeatherTitle : ,
//     currentWeatherIcon :
// };

const updateWebsiteDatas = () => {
    if (getCookie('getWeather.temp')) {
        htmlData.tempData.innerText = Math.round(getCookie('getWeather.temp'))
    }
    if (getCookie('getWeather.humadity')) {
        htmlData.humadityData.innerText = Math.round(getCookie('getWeather.humadity'))
    }
    if (getCookie('getWeather.feels_like')) {
        htmlData.feelsLike.innerText = Math.round(getCookie('getWeather.feels_like'))
    }
    if (getCookie('getWeather.city') && getCookie('getWeather.country')) {
        htmlData.locationData.innerText = getCookie('getWeather.city')+", "+getCookie('getWeather.country')
    } else if(getCookie('getWeather.city')) {
        htmlData.locationData.innerText = getCookie('getWeather.city')
    } else if (getCookie('getWeather.country')) {
        htmlData.locationData.innerText = getCookie('getWeather.country')
    }
    if (getCookie('getWeather.weatherTitle')) {
        htmlData.weatherTitle.innerText = getCookie('getWeather.weatherTitle')
    }
    if (getCookie('getWeather.sunset')) {
        htmlData.sunset.innerText = getCookie('getWeather.sunset')
    }
    if (getCookie('getWeather.sunrise')) {
        htmlData.sunrise.innerText = getCookie('getWeather.sunrise')
    }
    if (getCookie('getWeather.icon')) {
        htmlData.weatherIcon.src =  getCookie('getWeather.icon')
    }    
}


const getCityName = () => {
    // const apiBaseUrl = 
    const options = {
        method: "GET",
        mode: 'no-cors',
         
    }
    return  fetch('https://ipapi.co/json/',options)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            console.log(error)
            return null
        })

}

// Call the function to get the city name
getCityName().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
})



updateWebsiteDatas()



const getCurrentIp = () => {
    return fetch('https://api.ipify.org?format=json',{method: "GET"})
    .then(response=> response.json() )
    .then(result => result)
    .catch(error => {
        console.log(error);
        return null;
    })
}
const getCurrentCity = () => {
    getCurrentIp().then(result=> {
        const {ip} = result
        const getCityApiUrl = `https://ipapi.co/${ip}/json/`
        return fetch(getCityApiUrl,{method: "GET"})
        .then(response=> response.json() )
        .then(result => {
            const {city} = result
            console.log(city);
        })
        .catch(error => {
            console.log(error)
            return null
        })
        
    }).catch(error=> {
        console.log(error)
    })
    
}

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
    weatherWind : document.querySelector(".wind-data"),
    weatherLat : document.querySelector(".lat-data"),
    weatherLon : document.querySelector(".lon-data"),
    errorMessage : document.querySelector(".error-message"),
    loader: document.querySelector("#loader"),
    body : document.querySelector("body")
};

const getWeatherData = (cityName, units = "metric") => {
    const api_key = "b166da0adc6b8afcd15e2169e127785e"
    const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${api_key}`
    const options = { method: "GET" }
    return fetch(base_url, options)
        .then(response => response.json())
        .then(result =>   result)
        .catch(error => {
            console.log("error data");
        })
}

const setAllDataToCookie = (data) => {
    getWeatherData(data)
        .then(result => {
            if (result.cod == 200) {
                // remove error message if it have
                htmlData.cityInput.style.border = ""
                htmlData.errorMessage.innerText = ""
                // Destruct Object
                const { main,sys,coord,weather,wind,...res } = result
                const time1 = new Date(sys.sunrise);
                const time2 = new Date(sys.sunset);
                const time3 = new Date(21600);
                // Save Data to cookie
                setCookie('getWeather.temp', main.temp, 30);
                setCookie('getWeather.humadity', main.temp, 30);
                setCookie('getWeather.feels_like', main.feels_like, 30);
                setCookie('getWeather.city',  result.name, 30);
                setCookie('getWeather.country', sys.country, 30);
                setCookie('getWeather.lat', coord.lat, 30);
                setCookie('getWeather.lon', coord.lon, 30);
                setCookie('getWeather.sunrise', time1.toLocaleTimeString('en-US'), 30);
                setCookie('getWeather.sunset', time2.toLocaleTimeString('en-US'), 30);
                setCookie('getWeather.weatherTitle', weather[0].main, 30);
                setCookie('getWeather.icon', `https://openweathermap.org/img/wn/${weather[0].icon}.png`, 30);
                setCookie('getWeather.wind', wind.speed, 30);
                updateWebsiteDatas();
            } else if (result.cod == 404) {
                setTimeout(() => {
                    preloader('false');
                    htmlData.cityInput.style.border = "2px solid red"
                    htmlData.errorMessage.innerText = "😢 Please Enter Valid Input"
                }, 100);
                
            }
          
    })
    .catch(error => {
        // Handle the error case
        console.log(error);
    });
}

htmlData.button.addEventListener('click', () => {  
    preloader('true');
    if (htmlData.cityInput.value) {
        setAllDataToCookie(htmlData.cityInput.value)
    } else {
       preloader('false');
    }
    
})

const updateWebsiteDatas = (websiteload = "no") => {
    const update = () => {
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
            if (getCookie('getWeather.wind')) {
                htmlData.weatherWind.innerText = getCookie('getWeather.wind')
            } 
            if (getCookie('getWeather.lon')) {
                htmlData.weatherLon.innerText = getCookie('getWeather.lon')
            } 
            if (getCookie('getWeather.lat')) {
                htmlData.weatherLat.innerText = getCookie('getWeather.lat')
            } 
            console.log();
        
        htmlData.body.style.backgroundImage = `url('assets/img/${getCookie('getWeather.weatherTitle')}.jpg')`
        htmlData.body.style.backgroundSize = "cover"
        htmlData.body.style.backgroundPosition = "center center"
        htmlData.body.style.backgroundAttachment = "fixed"
    }
    if (websiteload == "no") {
        setTimeout(() => {
               update()
            preloader('false');
       }, 500);
    } else {
        update()
    }
    
}

const preloader = (isTrue) => {
    if (isTrue == "true") {
        htmlData.loader.classList.value = "";
    } else {
        htmlData.loader.classList.value = "d-none";
    }
}

if (!getCookie('getWeather.city')) {
    preloader('true');
    setAllDataToCookie(getCurrentCity())    
}
updateWebsiteDatas("yes")





    



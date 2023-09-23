const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


let currentTab = userTab;
const API_KEY = ""
currentTab.classList.add("current-tab");

userTab.addEventListener('click', () => {
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});

function switchTab(clickedtab){
    if(clickedtab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedtab;
        currentTab.classList.add("current-tab")

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active")
        } else {
            searchForm.classList.remove("active")
            userInfoContainer.classList.remove("active")
            getfromSessionStorage();
        }
    }
}

//check if cordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates")
    if(!localCoordinates){
        //if there are no local cordinates (this means you didnt give location access)
        grantAccessContainer.classList.add("active")
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    //make grantcontainer invisible and show loading...
    grantAccessContainer.classList.remove("active")
    //show loading..
    loadingScreen.classList.add("active")

    //api call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        )

        const data = await response.json();
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active");
        rendWeatherInfo(data)
    }
    catch(err){
        
    }

}

function rendWeatherInfo(data){
    const cityName = document.querySelector("[data-cityName]")
    const country = document.querySelector("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windspeed= document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]")

    //fetch values from data and put in ui elements
    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = data?.main?.temp;
    windspeed.innerText = data?.wind?.speed;
    humidity.innerText = data?.main?.humidity;
    cloudiness.innerText = data?.clouds?.all;
}

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        alert("Your browser doesnt support geo location")
    }
}
function showPosition(position){
    const userCoordinates = {
        lat: position.coordinates.latitude,
        lon: position.coordinates.longitude,
    }

    sessionStorage.setItem("user-cordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates)
}
const grandAccessbtn = document.querySelector("[data-grandAccess]");
grandAccessbtn.addEventListener('click', getlocation)

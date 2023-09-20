const API_KEY = "your api key";


function renderWeatherData(data){
    let newPara = document.createElement("p");
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;

    document.body.appendChild(newPara);
}


async function fetchWeatherDetails() {
    try {
        let city = "goa";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        // console.log("weather Data:->", data);
        renderWeatherData(data);

        render
    } catch (err) {
        //error should be handled here
    }
}

async function getCustomWeatherDetails(){
   try{
    let lat = 15.6333;
    let lon = 18.3333;

    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    let data = await result.json()

    console.log(data);
   }
   catch(err){
    console.log("error found", err);
   }
}




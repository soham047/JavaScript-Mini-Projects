document.addEventListener("DOMContentLoaded", function(){
    const cityInput = document.getElementById("cityInput");
    const srchBtn = document.getElementById("srchBtn");
    const otp = document.getElementById("otp");
    const city = document.getElementById("city");
   // const cnt = document.getElementById("cnt");
    const wthr = document.getElementById("weather");
    const temp = document.getElementById("temp");
    const err = document.getElementById("Error");

    const API_KEY = "534a71684b23c6e3c0f5901752265d0e";

    srchBtn.addEventListener("click", async function() {
        otp.classList.add("hidden");
        err.classList.add("hidden");
        n = cityInput.value.trim();
        if (n){
            data = await getWeather(n);
            showWeather(data);
        }
        else{
            showError();
        }
    });

    async function getWeather(name){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`;
        try{
            const d = await fetch(url);
            if (d){
                const json_d = await d.json();
                return json_d;
            }
            else{
                showError();
            }
        }
        catch(er){
            showError();
        }
        
    }

    function showWeather(data){

        console.log(data)
        const {main, name, weather} = data;
        city.textContent = `City : ${name}`;
        temp.textContent = `Temperature : ${main.temp - 273.15} °C`;
        wthr.textContent = `Weather : ${weather[0].description}`;

        err.classList.add("hidden");
        otp.classList.remove("hidden");
    }

    function showError(){
        err.classList.remove("hidden");
    }

});
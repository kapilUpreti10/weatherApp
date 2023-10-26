const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey="6e0966ac3cf31a17d2a1611318505c8f";
let searchByCityName=document.querySelector("#search");
const cityName=document.querySelector(".cityName");
const windSpeed=document.querySelector(".windSpeed");
const humidity=document.querySelector(".humidity");
const temperature=document.querySelector(".temp");
const searchButton=document.querySelector("#searchButton");
const weatherImg=document.querySelector("#weatherImg");
const weatherInfoArea=document.querySelector(".weatherInfoArea");
let city="kathmandu";

    searchButton.addEventListener('click',async()=>{

        city= await searchByCityName.value;
        weatherUpdate();//here hamile function ya kna call garako vanda due to asynchronous nature hamro jaba samma button click hunna tabasamma mero city value update hunna tra talako code tw run huna thalxa so we should wait to call weatherUpdate until we click searchbutton and update the value


    })

    // enter press garda ni search hune banako
    // ya kina searchbycityname ma event listener add gareko vanda jaba kunai userle cityname lekhesi lastma enter click that enter is written within the input feild 

    searchByCityName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});





    async function weatherUpdate(){

try{
    const response= await fetch(apiurl+`${city}`+`&appid=${apiKey}`)
    const value=await response.json();

    console.log(value);
    searchByCityName.value="";

    // weathericon updating 
    if(value.weather[0].main=="Clouds"){
        weatherImg.src="weather-app-img/images/clouds.png"
 }
    else if(value.weather[0].main=="Clear"){
        weatherImg.src="weather-app-img/images/clear.png"
    }
 else if(value.weather[0].main=="Rain"){
        weatherImg.src="weather-app-img/images/rain.png"
 }
    else if(value.weather[0].main=="Drizzle"){
        weatherImg.src="weather-app-img/images/drizzle.png"
 } 
 else{
    weatherImg.src="weather-app-img/images/mist.png"
 }


    console.log(value.name);
    // console.log(value.main.temp);
    // console.log(value.wind.speed);
    //console.log(value.main.humidity);
    
    cityName.innerText=`${value.name}`;
    windSpeed.innerText=`${value.wind.speed}km/hr`;
   humidity.innerText=`${value.main.humidity}%`;
   temperature.innerText=`${(value.main.temp)}°C`;

}
catch(error){
    cityName.innerText="Invalid city name"
    windSpeed.innerText="";
    humidity.innerText="";
    temperature.innerText="";
    weatherImg.src="";

}

}

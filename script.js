let weather = new XMLHttpRequest();
weather.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Kyiv,ua&APPID=177a2dafe5bdf782bfe0e2c9dc779c47", false);
weather.send(null);
let res = JSON.parse(weather.response);

let dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    
];
let monthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let weatherIcons = [
    {key:"clear sky", value:"https://image.flaticon.com/icons/svg/1113/1113774.svg"},
    {key:"few clouds", value:"https://image.flaticon.com/icons/svg/1113/1113775.svg"},
    {key:"scattered clouds", value:"https://image.flaticon.com/icons/svg/178/178338.svg"},
    {key:"broken clouds", value:"https://www.flaticon.com/premium-icon/icons/svg/178/178346.svg"},
    {key:"overcast clouds", value:"https://www.flaticon.com/premium-icon/icons/svg/178/178346.svg"},
    {key:"light rain", value:"https://image.flaticon.com/icons/svg/1113/1113767.svg"},
    {key:"shower rain", value:"https://image.flaticon.com/icons/svg/1113/1113769.svg"},
    {key:"moderate rain", value:"https://image.flaticon.com/icons/svg/365/365224.svg"},
    {key:"rain", value:"https://image.flaticon.com/icons/svg/1113/1113757.svg"},
    {key:"thunderstorm", value:"https://image.flaticon.com/icons/svg/1113/1113780.svg"},
    {key:"snow", value:"https://image.flaticon.com/icons/svg/1113/1113773.svg"},
    {key:"mist", value:"https://image.flaticon.com/icons/svg/1113/1113758.svg"}
]
let weatherByDate = []
let counter = 40;
let num = 1;
let name = "";

$("#city").append("Weather forecast for " + res.city.name + " for 5 days");

for (let i = 0; i < res.list.length; i++) {
    let onePeriod = res.list[i];
    let dt = new Date(onePeriod.dt*1000);
    let day = dayArr[dt.getDay()];
    let date = dt.getDate();
    let month = monthsArr[dt.getMonth()];
    let year = dt.getFullYear();
    let hours = onePeriod.dt_txt.substr(11, 5);
    let d = date + " " + month + " " + year + ",<br>" + day + " " + hours;

    var imageSrc = "";
    
    weatherIcons.forEach(icon => {
        if(icon.key == onePeriod.weather[0].description)
            imageSrc = icon.value;
    });

    let today = new Date();
    
    
    if(today.getDate() === dt.getDate()){
        if($("#current-day-block").length == 0){
            $("body").append('<div class="block-one-day" id="current-day-block"></div>');
        }
        $("#current-day-block").append('<div id="block-hours"><h6 id="date">' + d + '</h6><img id="icon" src="' + imageSrc + '"><hr><div id="temp-block">' +
            '<img id="temp-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113779.svg"><p id="temp-txt">' + Math.round(onePeriod.main.temp - 273.15) + ' C</p>' +
            '</div><div id="humidity-block"><img id="humidity-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113760.svg">' + 
            '<p id="humidity-txt">' + onePeriod.main.humidity + ' %</p></div><div id="wind-block"><img id="wind-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113787.svg">' + 
            '<p id="wind-txt">' + onePeriod.wind.speed + ' m/sec</p></div></div>');
    }
    
    else{
        if(counter % 8 === 0){
            name = "block-one-day" + num;
            if($("#" + name).length == 0){
                $("body").append('<div id="' + name +'" class="block-one-day"></div>');
                num++;
            }
        }
        $("#" + name).append('<div id="block-hours"><h6 id="date">' + d + '</h6><img id="icon" src="' + imageSrc + '"><hr><div id="temp-block">' +
            '<img id="temp-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113779.svg"><p id="temp-txt">' + Math.round(onePeriod.main.temp - 273.15) + ' C</p>' +
            '</div><div id="humidity-block"><img id="humidity-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113760.svg">' + 
            '<p id="humidity-txt">' + onePeriod.main.humidity + ' %</p></div><div id="wind-block"><img id="wind-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113787.svg">' + 
            '<p id="wind-txt">' + onePeriod.wind.speed + ' m/sec</p></div></div>');
        counter--;
    }
}
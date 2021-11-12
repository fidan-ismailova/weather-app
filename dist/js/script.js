function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
document.querySelector(".year").textContent = "\xA9 " + new Date().getFullYear();
fetch('http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=70e1ed322b02acbc57d443dd91065f3e&units=metric').then(function (resp) {
  return resp.json();
}).then(function (data) {
  console.log(data);
  var wind = data.wind.deg;
  var windAbbr = ''; // const deg = [], degAve = 5.625;
  // for (let i = 0; i < deg.length; i++) {
  //     deg[i].push(i * degAve * 2);
  //     if(deg[i] == 360) break;
  // }    //function...

  if (wind > 354.375 && wind < 5.625) windAbbr = 'N';else if (wind > 5.625 && wind < 16.875) windAbbr = 'NbE';else if (wind > 16.875 && wind < 28.125) windAbbr = 'NNE';else if (wind > 28.125 && wind < 39.375) windAbbr = 'NEbN';else if (wind > 39.375 && wind < 50.625) windAbbr = 'NE';else if (wind > 50.625 && wind < 61.875) windAbbr = 'NEbE';else if (wind > 61.875 && wind < 73.125) windAbbr = 'ENE';else if (wind > 73.125 && wind < 84.375) windAbbr = 'EbN';else if (wind > 84.375 && wind < 95.625) windAbbr = 'E';else if (wind > 95.625 && wind < 106.875) windAbbr = 'EbS';else if (wind > 106.875 && wind < 118.125) windAbbr = 'ESE';else if (wind > 118.125 && wind < 129.375) windAbbr = 'SEbE';else if (wind > 129.375 && wind < 140.625) windAbbr = 'SE';else if (wind > 140.625 && wind < 151.875) windAbbr = 'SEbS';else if (wind > 151.875 && wind < 163.125) windAbbr = 'SSE';else if (wind > 163.125 && wind < 174.375) windAbbr = 'SbE';else if (wind > 174.375 && wind < 185.625) windAbbr = 'S';else if (wind > 185.625 && wind < 196.875) windAbbr = 'SbW';else if (wind > 196.875 && wind < 208.125) windAbbr = 'SSW';else if (wind > 208.125 && wind < 219.375) windAbbr = 'SWbS';else if (wind > 219.375 && wind < 230.625) windAbbr = 'SW';else if (wind > 230.625 && wind < 241.875) windAbbr = 'SWbW';else if (wind > 241.875 && wind < 253.125) windAbbr = 'WSW';else if (wind > 253.125 && wind < 264.375) windAbbr = 'WbS';else if (wind > 264.375 && wind < 275.625) windAbbr = 'W';else if (wind > 275.625 && wind < 286.875) windAbbr = 'WbN';else if (wind > 286.875 && wind < 298.125) windAbbr = 'WNW';else if (wind > 298.125 && wind < 309.375) windAbbr = 'NWbW';else if (wind > 309.375 && wind < 320.625) windAbbr = 'NW';else if (wind > 320.625 && wind < 331.875) windAbbr = 'NWbN';else if (wind > 331.875 && wind < 343.125) windAbbr = 'NNW';else if (wind > 343.125 && wind < 354.375) windAbbr = 'NbW'; //https://www.surfertoday.com/windsurfing/how-to-read-wind-direction

  document.querySelector('.card__title').textContent = data.name;
  document.querySelector('.card__temp').innerHTML = Math.ceil(data.main.temp) + '&deg;C';
  document.querySelectorAll('.card__desc')[0].textContent = data.weather[0]['description'];
  document.querySelectorAll('.card__desc')[1].innerHTML = "Feels like: ".concat(Math.ceil(data.main.feels_like), "&deg;C");
  document.querySelectorAll('.card__desc')[2].innerHTML = "Wind: \n            <svg style=\"transform: rotate(".concat(wind + 180, "deg); height: 8pt;\" viewBox=\"0 0 1000 1000\" enable-background=\"new 0 0 1000 1000\" xml:space=\"preserve\">\n                <g fill=\"#48484a\">\n                    <path d=\"M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z\"></path>\n                    <path d=\"M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z\"></path>\n                </g>\n            </svg>\n            ").concat(data.wind.speed, "m/s ").concat(windAbbr);
  document.querySelectorAll('.card__desc')[3].innerHTML = "Humidity: ".concat(data.main.humidity, "%");
  document.querySelector('.card__icon').innerHTML = "<img src=\"https://openweathermap.org/img/wn/".concat(data.weather[0]['icon'], "@4x.png\">");
})["catch"](function (error) {
  console.error('Error: ', error);
});
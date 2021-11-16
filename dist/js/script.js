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
var winds = [{
  id: 1,
  name: "North",
  abbr: "N",
  deg: 0
}, {
  id: 2,
  name: "North by East",
  abbr: "NbE",
  deg: 11.25
}, {
  id: 3,
  name: "North-Northeast",
  abbr: "NNE",
  deg: 22.5
}, {
  id: 4,
  name: "Northeast by North",
  abbr: "NEbN",
  deg: 33.75
}, {
  id: 5,
  name: "Northeast",
  abbr: "NE",
  deg: 45
}, {
  id: 6,
  name: "Northeast by East",
  abbr: "NEbE",
  deg: 56.25
}, {
  id: 7,
  name: "East-Northeast",
  abbr: "ENE",
  deg: 67.5
}, {
  id: 8,
  name: "East by North",
  abbr: "EbN",
  deg: 78.75
}, {
  id: 9,
  name: "East",
  abbr: "E",
  deg: 90
}, {
  id: 10,
  name: "East by South",
  abbr: "EbS",
  deg: 101.25
}, {
  id: 11,
  name: "East-Southeast",
  abbr: "ESE",
  deg: 112.5
}, {
  id: 12,
  name: "Southeast by East",
  abbr: "SEbE",
  deg: 123.75
}, {
  id: 13,
  name: "Southeast",
  abbr: "SE",
  deg: 135
}, {
  id: 14,
  name: "Southeast by South",
  abbr: "SEbS",
  deg: 146.25
}, {
  id: 15,
  name: "South-Southeast",
  abbr: "SSE",
  deg: 157.5
}, {
  id: 16,
  name: "South by East",
  abbr: "SbE",
  deg: 168.75
}, {
  id: 17,
  name: "South",
  abbr: "S",
  deg: 180
}, {
  id: 18,
  name: "South by West",
  abbr: "SbW",
  deg: 191.25
}, {
  id: 19,
  name: "South-Southwest",
  abbr: "SSW",
  deg: 202.5
}, {
  id: 20,
  name: "Southwest by South",
  abbr: "SWbS",
  deg: 213.75
}, {
  id: 21,
  name: "Southwest",
  abbr: "SW",
  deg: 225
}, {
  id: 22,
  name: "Southwest by West",
  abbr: "SWbW",
  deg: 236.25
}, {
  id: 23,
  name: "West-Southwest",
  abbr: "WSW",
  deg: 247.5
}, {
  id: 24,
  name: "West by South",
  abbr: "WbS",
  deg: 258.75
}, {
  id: 25,
  name: "West",
  abbr: "W",
  deg: 270
}, {
  id: 26,
  name: "West by North",
  abbr: "WbN",
  deg: 281.25
}, {
  id: 27,
  name: "West-Northwest",
  abbr: "WNW",
  deg: 292.5
}, {
  id: 28,
  name: "Northwest by West",
  abbr: "NWbW",
  deg: 303.75
}, {
  id: 29,
  name: "Northwest",
  abbr: "NW",
  deg: 315
}, {
  id: 30,
  name: "Northwest by North",
  abbr: "NWbN",
  deg: 326.25
}, {
  id: 31,
  name: "North-Northwest",
  abbr: "NNW",
  deg: 337.5
}, {
  id: 32,
  name: "North by West",
  abbr: "NbW",
  deg: 348.75
}, {
  id: 33,
  name: "North",
  abbr: "N",
  deg: 360
}]; //https://www.surfertoday.com/windsurfing/how-to-read-wind-direction

var getWind = function getWind(deg) {
  for (var i = 0; i < winds.length; i++) {
    if (deg > winds[i].deg - 5.625 && deg < winds[i].deg + 5.625) return winds[i].abbr;
  }
};

var url = 'http://api.openweathermap.org/data/2.5/';
var appid = '964803496e3c6de740a91f74c80c8273'; // API key

var lang = 'en';
var cityId = '2643743'; // London -> default id city for card

var units = 'metric';
var temp = '',
    speed = '',
    hum = '';

switch (units) {
  case 'standard':
    temp = '&nbsp;K';
    speed = '&nbsp;m/s';
    hum = '&nbsp;%';
    break;

  case 'metric':
    temp = '&nbsp;&deg;C';
    speed = '&nbsp;m/s';
    hum = '&nbsp;%';
    break;

  case 'imperial':
    temp = '&nbsp;&deg;F';
    speed = '&nbsp;mph';
    hum = '&nbsp;%';
    break;
}

var getWeather = function getWeather() {
  return fetch("".concat(url, "weather?id=").concat(cityId, "&appid=").concat(appid, "&units=").concat(units, "&lang=").concat(lang)).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    document.querySelector('.card__date').textContent = '<date::time>';
    document.querySelector('.card__title').textContent = data.name;
    document.querySelector('.card__temp').innerHTML = Math.ceil(data.main.temp) + temp;
    document.querySelectorAll('.card__desc')[0].textContent = data.weather[0]['description'];
    document.querySelectorAll('.card__desc')[1].innerHTML = "<svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" preserveAspectRatio=\"xMidYMid meet\"><path d=\"M26 30h-4a2.006 2.006 0 0 1-2-2v-7a2.006 2.006 0 0 1-2-2v-6a2.946 2.946 0 0 1 3-3h6a2.946 2.946 0 0 1 3 3v6a2.006 2.006 0 0 1-2 2v7a2.006 2.006 0 0 1-2 2zm-5-18a.945.945 0 0 0-1 1v6h2v9h4v-9h2v-6a.945.945 0 0 0-1-1z\" fill=\"\"></path><path d=\"M24 9a4 4 0 1 1 4-4a4.012 4.012 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.006 2.006 0 0 0-2-2z\" fill=\"\"></path><path d=\"M10 20.184V12H8v8.184a3 3 0 1 0 2 0z\" fill=\"\"></path><path d=\"M9 30a6.993 6.993 0 0 1-5-11.89V7a5 5 0 0 1 10 0v11.11A6.993 6.993 0 0 1 9 30zM9 4a3.003 3.003 0 0 0-3 3v11.983l-.332.299a5 5 0 1 0 6.664 0L12 18.983V7a3.003 3.003 0 0 0-3-3z\" fill=\"\"></path></svg>\n            Feels like: ".concat(Math.ceil(data.main.feels_like) + temp);
    document.querySelectorAll('.card__desc')[2].innerHTML = "<svg viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"\" d=\"M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z\"></path></svg>\n            Wind: \n            <svg style=\"transform: rotate(".concat(data.wind.deg + 180, "deg); height: 8pt; top: 0; margin: 0;\" viewBox=\"0 0 1000 1000\" enable-background=\"new 0 0 1000 1000\" xml:space=\"preserve\"><g fill=\"#48484A\"><path d=\"M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z\"></path><path d=\"M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z\"></path></g></svg>\n            ").concat(data.wind.speed + speed, " &nbsp; ").concat(getWind(data.wind.deg));
    document.querySelectorAll('.card__desc')[3].innerHTML = "<svg viewBox=\"0 0 384 512\" aria-hidden=\"true\" focusable=\"false\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"\" d=\"M223.9 22.1c-8.7-28.8-53.9-30.1-63.8 0C109.1 179.8 0 222.7 0 333.9 0 432.3 85.9 512 192 512s192-79.7 192-178.1c0-111.7-108.9-153.3-160.1-311.8zM96 288c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm49.5 131.8c-2.8 3.5-7.8 4-11.2 1.2l-12.5-10c-3.4-2.8-4-7.8-1.2-11.2l118-147.5c2.8-3.4 7.8-4 11.2-1.2l12.5 10c3.5 2.8 4 7.8 1.2 11.2l-118 147.5zM256 416c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z\"></path></svg>\n            Humidity: ".concat(data.main.humidity + hum);
    document.querySelector('.card__icon').innerHTML = "<img src=\"https://openweathermap.org/img/wn/".concat(data.weather[0]['icon'], "@4x.png\">");
  })["catch"](function (error) {
    console.error('Error: ', error);
  });
};

getWeather();
var citiesList = "https://fidan-ismailova.github.io/database/openweathermap/city.list.min.json";
fetch(citiesList).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var country = 'AZ';
  var out = '';

  for (var i = 0; i < data.length; i++) {
    if (data[i]['country'] == country) // один из вариантов быстрой загрузки
      out += "<option class=\"city\" value=\"".concat(data[i]['name'], "\" id=\"").concat(data[i]['id'], "\">").concat(data[i]['name'], ", ").concat(data[i]['country'], "</option>");
  }

  ;
  document.querySelector('#cities').innerHTML = out;
  var getCityId = document.querySelector('#search');
  var searchPlaceholder = getCityId.placeholder = "Search city... (".concat(country, ")");
  getCityId.addEventListener('focus', function () {
    this.removeAttribute("placeholder");
  });
  getCityId.addEventListener('blur', function () {
    this.setAttribute("placeholder", searchPlaceholder);
  });
  var city = document.querySelectorAll('.city');

  var _loop = function _loop(_i) {
    getCityId.addEventListener('input', function () {
      if (city[_i].value == this.value) {
        cityId = city[_i].id;
        return getWeather();
      }
    });
  };

  for (var _i = 0; _i < city.length; _i++) {
    _loop(_i);
  }
})["catch"](function (err) {
  console.error('Error: ', err);
});
document.querySelector(".year").textContent = "\xA9 " + new Date().getFullYear();
fetch('http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=70e1ed322b02acbc57d443dd91065f3e&units=metric')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);

        let wind = data.wind.deg;
        let windAbbr = '';
        // const deg = [], degAve = 5.625;
        // for (let i = 0; i < deg.length; i++) {
        //     deg[i].push(i * degAve * 2);
        //     if(deg[i] == 360) break;
        // }    //function...
        if(wind > 354.375 && wind < 5.625) windAbbr = 'N';
        else if(wind > 5.625 && wind < 16.875) windAbbr = 'NbE';
        else if(wind > 16.875 && wind < 28.125) windAbbr = 'NNE';
        else if(wind > 28.125 && wind < 39.375) windAbbr = 'NEbN';
        else if(wind > 39.375 && wind < 50.625) windAbbr = 'NE';
        else if(wind > 50.625 && wind < 61.875) windAbbr = 'NEbE';
        else if(wind > 61.875 && wind < 73.125) windAbbr = 'ENE';
        else if(wind > 73.125 && wind < 84.375) windAbbr = 'EbN';
        else if(wind > 84.375 && wind < 95.625) windAbbr = 'E';
        else if(wind > 95.625 && wind < 106.875) windAbbr = 'EbS';
        else if(wind > 106.875 && wind < 118.125) windAbbr = 'ESE';
        else if(wind > 118.125 && wind < 129.375) windAbbr = 'SEbE';
        else if(wind > 129.375 && wind < 140.625) windAbbr = 'SE';
        else if(wind > 140.625 && wind < 151.875) windAbbr = 'SEbS';
        else if(wind > 151.875 && wind < 163.125) windAbbr = 'SSE';
        else if(wind > 163.125 && wind < 174.375) windAbbr = 'SbE';
        else if(wind > 174.375 && wind < 185.625) windAbbr = 'S';
        else if(wind > 185.625 && wind < 196.875) windAbbr = 'SbW';
        else if(wind > 196.875 && wind < 208.125) windAbbr = 'SSW';
        else if(wind > 208.125 && wind < 219.375) windAbbr = 'SWbS';
        else if(wind > 219.375 && wind < 230.625) windAbbr = 'SW';
        else if(wind > 230.625 && wind < 241.875) windAbbr = 'SWbW';
        else if(wind > 241.875 && wind < 253.125) windAbbr = 'WSW';
        else if(wind > 253.125 && wind < 264.375) windAbbr = 'WbS';
        else if(wind > 264.375 && wind < 275.625) windAbbr = 'W';
        else if(wind > 275.625 && wind < 286.875) windAbbr = 'WbN';
        else if(wind > 286.875 && wind < 298.125) windAbbr = 'WNW';
        else if(wind > 298.125 && wind < 309.375) windAbbr = 'NWbW';
        else if(wind > 309.375 && wind < 320.625) windAbbr = 'NW';
        else if(wind > 320.625 && wind < 331.875) windAbbr = 'NWbN';
        else if(wind > 331.875 && wind < 343.125) windAbbr = 'NNW';
        else if(wind > 343.125 && wind < 354.375) windAbbr = 'NbW';
//https://www.surfertoday.com/windsurfing/how-to-read-wind-direction
        document.querySelector('.card__title').textContent = data.name;
        document.querySelector('.card__temp').innerHTML = Math.ceil(data.main.temp) + '&deg;C';
        document.querySelectorAll('.card__desc')[0].textContent = data.weather[0]['description'];
        document.querySelectorAll('.card__desc')[1].innerHTML = 
            `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                <path d="M26 30h-4a2.006 2.006 0 0 1-2-2v-7a2.006 2.006 0 0 1-2-2v-6a2.946 2.946 0 0 1 3-3h6a2.946 2.946 0 0 1 3 3v6a2.006 2.006 0 0 1-2 2v7a2.006 2.006 0 0 1-2 2zm-5-18a.945.945 0 0 0-1 1v6h2v9h4v-9h2v-6a.945.945 0 0 0-1-1z" fill=""></path>
                <path d="M24 9a4 4 0 1 1 4-4a4.012 4.012 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.006 2.006 0 0 0-2-2z" fill=""></path>
                <path d="M10 20.184V12H8v8.184a3 3 0 1 0 2 0z" fill=""></path>
                <path d="M9 30a6.993 6.993 0 0 1-5-11.89V7a5 5 0 0 1 10 0v11.11A6.993 6.993 0 0 1 9 30zM9 4a3.003 3.003 0 0 0-3 3v11.983l-.332.299a5 5 0 1 0 6.664 0L12 18.983V7a3.003 3.003 0 0 0-3-3z" fill=""></path>
            </svg>
            Feels like: ${Math.ceil(data.main.feels_like)}&deg;C`;
        document.querySelectorAll('.card__desc')[2].innerHTML = 
            `<svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
                <path fill="" d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"></path>
            </svg>
            Wind: 
            <svg style="transform: rotate(${wind+180}deg); height: 8pt; top: 0; margin: 0;" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g fill="#48484A">
                    <path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path>
                    <path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path>
                </g>
            </svg>
            ${data.wind.speed}m/s ${windAbbr}`;
        document.querySelectorAll('.card__desc')[3].innerHTML = 
            `<svg viewBox="0 0 384 512" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
                <path fill="" d="M223.9 22.1c-8.7-28.8-53.9-30.1-63.8 0C109.1 179.8 0 222.7 0 333.9 0 432.3 85.9 512 192 512s192-79.7 192-178.1c0-111.7-108.9-153.3-160.1-311.8zM96 288c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm49.5 131.8c-2.8 3.5-7.8 4-11.2 1.2l-12.5-10c-3.4-2.8-4-7.8-1.2-11.2l118-147.5c2.8-3.4 7.8-4 11.2-1.2l12.5 10c3.5 2.8 4 7.8 1.2 11.2l-118 147.5zM256 416c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>
            </svg>
            Humidity: ${data.main.humidity}%`;
        document.querySelector('.card__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;
    })
    .catch(function (error) {
        console.error('Error: ', error);
    });
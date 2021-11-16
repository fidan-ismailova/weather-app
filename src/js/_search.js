let citiesList = `https://fidan-ismailova.github.io/database/openweathermap/city.list.min.json`;

fetch(citiesList)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        let country = 'AZ';
        let out = '';
        for (let i = 0; i < data.length; i++) {
            if(data[i]['country'] == country) // один из вариантов быстрой загрузки
            out += `<option class="city" value="${data[i]['name']}" id="${data[i]['id']}">${data[i]['name']}, ${data[i]['country']}</option>`;
        };
        document.querySelector('#cities').innerHTML = out;
        
        let getCityId = document.querySelector('#search');
        let searchPlaceholder = getCityId.placeholder = `Search city... (${country})`;
        getCityId.addEventListener('focus', function() {
            this.removeAttribute("placeholder");
        });
        getCityId.addEventListener('blur', function() {
            this.setAttribute("placeholder", searchPlaceholder);
        });

        let city = document.querySelectorAll('.city');
        for (let i = 0; i < city.length; i++) {
            getCityId.addEventListener('input', function() {
                if(city[i].value == this.value) {
                    cityId = city[i].id;
                    return getWeather();
                }
            });
        }
    })
    .catch(function (err) {
        console.error('Error: ', err);
    });
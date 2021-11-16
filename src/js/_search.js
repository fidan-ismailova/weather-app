let citiesList = `https://fidan-ismailova.github.io/database/openweathermap/city.list.min.json`;

fetch(citiesList)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        let out = '';
        for (let i = 0; i < data.length; i++) {
            // one of the fast boot options -> otherwise freezes!!!
            if(data[i]['country'] == 'AZ' || data[i]['country'] == 'GE' || 
            data[i]['name'] == 'London' || data[i]['name'] == 'Moscow')
            out += `<option class="city" value="${data[i]['name']}, ${data[i]['country']} (${data[i]['id']})" id="${data[i]['id']}">${data[i]['name']}</option>`;
        };
        document.querySelector('#cities').innerHTML = out;
        
        let getCityId = document.querySelector('#search');
        let searchPlaceholder = getCityId.placeholder = `Search city...`;
        getCityId.addEventListener('focus', function() {
            this.removeAttribute("placeholder");
        });
        getCityId.addEventListener('blur', function() {
            this.setAttribute("placeholder", searchPlaceholder);
        });

        let city = document.querySelectorAll('.city');
        getCityId.addEventListener('input', function() {
            for (let i = 0; i < city.length; i++) {
                if(this.value == city[i].value) {
                    cityId = city[i].id;
                    return getWeather();
                }
            }
        });
    })
    .catch(function (err) {
        console.error('Error: ', err);
    });
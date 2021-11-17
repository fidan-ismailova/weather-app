let citiesList = `https://fidan-ismailova.github.io/database/openweathermap/city.list.min.json`;

let getCityId = document.querySelector('#search');
getCityId.value = '';
let searchPlaceholder = getCityId.placeholder = `Search city...`;
getCityId.addEventListener('focus', function() {
    this.removeAttribute("placeholder");
});
getCityId.addEventListener('blur', function() {
    this.setAttribute("placeholder", searchPlaceholder);
});

let dataList = document.querySelector('#cities');
let option;

fetch(citiesList)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            // one of the fast boot options -> otherwise freezes!!!
            if(data[i]['name'] == 'London' || data[i]['name'] == 'Moscow' || 
                data[i]['country'] == 'AZ' || data[i]['country'] == 'GE')
            {
                option = document.createElement('option');
                option.classList.add('city');
                option.id = data[i]['id'];
                option.value = `${data[i]['name']}, ${data[i]['country']} (${data[i]['id']})`;
                option.textContent = `${data[i]['name']} - ${data[i]['country']}`;
                dataList.append(option);
            }
        };

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
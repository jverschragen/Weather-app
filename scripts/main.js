
const currentLocationWeather = document.querySelector('.btn-current-weather');

const weatherDetails = document.querySelector('.weatherDetails');

// Weather temprature
const weatherTemp = weatherDetails.querySelector('#temp');
const weatherTempMinMax = weatherDetails.querySelector('#tempMinMax');

// Weather description
const weatherDescription = weatherDetails.querySelector('#description');

// Weather location
const weatherLocation = document.querySelector('#location');



// get latitude and longitude
function geoFindMe() {
    const output = document.getElementById("out");

    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        const openWeatherAppId = 'd90a44dbf472319541d6a7489eeb5f79';
        const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric' + '&APPID=' + openWeatherAppId;
        console.log(openWeatherUrl);

        fetch(openWeatherUrl)
            .then(blob => blob.json())
            .then(weather => {
                displayWeather(weather)
            })
            .catch(function(error) {
                    console.log(error);
            })

        function displayWeather(weatherInfo){
            /*const {main: temp} = weatherInfo;
            console.log('temp: ', temp);*/
            console.log(weatherInfo);
            let location = weatherInfo.name;
            let temp = Math.round(weatherInfo.main.temp);
            let tempMax = weatherInfo.main.temp_max;
            let tempMin = weatherInfo.main.temp_min;
            let weather = weatherInfo.weather;

            // get description out of array
            weather.forEach(function(currentWeather) {
                weatherDescription.innerHTML = currentWeather.description;
            });

            weatherLocation.innerHTML = location;
            weatherTemp.innerHTML = temp + '°';
            weatherTempMinMax.innerHTML = tempMax + '° / ' + tempMin + '°';



        }

    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
}

currentLocationWeather.addEventListener('click', geoFindMe);
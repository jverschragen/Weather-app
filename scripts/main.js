const currentLocationWeather = document.querySelector('.btn-current-weather');


const currentDateTime = document.querySelector('#date');


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

        // API connection
        fetch(openWeatherUrl)
            .then(blob => blob.json())
            .then(weather => {
                displayWeather(weather)
            })
            .catch(function(error) {
                    console.log(error);
            })
        // get weather
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

    function setDate() {
        const monthNames = ["january", "february", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const now = new Date();
        const month = monthNames[now.getMonth()];
        const day = now.getDay();
        const dayName = dayNames[now.getDay()];
        const hours = checkTime(now.getHours());
        const minutes = checkTime(now.getMinutes());
        currentDateTime.innerHTML = dayName + ' ' + day + ' ' + month + ' ' + hours + ':' + minutes;
    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
    setDate();
}

currentLocationWeather.addEventListener('click', geoFindMe);
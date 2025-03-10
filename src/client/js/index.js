
const BASE_URL_GEONAME = "http://api.geonames.org/postalCodeLookupJSON?"
const MAX_ROWS_GEONAME = 10
const USER_NAME_GEONAME = "arzaqziad"

const BASE_URL_WEATHERBIT = "https://api.weatherbit.io/v2.0/forecast/daily?"
const KEY_WEATHERBIT = "3d1a299d8363431b8d8a949a6fdf1c4a"

const BASE_URL_PIXABAY = "https://pixabay.com/api/?image_type=photo&pretty=true&category=city"
const KEY_PIXABAY = "49258803-a7d83edc8a8e1805b45cac426"

const searchBtn = document.getElementById("searchBtn")
const placeInput = document.getElementById("place")
const dateInput = document.getElementById("date")

const tripTo = document.getElementById("trip_to")
const departing = document.getElementById("departing")
const count_down = document.getElementById("count_down")
const high_temp_span = document.getElementById("high_temp")
const low_temp_span = document.getElementById("low_temp")
const weather_description = document.getElementById("weather_description")
const place_img = document.getElementById("place_img")

let latitude, longitude, country, imgUrl, low_temp, high_temp;

const getPlaceData = async (place_name) => {
    const url = `${BASE_URL_GEONAME}placename=${place_name}&maxRows=${MAX_ROWS_GEONAME}&username=${USER_NAME_GEONAME}`
    const res = await fetch(url)
    try {
        const data = await res.json();
        latitude = data.postalcodes[0].lat
        longitude = data.postalcodes[0].lng
        country = data.postalcodes[0].countryCode

        console.log('url', url);
        console.log('data', data);
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        console.log('country', country);

    } catch (error) {
        console.log("error", error);
    }
}
const getWeatherData = async (lat, lon) => {
    const url = `${BASE_URL_WEATHERBIT}key=${KEY_WEATHERBIT}&lat=${lat}&lon=${lon}`
    const res = await fetch(url)
    try {
        const data = await res.json();
        low_temp = data.data[0].low_temp;
        high_temp = data.data[0].high_temp
        console.log('url', url);
        console.log('data', data);
        console.log('low_temp', data.data[0].low_temp);

    } catch (error) {
        console.log("error", error);
    }
}
const getPlaceImage = async (place_name) => {
    const url = `${BASE_URL_PIXABAY}&key=${KEY_PIXABAY}&q=${place_name}`
    const res = await fetch(url)
    try {
        const data = await res.json();
        imgUrl = data.hits[0].webformatURL;
        console.log('url', url);
        console.log('data', data);
        console.log('webformatURL', data.hits[0].webformatURL);

    } catch (error) {
        console.log("error", error);
    }
}

const searchTrip = async () => {
    const place_name = placeInput.value.trim();
    const date = dateInput.value;
    if (place_name && date) {
        console.log('date', date);
        await getPlaceData(place_name)
        await getPlaceImage(place_name)
        await getWeatherData(latitude, longitude)

        window.location.href = 'mytrip.html';

        tripTo.innerHTML = place_name;
        departing.innerHTML = date
        count_down.innerHTML = Date.parse(date) - Date.now();
        if (high_temp_span) {
            console.log('true');
        } else {
            console.log('false');

        }
        high_temp_span.innerHTML = high_temp
        low_temp_span.innerHTML = low_temp

    }

}

// const saveBtn = document.getElementById("saveBtn")
// saveBtn.addEventListener('click', performAction)

searchBtn.addEventListener('click', searchTrip)

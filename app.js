require('dotenv').config();
const { getWeather } = require('./utils/weather');
const { getGeoCode } = require('./utils/geoCode');

let coords = {
    longitude: 30.7327891,
    latitude: 76.7627217
}

getGeoCode(process.argv[2] || 'Panchkula')
    .then(coords => getWeather(coords))
    .then(forecast => console.log(forecast))
    .catch(err => console.log(err));
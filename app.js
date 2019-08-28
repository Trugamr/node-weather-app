require('dotenv').config();
const { getWeather } = require('./utils/weather');
const { getGeoCode } = require('./utils/geoCode');

// let coords = {
//     longitude: 76.779419,
//     latitude: 30.7327891
// }

const getForecast = async (location) => {
    try {
        const coords = await getGeoCode(location);
        const forecast = await getWeather(coords);
        console.log(coords.placeName);
        console.log(forecast);
    } catch(err) {
        console.log(err);
    } 
}

if(process.argv[2]) getForecast(process.argv[2])
else console.log('Please provide a location.')
require('dotenv').config();
const request = require('request-promise');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_BASE_URL = `https://api.darksky.net/forecast/${ WEATHER_API_KEY }/`;
const GEOCODE_BASE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`
let coords = `30.7327891,76.7627217`;

const api = request.defaults({
    baseUrl: WEATHER_BASE_URL,
    json: true,
    qs: {
        units: 'si',
        lang: 'en'
    }
})

const geocode = request.defaults({
    baseUrl: GEOCODE_BASE_URL,
    json: true,
    qs: {
        access_token: GEOCODE_API_KEY,
        limit: 1
    }
})

api({ url: `/${coords}` })
    .then(data => {
        const { precipProbability, temperature } = data.currently;
        const { summary } = data.daily.data[0];
        console.log(`${summary} Is's currenty ${temperature} degrees out. There is a ${precipProbability * 100}% chance of rain.`);
    })
    .catch(err => console.error(err));

geocode({ url: `/chandigarh.json` })
    .then(data => {
        const { center } = data.features[0];
        const [ longitude, latitude ] = center;
        console.log(`${ longitude }, ${ latitude }`);
    })
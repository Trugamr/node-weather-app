require('dotenv').config();
const request = require('request-promise');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = `https://api.darksky.net/forecast/${ API_KEY }/`;
const coords = `30.7327891,76.7627217`;

const api = request.defaults({
    baseUrl: BASE_URL,
    json: true
})

api({ url: `/${coords}` })
    .then(data => {
        const { precipProbability, temperature } = data.currently;
        console.log(`Is's currenty ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
    })
    .catch(err => console.error(err));
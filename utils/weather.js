const request = require('request-promise');

const getWeather = async ({ longitude, latitude }) => {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const WEATHER_BASE_URL = `https://api.darksky.net/forecast/${ WEATHER_API_KEY }/`;  
    const options = {
        url: `${longitude},${latitude}`,
        baseUrl: WEATHER_BASE_URL,
        json: true,
        qs: {
            units: 'si',
            lang: 'en'
        }
    }
    try {
        const data = await request(options);
        const { precipProbability, temperature } = data.currently;
        const { summary } = data.daily.data[0];
        return (`${summary} Is's currenty ${temperature} degrees out. There is a ${precipProbability * 100}% chance of rain.`);
    } catch(err) {
        if(err.statusCode) throw('Location not found.');
        else throw('Unable to connect to weather service.');
    }
}

module.exports = { getWeather }
require('dotenv').config();
const express = require('express');
const { getWeather } = require('./utils/weather');
const { getGeoCode } = require('./utils/geoCode');

// let coords = {
//     longitude: 76.779419,
//     latitude: 30.7327891
// }

const app = new express();
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

app.get('/help', (req, res) => {
    res.send({
        name: 'tru',
        age: 20
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/weather', async (req, res) => {
    try {
        const data = await getForecast('chandigarh');
        res.send(data);
    } catch(err) {
        res.send({
            err: err.message
        })
        console.log(err);
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))


const getForecast = async (location) => {
    try {
        const coords = await getGeoCode(location);
        const forecast = await getWeather(coords);
        return { ...coords, forecast };
    } catch(err) {
        throw(err);
    } 
}

if(process.argv[2]) getForecast(process.argv[2])
else console.log('Please provide a location.')
require('dotenv').config()
const path = require('path')
const express = require('express')
const { getWeather } = require('../utils/weather')
const { getGeoCode } = require('../utils/geoCode')

// let coords = {
//     longitude: 76.779419,
//     latitude: 30.7327891
// }

const app = new express()
const PORT = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('index', { name: 'tru ^_^' })
})

app.get('/weather', async (req, res) => {
    try {
        const data = await getForecast('chandigarh')
        res.send(data)
    } catch(err) {
        res.status.send({
            err: err.message
        })
        console.log(err)
    }
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me'})
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', msg: 'Some help message.' });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))


const getForecast = async (location) => {
    try {
        const coords = await getGeoCode(location)
        const forecast = await getWeather(coords)
        return { ...coords, forecast }
    } catch(err) {
        throw(err)
    } 
}

if(process.argv[2]) getForecast(process.argv[2])
else console.log('Please provide a location.')
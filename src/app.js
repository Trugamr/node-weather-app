require('dotenv').config()
const path = require('path')
const express = require('express')
const { getWeather } = require('../utils/weather')
const { getGeoCode } = require('../utils/geoCode')
const hbs = require('hbs')


// let coords = {
//     longitude: 76.779419,
//     latitude: 30.7327891
// }

const app = new express()
const PORT = process.env.PORT || 3000

// define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('index', { title: 'tru ^_^' })
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

// 404 page
app.get('/help/*', (req, res) => {
    res.render('404-page', { error: '404 | help article not found' })
})

app.get('*', (req, res) => {
    res.render('404-page', { error: '404 | not found.'})
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
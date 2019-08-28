const request = require('request-promise');

const getGeoCode = async (address) => {
    const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
    const GEOCODE_BASE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
    const options = {
        url: `/${encodeURIComponent(address)}.json`,
        baseUrl: GEOCODE_BASE_URL,
        json: true,
        qs: {
            access_token: GEOCODE_API_KEY,
            limit: 1
        }
    }
    try {
        const data = await request(options);
        if(data.features.length === 0) throw('Unable to find location, try again with different search term.');
        const { center, place_name } = data.features[0];
        const [ longitude, latitude ] = center;
        return { longitude, latitude, placeName: place_name };
    } catch(err) {
        if(err.name) throw('Unable to connect to geocoding service.')
        else throw(err);
        
    }
}

module.exports = { getGeoCode }
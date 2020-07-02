const request = require("request-promise");
const { text } = require("express");

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const GEOCODE_BASE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

const default_options = {
  baseUrl: GEOCODE_BASE_URL,
  json: true,
  qs: {
    access_token: GEOCODE_API_KEY,
    limit: 1,
  },
};

const getGeoCode = async (address) => {
  const options = {
    ...default_options,
    url: `/${encodeURIComponent(address)}.json`,
  };

  try {
    const data = await request(options);
    if (data.features.length === 0)
      throw "Unable to find location, try again with different search term.";
    const { center, place_name, text } = data.features[0];
    const [longitude, latitude] = center;
    return { longitude, latitude, text, placeName: place_name };
  } catch (err) {
    if (err.name) throw new Error("Unable to connect to geocoding service.");
    else throw new Error(err);
  }
};

const getPlaceInfo = async (latitude, longitude) => {
  console.log(longitude, latitude);
  const options = {
    ...default_options,
    url: `/${longitude},${latitude}.json`,
  };

  try {
    const data = await request(options);
    console.log(data);
    if (data.features.length === 0)
      throw "Unable to find location for specified coordinates";
    const { center, place_name, text } = data.features[0];
    const [longitude, latitude] = center;
    return { longitude, latitude, text, placeName: place_name };
  } catch (err) {
    if (err.name) throw new Error("Unable to connect to geocoding service.");
    else throw new Error(err);
  }
};

module.exports = { getGeoCode, getPlaceInfo };

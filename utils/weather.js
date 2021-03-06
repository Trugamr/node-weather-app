const request = require("request-promise");

const getWeather = async ({ longitude, latitude }, queryParams) => {
  const { units, lang } = queryParams;

  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const WEATHER_BASE_URL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/`;
  const options = {
    url: `${latitude},${longitude}`,
    baseUrl: WEATHER_BASE_URL,
    json: true,
    qs: {
      units,
      lang
    }
  };
  try {
    const data = await request(options);
    const { precipProbability, temperature } = data.currently;
    const { summary } = data.daily.data[0];
    return {
      forecast: `${summary} Is's currenty ${temperature} degrees out. There is a ${(
        precipProbability * 100
      ).toPrecision(2)}% chance of rain.`,
      ...data
    };
  } catch (err) {
    if (err.statusCode) throw new Error("Location not found.");
    else throw new Error("Unable to connect to weather service.");
  }
};

module.exports = { getWeather };

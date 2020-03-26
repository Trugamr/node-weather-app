require("dotenv").config();
const path = require("path");
const express = require("express");
const { getWeather } = require("../utils/weather");
const { getGeoCode } = require("../utils/geocode");
const hbs = require("hbs");
const cors = require("cors");

// let coords = {
//   longitude: 76.79111,
//   latitude: 30.73528
// };

const app = new express();
const PORT = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// allow CORS
app.use(cors());

// set handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather" });
});

app.get("/weather", async (req, res) => {
  const { search, units = "si", lang = "en", latitude, longitude } = req.query;

  if (search || (latitude && longitude)) {
    try {
      const data = await getInfo({ search, units, lang, latitude, longitude });
      data.search = search;
      return res.send(data);
    } catch (err) {
      return res.send({
        error: err.message
      });
    }
  }

  res.status(200).send({
    error: "You must provide a search term."
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", msg: "Why are you here ?" });
});

// 404 page
app.get("/help/*", (req, res) => {
  res.render("404-page", { error: "404 - Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404-page", { title: "404", error: "404 - Page not found." });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

const getInfo = async queryParams => {
  const { search, latitude, longitude } = queryParams;
  try {
    let coords;
    if (latitude && longitude) coords = { latitude, longitude };
    else coords = await getGeoCode(search);
    const weather = await getWeather(coords, queryParams);
    return { ...coords, ...weather };
  } catch (err) {
    throw err;
  }
};

if (process.argv[2]) getInfo(process.argv[2]);
else console.log("Please provide a location.");

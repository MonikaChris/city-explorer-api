'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();
const weather = require('./data/weather.json');

//Create an instance of an Express server
const app = express();

//Middleware - tells Express app to use cors
app.use(cors());

//Set PORT variable to tell Express app where to serve the server
const PORT = process.env.PORT || 3002;

class Forecast {
  constructor(city) {
    let { data } = weather.find(item => item.city_name === city);
    this.weatherData = data;
  }

  getWeather() {
    return this.weatherData.map(day => ({
      description: `${day.weather.description}, high of ${day.high_temp} degrees, low of ${day.low_temp} degrees.`,
      date: `${day.datetime}`
    }));
  }
}

//Define home route
app.get('/', (req, res) => {
  res.send('Hello from the home route');
});

//Define endpoint that holds weather data
app.get('/weather', (req, res, next) => {
  try {
    //assign query parameters from front end
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;

    let currentWeather = new Forecast(searchQuery);
    let weatherReport = currentWeather.getWeather();

    res.send(weatherReport);
  } catch (error) {
    next(error.message);
  }
});

//Middleware error handling
app.use((error, request, response, next) => {
  console.log(error);
  response.send(error);
});

//Tells app which port to listen on
app.listen(PORT, console.log(`Listening on PORT ${PORT}`));


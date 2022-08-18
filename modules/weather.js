'use strict';

const axios = require('axios');
let cache = require('./cache');

class Weather {
  constructor(weatherObj) {
    this.weatherData = weatherObj;
  }

  getWeather() {
    return this.weatherData.data.map(day => ({
      description: `${day.weather.description}, high of ${day.high_temp} degrees, low of ${day.low_temp} degrees.`,
      date: `${day.datetime}`
    }));
  }
}

async function getApiWeather(request, response, next) {
  //assign query parameters from front end
  const lat = request.query.lat;
  const lon = request.query.lon;
  const key = 'weather' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I&days=5`;

  try {
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      response.status(200).send(cache[key].data);
    } else {
      const weatherResponse = await axios.get(url);
      let weatherObj = new Weather(weatherResponse.data);
      let forecast = weatherObj.getWeather();

      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = forecast;
      response.status(200).send(forecast);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = getApiWeather;

'use strict';

const axios = require('axios');

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

async function getApiForecast(request, response, next) {
  //assign query parameters from front end
  const lat = request.query.lat;
  const lon = request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I&days=5`;

  try {
    const weatherResponse = await axios.get(url);
    let weatherObj = new Weather(weatherResponse.data);
    let forecast = weatherObj.getWeather();
    response.send(forecast);
  } catch (error) {
    next(error);
  }
}

module.exports = getApiForecast;

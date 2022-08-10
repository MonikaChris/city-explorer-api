'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
const axios = require('axios');
require('dotenv').config();
//const weather = require('./data/weather.json');

//Create an instance of an Express server
const app = express();

//Middleware - tells Express app to use cors
app.use(cors());

//Set PORT variable to tell Express app where to serve the server
const PORT = process.env.PORT || 3002;

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

class Movie {
  constructor(movieObj) {
    this.movieData = movieObj;
  }
  getMovies() {
    return this.movieData.results.map(movie => ({
      title: `${movie.original_title}`,
      overview: `${movie.overview}`,
      average_votes: `${movie.vote_average}`,
      total_votes: `${movie.vote_count}`,
      image_url: `${movie.backdrop_path}`,
      popularity: `${movie.popularity}`,
      released_on: `${movie.release_date}`
    }));

  }

}

//Define home route
app.get('/', (req, res) => {
  res.send('Hello from the home route');
});

//Define endpoint that holds weather data
app.get('/weather', (getApiForecast));

//Define endpoint for movie data
app.get('/movies', getApiMovies);

async function getApiForecast(request, response, next) {
  //assign query parameters from front end
  const city = request.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}&country=US&units=I&days=5`;
  //const lat = request.query.lat;
  //const lon = request.query.lon;

  try{
    const weatherResponse = await axios.get(url);
    let weatherObj = new Weather(weatherResponse.data);
    let forecast = weatherObj.getWeather();
    response.send(forecast);
  } catch (error) {
    next(error);
  }
}

async function getApiMovies(request, response, next) {
  const city = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  try {
    const movieResponse = await axios.get(url);
    const movieObj = new Movie(movieResponse.data);
    response.send(movieObj.getMovies());
  } catch (error) {
    next(error);
  }
}

//Middleware error handling
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//Tells app which port to listen on
app.listen(PORT, console.log(`Listening on PORT ${PORT}`));


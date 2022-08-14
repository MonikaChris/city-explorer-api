'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
//const axios = require('axios');
require('dotenv').config();
const getApiForecast = require('./modules/weather');
const getApiMovies = require('./modules/movies');

//Create an instance of an Express server
const app = express();

//Middleware - tells Express app to use cors
app.use(cors());

//Set PORT variable to tell Express app where to serve the server
const PORT = process.env.PORT || 3002;

//Define home route
app.get('/', (req, res) => {
  res.send('Hello from the home route');
});

//Define endpoint that holds weather data
app.get('/weather', getApiForecast);

//Define endpoint for movie data
app.get('/movies', getApiMovies);

//Middleware error handling
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//Tells app which port to listen on
app.listen(PORT, console.log(`Listening on PORT ${PORT}`));


'use strict';

const axios = require('axios');

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
      image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      popularity: `${movie.popularity}`,
      released_on: `${movie.release_date}`
    }));
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

module.exports = getApiMovies;

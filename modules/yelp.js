'use strict';

const axios = require('axios');

async function getApiYelp(request, response, next) {
  //const city = response.query.searchedCity;
  const lat = request.query.lat;
  const lon = request.query.lon;
  //const key = 'yelp-' + city;
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;

  try {
    const yelpResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    });
    const yelpObject = new Yelp(yelpResponse.data);
    const yelp = yelpObject.getYelp();
    response.status(200).send(yelp);
  } catch (error) {
    next(error);
  }
}

class Yelp {
  constructor(data) {
    this.restaurants = data.businesses;
  }

  getYelp() {
    return this.restaurants.map(restaurant => ({
      name: restaurant.name,
      image_url: restaurant.image_url,
      price: restaurant.price,
      rating: restaurant.rating,
      url: restaurant.url,
      type: restaurant.categories[0].title
    }));
  }

}

module.exports = getApiYelp;

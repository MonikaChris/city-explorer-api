# City-Explorer API

**Author**: Monika Davies\
**Version**: 1.0.2

## Overview

This app is an Express server for a frontend client that allows users to input a city and get back a map and data about local weather, restaurants, and movies. The app makes API calls to Weatherbit.io, TMDB, and Yelp. The frontend client also makes an API call to LocationIQ for map data.

Frontend: [github.com/MonikaChris/city-explorer/blob/main/README.md](https://github.com/MonikaChris/city-explorer/blob/main/README.md)

## Architecture

This server uses Express as its running environment and cors as middleware.

## Change Log

- Application has a fully-functional express server, with a GET route for the location resource.
- Server provides short weather descriptions and corresponding dates for queried cities. Currently uses dummy data.
- Server supports API calls for weather, restaurants, movies. No more dummy data.

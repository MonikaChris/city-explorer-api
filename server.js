'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
require ('dotenv').config();

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

//Tells app which port to listen on
app.listen(PORT, console.log(`Listening on PORT ${PORT}`));


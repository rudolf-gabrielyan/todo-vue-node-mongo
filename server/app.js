const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//env config 
require('dotenv').config();

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Cors configuration
const cors = require('cors');
app.use(cors());

//define routes
const router = require('./api/v1/routes')
app.use('/api/v1', router);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Listening the application
app.listen(process.env.PORT, () => {
    console.log(`The magic is happening on http://${process.env.HOST}:${process.env.PORT}`);
})
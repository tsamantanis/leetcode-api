const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const mongoose = require('mongoose');
const { getRandomInt } = require('./helpers/random');

// Load environment variables
require('dotenv').config();

// Load Models
require('./models/user');

// Load Auth Check
require('./config/passport');

// Setup server
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:5000', 'https://13al0ae3vb.execute-api.us-east-1.amazonaws.com/dev'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup MongoDB
if (process.env.ENVIRONMENT !== 'testing') {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  const { connection } = mongoose;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
}

// Load routes
app.use(require('./controllers'));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Leetcode API listening on port ${process.env.PORT}!`);
});

module.exports = app;
module.exports.handler = serverless(app);

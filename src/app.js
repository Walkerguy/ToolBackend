const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const routes = require('./routes/routes');


mongoose.Promise = global.Promise;

app.use(cors());

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://testuser:@Welkom1@ds251284.mlab.com:51284/products');
};

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) =>{
  res.status(422).send({error: err.message});
});

module.exports = app;

// Product routing.
var express       = require('express');
var routes        = express.Router();

// Models.
var product   = require('../model/product.model');

// Alle product ophalen via promise.
routes.get('/all', function(req, res) {
  res.contentType('application/json');
  Product.find({})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send(error));
});

// Specifiek 1 product op opvragen.
routes.get('/:id', function(req, res) {
  res.contentType('application/json');
  Product.findById({_id: req.params.id})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send(error));
});

// Ratings van een product ophalen.
routes.get('/:id/ratings', function(req, res) {
  res.contentType('application/json');
  Product.findById(req.params.id)
      .populate('ratings')
      .then((product) => {
          ratings = product.ratings;
          res.status(200).json(ratings);
      })
      .catch((error) => res.status(401).json(error));
});

// Ratings op Id ophalen.
routes.get('/:id/ratings/:rid', function(req, res) {
  res.contentType('application/json');
  Product.findById(req.params.id)
      .populate('ratings')
      .then((product) => {
          Rating.findById(req.params.rid)
          .then((rating) => { 
              res.status(200).json(rating);
          })
          .catch((error) => res.status(401).json(error));
      })
      .catch((error) => res.status(401).json(error));
});

/*// Nieuwe product, op basis van de request body.
routes.post('/createm00v', function(req, res) {
  var rating = new Rating({
    source: 'Bram',
    value: 'it sucked'
  });
  
  rating.save(function (err) {
    if (err) return handleError(err);
  
    var newmovie = new Product({
      title: 'Casino Royale',
      ratings: rating._id    // assign the _id from the person
    });
  
    newmovie.save(function (err) {
      if (err) return handleError(err);
      // thats it!
    });
  });
});*/

// Nieuwe product, op basis van de request body.
routes.post('/create', function(req, res) {
  // Aanmaken.
  var product = new Product(req.body);

  // Opslaan.
  product.save({})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send(error));
});

/*// Bewerkt product.
routes.put('/edit/:id/', function(req, res) {
  // Vindt product, verandert atribuut, slaat op.
  Product.findById({
      _id: req.params.id
    })
    .then((product) => {
      product.data = req.params.data;
      product.save({})
        .then((product) => res.status(200).send(product))
        .catch((error) => res.status(401).send(error));
      res.status(200).json(product);
    })
    .catch((error) => res.status(401).send(error));
});*/

// Verwijder product.
routes.delete('/delete/:id', function(req, res) {
  Product.findByIdAndRemove({_id: req.params.id})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send(error));
});

module.exports = routes;
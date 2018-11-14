// Product routing.
var express       = require('express');
var routes        = express.Router();

// Models.
var Product   = require('../model/product.model');

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

// Nieuwe product, op basis van de request body.
routes.post('/create', function(req, res) {
  // Aanmaken.
  var product = new Product(req.body);
  console.log(product);
  // Opslaan.
  product.save({})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send( error));
});

// Bewerkt product.
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
});

// Verwijder product.
routes.delete('/delete/:id', function(req, res) {
  Product.findByIdAndRemove({_id: req.params.id})
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(401).send(error));
});

module.exports = routes;

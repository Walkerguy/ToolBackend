// All product routes.
const ProductsController  = require ('../controllers/product_controller')
const UserController      = require ('../controllers/user_controller')
const User                = require('../model/user.model');
const Product             = require('../model/product.model');

var passport = require('passport');

module.exports = (app) => {
  // USERS.
  app.get('/api/users/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

  app.post('/api/users/register',  UserController.register);
  app.post('/api/users/authenticate',  UserController.authenticate);

  app.get('/api/users',  UserController.read);
  app.get('/api/users/:id',  UserController.readById);

  // Edit.
  app.put('/api/users/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    User.findOneAndUpdate(req.params.id, req.body, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("Entity modified.");
    });
  });

  // Remove.
  app.delete('/api/users/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    User.findByIdAndRemove(req.params.id, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("Entity removed.");
    });
  });

  // PRODUCTS.
  app.get('/api', ProductsController.greeting);
  app.get('/api/products/:id',  ProductsController.readById);
  app.get('/api/products', ProductsController.read);

  app.post('/api/products', passport.authenticate('jwt', {session:false}), (req, res, next) =>{ 
    const productProps = req.body;
    Product.create(productProps)
    .then(product => res.send(product))
    .catch(next);
  });

  app.put('/api/products/:id', passport.authenticate('jwt', {session:false}), (req, res, next) =>{ 
    const productId = req.params.id;
    const productProps = req.body;
    Product.findByIdAndUpdate({_id:productId},productProps)
    .then(() => Product.findById({_id:productId}))
    .then(product => res.send(product))
    .catch(next);
  });

  app.delete('/api/products/:id', passport.authenticate('jwt', {session:false}), (req, res, next) =>{ 
  const productId = req.params.id;
    Product.findByIdAndRemove({_id: productId})
    .then(product => res.status(204).send(product))
    .catch(next);
  });
};
// All product routes.
const ProductsController = require ('../controllers/product_controller')
const UserController = require ('../controllers/user_controller')

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
  app.put('/api/users/:id',  UserController.edit);
  app.delete('/api/users/:id',  UserController.delete);

  // PRODUCTS.
  app.get('/api', ProductsController.greeting);
  app.get('/api/products/:id',  ProductsController.readById);
  app.get('/api/products', ProductsController.read);
  app.post('/api/products',  ProductsController.create);
  app.put('/api/products/:id',  ProductsController.edit);
  app.delete('/api/products/:id',  ProductsController.delete);
};
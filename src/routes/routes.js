const ProductsController = require ('../controllers/product_controller')


module.exports = (app) => {
  app.get('/api', ProductsController.greeting);
  app.get('/api/products/:id',  ProductsController.readById);
  app.get('/api/products', ProductsController.read);
  app.post('/api/products',  ProductsController.create);
  app.put('/api/products/:id',  ProductsController.edit);
  app.delete('/api/products/:id',  ProductsController.delete);
};

const assert      = require('assert');
const request     = require('supertest');
const app         = require('../../src/app.js');
const mongoose    = require('mongoose');
const Product     = mongoose.model('product');

// Testing products CRUD.
describe('Products controller', () => {
  it('post to api/products creates a new product', done => {
    Product.count().then(count =>{
        request(app)
        .post('/api/products')
        .send({ name: 'Boor' })
        .end(()=>{
          Product.count().then(newCount =>{
            assert(count+1 === newCount);
            done();
          });
      });
    });
  });

  it('Put to api/products edits a existing product',done =>{
    const product = new Product({ name: 'Boor' });
    product.save().then(() =>{
      request(app)
      .put('/api/products/' + product._id)
      .send({name:"Zaag"})
      .end(() =>{
        Product.findOne({ _id: product._id})
        .then(product => {
          assert(product.name === "Zaag");
          done();
        });
      });
    });
  });

  it('DELETE to /api/products/id can delete a product', done =>{
    const product = new Product({ name: 'Boor' });
    product.save().then(() =>{
      request(app)
      .delete('/api/products/' + product._id)
      .end(()=>{
        Product.findOne({name: 'Boor'})
        .then((product) =>{
          assert(product === null);
          done();
        });
      });
    });
  });
});
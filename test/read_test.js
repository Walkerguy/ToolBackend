const assert = require('assert');
const Product = require('../model/product.model');

describe('Reading products out of the database',() => {
  let product1;

  beforeEach((done) =>{
     product1 = new Product({productName: 'spijker', productCategorie:"gereedschappen", productImgUrl:"www.gfgf.nl",productDescription:"goed product"});
     product1.save()
     .then(() => done());
  });

  it('finds all products with the name of spijker', (done) => {
    Product.find({productName: 'spijker'})
    .then((products)=>{
      assert(products[0]._id.toString() === product1._id.toString());
      done();
    });
  });

  it('finds a product with a particular id', (done) => {
    Product.findOne({_id:product1._id})
    .then((product)=>{
      assert(product.productName === 'spijker');
      done();
    });
  });
});

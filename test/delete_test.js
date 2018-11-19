const assert = require('assert');
const Product = require('../model/product.model');

describe('Removing a product',() => {
  let product1;

  beforeEach((done) =>{
     product1 = new Product({productName: 'Boortje', productCategorie:"gereedschappen", productImgUrl:"www.gfgf.nl",productDescription:"goed product"});
     product1.save()
     .then(() => done());
  });

  it('model instance remove', (done) => {
    product1.remove()
    .then(() => Product.findOne({productName: 'Boortje'}))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class methode remove', (done) => {
    //remove a bunch of records with criteria
    Product.deleteOne({productName: 'Boortje'})
    .then(() => Product.findOne({productName: 'Boortje'}))
    .then((product2) => {
      assert(product2 === null);
      done();
    });
  });

  it('class methode findAndRemove', (done) => {
    Product.findOneAndRemove({productName: 'Boortje'})
    .then(() => Product.findOne({productName: 'Boortje'}))
    .then((product2) => {
      assert(product2 === null);
      done();
    });
  });

  it('class methode findByIdAndRemove', (done) => {
    Product.findByIdAndRemove(product1._id)
    .then(() => Product.findOne({productName: 'Boortje'}))
    .then((product2) => {
      assert(product2 === null);
      done();
    });
  });
});

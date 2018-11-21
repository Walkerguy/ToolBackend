const assert = require('assert');
const Product = require('../model/product.model');

describe('Updating a product',() => {
  let product1;

  beforeEach((done) =>{
     product1 = new Product({productName: 'Boortje', productCategorie:"gereedschappen", productImgUrl:"www.gfgf.nl",productDescription:"goed product"});
     product1.save()
     .then(() => done());
  });


  function assertName(operation, done) {
    operation
    .then(() => Product.find({}))
    .then((products) => {
      assert(products.length === 1);
      assert(products[0].productName === 'Zaagje');
      done();
    });
  }

  it('instance set and save', (done) => {
    product1.set('productName', 'Zaagje');
    assertName(product1.save(), done);
  });

  // it('model instance can update', (done) => {
  //     assertName(product1.updateOne({productName: 'Lord of the Rings online'}), done);
  //   });

  it('A model class can update', (done) => {
    assertName(
      Product.update({ productName: 'Boortje' }, { productName: 'Zaagje'}),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      Product.findOneAndUpdate({ productName: 'Boortje' }, { productName: 'Zaagje' }),
      done
    );
  });

  it('A model class can update one record by ID', (done) => {
    assertName(
      Product.findByIdAndUpdate( product1._id, {productName: 'Zaagje'}),
      done
    );
  });
});

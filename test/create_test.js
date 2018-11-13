const assert = require('assert');
const Product = require('../model/product.model');

describe('Creating records',() => {
  it('saving a record', (done) => {
    const product = new Product({productName: 'Hamer', productCategorie:"gereedschappen", productImgUrl:"www.gfgf.nl",productDescription:"goed product"});
    product.save()
    .then(() => {
      assert(!product.isNew);
      done();
    });
  });
});

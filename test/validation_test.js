const assert = require('assert');
const Product = require('../model/product.model');

describe('Validating records',() => {
  it('requires a name',() => {
    const product = new Product({ productName: undefined });
    const validationResult = product.validateSync();
    const { message } = validationResult.errors.productName;

    assert(message === 'the name of the product is missing, please enter a name.');
  });

  it('dissallow invalid records to be saved',(done) =>{
    const product = new Product({ productName: undefined });
    product.save()
    .catch((validationResult) =>{
      const { message } = validationResult.errors.productName;
      assert(message === 'the name of the product is missing, please enter a name.');
      done();
    });
  });
});

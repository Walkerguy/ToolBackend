const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/product_test',{ useNewUrlParser: true });
  mongoose.connection
    .once('open',() => { done(); })
    .on('error', (error)=>{
      console.warn("Warning",error);
    });
});

beforeEach((done) =>{
  mongoose.connection.collections.products.drop(()=>{
    done();
  });
});

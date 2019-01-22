// All product details.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true,'the name of the product is missing, please enter a name.']
  },
  categorie: {
    type: String
  },
  description: {
    type: String
  },
  imageurl: {
    type: String
  }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
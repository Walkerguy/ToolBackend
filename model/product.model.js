const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
productName: {
    type: String,
    required: [true,'the name of the product is missing, please enter a name.']
},
productCategorie: {
  type: String,
  required: [true,'the categorie of the product is missing, please enter a categorie.']
},
productDescription: {
  type: String,
  required: [true,'the description of the product is missing, please enter a description.']
},
productImgUrl: {
  type: String,
  required: [true,'the image of the product is missing, please enter a image.']
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;

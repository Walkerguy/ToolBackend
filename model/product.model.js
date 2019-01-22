const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
Name: {
    type: String,
    required: [true,'the name of the product is missing, please enter a name.']
},
Categorie: {
  type: String,
  required: [true,'the categorie of the product is missing, please enter a categorie.']
},
Description: {
  type: String,
  required: [true,'the description of the product is missing, please enter a description.']
},
ImgUrl: {
  type: String,
  required: [true,'the image of the product is missing, please enter an image.']
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;

// const ProductSchema = new Schema({
//   productName: String,
//   productCategory: String,
//   productDescription: String,
//   productImgUrl: String
//   }
//   });

// module.exports = Product;
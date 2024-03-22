const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

  
  ProductName: {
    type: String,
    required: true,
    default: "",
  },
  
  Brand: {
    type: String,
    required: true,
    default: "",
  },

  color: {
    type: String,
    required: true,
    default: "",
  },

  Quantity: {
    type: String,
    required: true,
    default: "",
  },

  Category: {
    type: String,
   required: true,
    default: "",
  },

  Type: {
    type: String,
   required: true,
    default: "",
  },

  size: {
    type: String,
    enum: ['S', 'M', 'L','XL'], // Add your size options here
    required: true,
    default:"",
  },

  Description: {
    type: String,
   required: true,
    default: "",
  },

  URL: {
    type: String,
   required: true,
    default: "",
  },



});

module.exports = mongoose.model('products',productSchema);
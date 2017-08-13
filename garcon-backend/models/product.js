'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//================================
// Product Schema
//================================
const ProductSchema = new Schema({
  name:{
    type: String,
    trim: true,
    required: true
  },
  price:{
    type: Number,
    required: true,
    default: 0
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Ingredient'
  },
  category: {
    type: String,
    enum: ['Food', 'Drink'],
    default: 'Food'
  }
});

module.exports = mongoose.model('Product', ProductSchema);

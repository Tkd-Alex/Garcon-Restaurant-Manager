'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ProductSchema = mongoose.model('Product').schema,
      OrderSchema = mongoose.model('Order').schema;

//================================
// Restaurant Schema
//================================
const RestaurantSchema = new Schema({
  name:{
    type: String,
    trime: true,
    required: true,
    unique: true,
  },
  address :{
    city:{
      type: String,
      trime: true,
      required: true
    },
    cap:{
      type: String,
      trime: true,
      required: true
    },
    street:{
      type: String,
      trime: true,
      required: true
    }
  },
  orders: [OrderSchema],
  menu: [ProductSchema],
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  waiters:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

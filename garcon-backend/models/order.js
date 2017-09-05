'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ProductSchema = mongoose.model('Product').schema;

//================================
// Order Schema
//================================
const OrderSchema = new Schema({
  tableNumber:{
    type: String,
    trim: true,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  listProduct:
  [{
    totalPrice:{
      type: Number,
      required: true,
      default: 0
    },
    quantity:{
      type: Number,
      required: true,
      default: 1
    },
    product: ProductSchema,
  }],
  totalPrice:{
    type: Number,
    required: true,
    default: 0
  },
  paid:{
    type: Boolean,
    required: true,
    default: false
  },
  complete:{
    type: Boolean,
    required: true,
    default: false
  },
  waiter:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Order', OrderSchema);

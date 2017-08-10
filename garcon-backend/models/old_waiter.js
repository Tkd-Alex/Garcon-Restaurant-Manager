'use strict';

var mongoose = require ('mongoose');
var bcrypt = require ('bcrypt');
var Schema = mongoose.Schema;

var WaiterSchema = new Schema({
  fullname:{
    type: String,
    trim: true,
    required: true
  },
  email:{
    type: String,
    unique: true,
    trime: true,
    lowercase: true,
    required: true
  },
  hash_password:{
    type: String,
    required: true
  },
  create:{
    type: Date,
    default: Date.now
  },
  age:{
    type: Number,
    default: 18
  },
  sex:{
    type: String,
    default: "M"
  }
});

WaiterSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('Waiter', WaiterSchema);

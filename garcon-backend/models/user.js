'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

//================================
// User Schema
//================================
const UserSchema = new Schema({
  fullname:{
    type: String,
    trim: true,
    required: true
  },
  email:{
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password:{
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
  },
  admin:{
    type: Boolean,
    default: false
  },
  photo:{
    type: String
  },
  push_token:{
    type: String,
    trim: true
  },
  restaurants:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Restaurant'
  },
  preferences:{
    defaultRestaurant:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    newOrderNotification:{
      type: Boolean
    }
  }
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this,
  SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);

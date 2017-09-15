'use strict';

const jwt = require('jsonwebtoken'),
      crypto = require('crypto');

const User = require('../models/user'),
      Product = require('../models/product'),
      Order = require('../models/order'),
      Restaurant = require('../models/restaurant'),
      config = require('../config/main');

function generateToken(user) {
      return jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
      });
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    fullname: request.fullname,
    email: request.email,
    admin: request.admin,
    age: request.age,
    sex: request.sex
  }
};

// Login Route
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);
  User.findById(req.user._id)
      .populate({path: 'restaurants', model:'Restaurant', select:'name'})
      .populate({path: 'preferences.defaultRestaurant', model:'Restaurant', select:'name owner'})
      .exec(function(err, result){
    res.status(200).json({
      token: 'JWT ' + generateToken(userInfo),
      user: result
    });
  })

}

// Registration Route
exports.register = function(req, res, next) {
  // Check for registration errors
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  const admin = req.body.admin;
  const age = req.body.age;
  const sex = req.body.sex;
  const photo = req.body.photo;

  // Return error if no email provided
  if (!email) { return res.status(422).send({ error: 'Assicurati di avere inserito l\'indirizzo email.'}); }
  // Return error if full name not provided
  if (!fullname) { return res.status(422).send({ error: 'Assicurati di avere inserito il tuo nome.'}); }
  // Return error if no password provided
  if (!password) { return res.status(422).send({ error: 'Assicurati di avere inserito una password.' }); }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) { return res.status(422).send({ error: 'L\'email inserita risulta giù utilizzata.' }); }

      // If email is unique and password was provided, create account
      let user = new User({
        fullname: fullname,
        email: email,
        password: password,
        admin: admin,
        age: age,
        sex: sex,
        photo: photo
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

// Set Token Route
exports.setToken = function(req, res, next){
  if (!req.body.token) { return res.status(422).send({ error: 'Assicurati di avere inserito il token.'}); }

  User.findById(req.user._id, function(err, user) {
    if (err) { return next(err); }
    user.push_token = req.body.token;

    user.save(function(err, result) {
      if (err) { return next(err); }
      res.status(201).json({"message": 'Il token è stato aggiornato con successo', "result": result});
    });

  });
}

// Update preferences
exports.updatePreferences = function(req, res, next){
  User.findById(req.user._id, function(err, user) {
    if (err) { return next(err); }
    if(req.body.defaultRestaurant != null && req.body.defaultRestaurant != undefined) user.preferences.defaultRestaurant = req.body.defaultRestaurant;
    if(req.body.newOrderNotification != null && req.body.newOrderNotification != undefined) user.preferences.newOrderNotification = req.body.newOrderNotification;
    user.save(function(err, result) {
      if (err) { return next(err); }
      Restaurant.populate(result, [{path:"preferences.defaultRestaurant", select:'name owner'}, {path:"restaurants", select:'name'}], function(err, user) {
        res.status(201).json({"message": 'Impostazioni aggiornate', "result": user});
      });
    });

  });
}

//========================================
// Authorization Middleware
//========================================

// Check if is admin
exports.roleAuthorization = function(req, res, next) {
  const user = req.user;

  User.findById(user._id, function(err, foundUser) {
    if (err) {
      res.status(422).json({ error: 'Utente non trovato.' });
      return next(err);
    }

    // If user is found, check if is admin.
    if (foundUser.admin) { return next(); }

    res.status(401).json({ error: 'Pagina riservata agli amministratori.' });
    return next('Non autorizzato - Admin');
  })
}

// Check if is owner
exports.ownerAuthorization = function(req, res, next) {
  const user = req.user;
  const restaurant_id = req.params.restaurant;

  Restaurant.findById(restaurant_id, function(err, foundRestaurant) {
    if (err) {
      res.status(422).json({ error: 'Ristorante non trovato.' });
      return next(err);
    }

    if(user._id.toString() == foundRestaurant.owner.toString()) { return next(); }

    res.status(401).json({ error: 'Non sei il proprietario.' });
    return next('Non autorizzato - Proprietario');
  })
}

// Check if is waiter
exports.waiterAuthorization = function(req, res, next) {
  const user = req.user;
  const restaurant_id = req.params.restaurant;

  Restaurant.findById(restaurant_id, function(err, foundRestaurant) {
    if (err) {
      res.status(422).json({ error: 'Ristorante non trovato.' });
      return next(err);
    }

    if(foundRestaurant.waiters.indexOf(user._id) > -1) { return next(); }

    res.status(401).json({ error: 'Non sei un cameriere presso questo locale.' });
    return next('Non autorizzato - Cameriere');
  })
}

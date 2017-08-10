'use strict';

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
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
    sex: request.sex,
    photo: request.photo
  }
};

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

//========================================
// Registration Route
//========================================
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

//========================================
// Authorization Middleware
//========================================
// Role authorization check
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
    return next('Non autorizzato');
  })
}

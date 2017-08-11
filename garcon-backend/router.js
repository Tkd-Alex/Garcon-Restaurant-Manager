'use strict';

const AuthenticationController = require('./controllers/authentication'),
      IngredientController = require('./controllers/ingredient'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        privateRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.get('/', function(req, res){
    res.json({ message: "garcon-backend api is on " + new Date() });
  });

  apiRoutes.route('/ingredient').get(IngredientController.getAll).post(IngredientController.insert);

  privateRoutes.get('/testing', requireAuth, AuthenticationController.roleAuthorization, function(req, res){
    res.json({ message: "Funziona!" });
  });

  apiRoutes.use('/private', privateRoutes);
  //privateRoutes.use(AuthenticationController.roleAuthorization);

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration routes
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};

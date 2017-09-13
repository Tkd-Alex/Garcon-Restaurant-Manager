'use strict';

const AuthenticationController = require('./controllers/authentication'),
      IngredientController = require('./controllers/ingredient'),
      ProductController = require('./controllers/product'),
      OrderController = require('./controllers/order'),
      RestaurantController = require('./controllers/restaurant');

const express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        restaurantRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.get('/', function(req, res){
    res.json({ message: "garcon-backend api is on " + new Date() +
                        "\nMore info https://github.com/Tkd-Alex/Garcon-Restaurant-Manager" });
  });

  //=========================
  // Auth Routes
  //=========================
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.put('/set-token', requireAuth, AuthenticationController.setToken);
  authRoutes.put('/update', requireAuth, AuthenticationController.updatePreferences);

  //=========================
  // Restaurant Routes (Main)
  //=========================

  apiRoutes.use('/restaurant', restaurantRoutes);
  restaurantRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization, RestaurantController.newRestaurant);

  // Waiter
  restaurantRoutes.post('/:restaurant/waiter/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.ownerAuthorization, RestaurantController.addWaiter);
  restaurantRoutes.delete('/:restaurant/waiter/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.ownerAuthorization, RestaurantController.removeWaiter);
  restaurantRoutes.get('/:restaurant/waiter/', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.ownerAuthorization, RestaurantController.getWaiter);
  restaurantRoutes.get('/:restaurant/waiter/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.ownerAuthorization, RestaurantController.getWaiter);

  // Product
  restaurantRoutes.post('/:restaurant/product', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.addProduct);
  restaurantRoutes.delete('/:restaurant/product/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.removeProduct);
  restaurantRoutes.put('/:restaurant/product/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.updateProduct);
  restaurantRoutes.get('/:restaurant/product/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.getProduct);
  restaurantRoutes.get('/:restaurant/product', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.getProduct);
  restaurantRoutes.get('/:restaurant/product/category/:category', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.getProduct);

  // Order
  restaurantRoutes.post('/:restaurant/order', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.addOrder);
  restaurantRoutes.get('/:restaurant/order/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.getOrder);
  restaurantRoutes.get('/:restaurant/order', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.getOrder);
  restaurantRoutes.put('/:restaurant/order/complete/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.completeOrder);
  restaurantRoutes.put('/:restaurant/order/pay/:id', requireAuth, AuthenticationController.roleAuthorization, AuthenticationController.waiterAuthorization, RestaurantController.payOrder);

  // Set url for API group routes
  app.use('/api', apiRoutes);

  //==================================
  // The following api are deprecated
  //==================================

  // Ingredient Routes
  apiRoutes.route('/ingredient').get(IngredientController.getAll)
                                .post(IngredientController.insert);

  apiRoutes.route('/ingredient/:id').get(IngredientController.get)
                                    .put(IngredientController.update)
                                    .delete(IngredientController.delete);

  // Product Routes
  apiRoutes.route('/product').get(ProductController.getAll)
                             .post(ProductController.insert);

  apiRoutes.route('/product/:id').get(ProductController.get)
                                 .put(ProductController.update)
                                 .delete(ProductController.delete);

  apiRoutes.route('/product/category/:category').get(ProductController.getCategory)

  // Order Routes
  apiRoutes.route('/order').get(OrderController.getAll)
                           .post(OrderController.insert);

  apiRoutes.route('/order/:id').get(OrderController.confirm)
                               .post(OrderController.pay);

};

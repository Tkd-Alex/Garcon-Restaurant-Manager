'use strict';

const mongoose = require('mongoose');

const Expo = require('expo-server-sdk');
let expo = new Expo();

const Ingredient = require('../models/ingredient');
const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

exports.newRestaurant = function(req, res, next){
  const name = req.body.name;
  if (!name) { return res.status(422).send({ error: 'Inserisci il nome del locale.'}); }
  const address = req.body.address;
  if (!address) { return res.status(422).send({ error: 'Inserisci l\'indirizzo.'}); }
  const owner = req.user;

  let restaurant = new Restaurant({
    name: name,
    address: address,
    owner: owner
  });

  restaurant.save(function(err, result){
    if(err) return next(err);
    User.findById(owner._id, function(err, waiter){
      if(waiter.restaurants.length == 0) waiter.preferences.defaultRestaurant = restaurant;
      waiter.restaurants.push(restaurant);
      waiter.save(function(err){
        if (err) { return next(err); }
      });
    })
    res.status(201).json({"message": "Ristorante creato con successo.", "result": result});
  })
}

function _addWaiter(restaurant, waiter, res){
  if(restaurant.waiters.indexOf(waiter._id) > -1) { return res.status(201).send({ message: 'L\'utente è già un cameriere presso queto locale.' }); }
  else{
    restaurant.waiters.push(waiter);
    restaurant.save(function(err){
      if(err) { return next(err) };
      if(waiter.restaurants.length == 0) waiter.preferences.defaultRestaurant = restaurant;
      waiter.restaurants.push(restaurant);
      waiter.save(async function(err){
        if (err) { return next(err); }
        if(waiter.push_token && waiter.push_token != ""){
          let chunk = {
              to: waiter.push_token,
              sound: 'default',
              body: "Sei stato aggiunto come cameriere per il locale " + restaurant.name,
              data: {}
          }
          try {
            let receipts = await expo.sendPushNotificationsAsync([chunk]);
            console.log(receipts);
          } catch (error) { console.error(error); }
        }
      });
      res.status(201).json({"message": 'Cameriere aggiunto.'});
    });
  }
}

// Waiter
exports.addWaiter = function(req, res, next){
  const waiter = req.params.id;
  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      if(!waiter){
        if(!req.body.email) { return res.status(422).send({ error: 'Inserisci almeno l\'utente' }); }
        User.findOne({email: req.body.email}, function(err, waiter){
          if(err) { return next(err) };
          if(waiter) _addWaiter(restaurant, waiter, res);
          else { return res.status(201).send({ message: 'Utente non trovato.' }); }
        })
      }
      else{
        User.findById(waiter, function(err, waiter){
          if(err) { return next(err) };
          if(waiter) _addWaiter(restaurant, waiter, res);
          else { return res.status(201).send({ message: 'Utente non trovato.' }); }
        });
      }
    }
  });
}

exports.removeWaiter = function(req, res, next){
  const waiter = req.params.id;
  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
        if(restaurant.waiters.indexOf(waiter) == -1) { return res.status(422).send({ error: 'L\'utente non è un cameriere presso queto locale.' }); }
        else{
          restaurant.waiters.splice(restaurant.waiters.indexOf(waiter), 1);
          restaurant.save(function(err){
            if(err) { return next(err) };
            User.findById(waiter, function(err, waiter){
              waiter.restaurants.splice(waiter.restaurants.indexOf(restaurant._id), 1);
              waiter.save(async function(err){
                if (err) { return next(err); }
                if(waiter.push_token && waiter.push_token != ""){
                  let chunk = {
                      to: waiter.push_token,
                      sound: 'default',
                      body: "Sei stato rimosso come cameriere dal locale " + restaurant.name,
                      data: {}
                  }
                  try {
                    let receipts = await expo.sendPushNotificationsAsync([chunk]);
                    console.log(receipts);
                  } catch (error) { console.error(error); }
                }
              })
              res.status(201).json({"message": 'Cameriere rimosso.'});
            })
          });
        }
      }
  });
}

exports.getWaiter = function(req, res, next){
  const waiter = req.params.id;
  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (restaurant.waiters.length == 0) res.status(201).json({"message": 'Il locale non ha ancora camerieri.'});
    else{
      if(!waiter){
        User.populate(restaurant, {path:'waiters', model:'User'}, function(err,result){
          res.status(201).json({"result": result.waiters});
        });
      }
      else{
        User.findById(waiter, function(err, user){
          if (err) { return next(err); }
          res.status(201).json({"result": user});
        })
      }
    }
  });
}

// Product
exports.addProduct = function(req, res, next){
  const name = req.body.name;
  if (!name) { return res.status(422).send({ error: 'Inserisci il nome del prodotto.'}); }

  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      let product = new Product({
          name: name,
          price: req.body.price,
          ingredients: req.body.ingredients,
          category: req.body.category
      });
      restaurant.menu.push(product);
      restaurant.save(function(err){
        if(err) { return next(err) };
        res.status(201).json({"message": 'Prodotto aggiunto.', "result": product});
      });
    }
  });
}

exports.removeProduct = function(req, res, next){
  const product = req.params.id;
  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      restaurant.menu.id(product).remove();
      restaurant.save(function(err){
        if(err) { return next(err) };
        res.status(201).json({"message": 'Prodotto rimosso.'});
      });
    }
  });
}

exports.updateProduct = function(req, res, next){
  const product = req.params.id;
  const product_data = req.body;
  if(!product_data) { return res.status(422).send({ error: 'Inserisci il prodotto.' }); }
  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      if(product_data.price) restaurant.menu.id(product).price = product_data.price;
      if(product_data.name) restaurant.menu.id(product).name = product_data.name;
      if(product_data.category) restaurant.menu.id(product).category = product_data.category;
      if(product_data.ingredients) restaurant.menu.id(product).ingredients = product_data.ingredients;
      restaurant.save(function(err){
        if (err) { return next(err); }
        res.status(201).json({"message": 'Il prodotto è stato aggiornato con successo', "result": restaurant.menu.id(product)});
      })
    }
  });
}

exports.getProduct = function(req, res, next){
  const product = req.params.id;
  const category = req.params.category;
  Restaurant.findById(req.params.restaurant)
            .populate({path: 'menu.ingredients', model:'Ingredient'})
            .exec(function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      if(product){
        if(restaurant.menu.id(product)) res.status(201).json({"result": restaurant.menu.id(product)});
        else { return res.status(422).send({ error: 'Prodotto non trovato' }); }
      }
      else if(category){
        let result = [];
        for(let i in restaurant.menu.toObject()) if(restaurant.menu[i].category.toLowerCase() == category.toLowerCase()) result.push(restaurant.menu[i]);
        if(result.length == 0) { return res.status(201).send({ message: 'Nessun prodotto appartenente a ' + category, result: [] }); }
        else res.status(201).json({"result": result});
      }
      else{
        res.status(201).json({"result": restaurant.menu});
      }
    }
  });
}

// Order
exports.addOrder = function(req, res, next){
  const tableNumber = req.body.tableNumber;
  if (!tableNumber) { return res.status(422).send({ error: 'Inserisci il numero del tavolo.'}); }

  const owner = req.user;

  Restaurant.findById(req.params.restaurant, function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      let order = new Order({
          tableNumber: tableNumber,
          listProduct: req.body.listProduct,
          totalPrice: req.body.totalPrice,
          waiter: owner
      });
      restaurant.orders.push(order);
      restaurant.save(function(err){
        if(err) { return next(err) };
        User.populate(restaurant, {path:'waiters', model:'User', select:'push_token preferences'}, async function(err, result){
          let chunk = [];
          result.waiters.forEach(function(waiter) {
            if(waiter.preferences.defaultRestaurant.toString() == restaurant._id.toString() && waiter.preferences.newOrderNotification)
              chunk.push({
                  to: waiter.push_token,
                  sound: 'default',
                  body: "È stato aggiunto un nuovo ordine presso " + restaurant.name,
                  data: {}
              })
          });
          try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log(receipts);
          } catch (error) { console.error(error); }
        });
        Product.populate(order, {path:'listProduct.product.ingredients', model:'Ingredient'}, function(err,result){
          res.status(201).json({"message": 'Ordine inserito!', "result": result});
        });
      });
    }
  });
}

exports.getOrder = function(req, res, next){
  const order = req.params.id;
  Restaurant.findById(req.params.restaurant)
            .populate({path: 'orders.listProduct.product.ingredients', model:'Ingredient'})
            .exec(function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      if(order){
        if(restaurant.orders.id(order)) res.status(201).json({"result": restaurant.orders.id(order)});
        else { return res.status(422).send({ error: 'Prodotto non trovato' }); }
      }
      else{
        res.status(201).json({"result": restaurant.orders});
      }
    }
  });
}

exports.completeOrder = function(req, res, next){
  const order = req.params.id;
  Restaurant.findById(req.params.restaurant)
            .populate({path: 'orders.waiter', model:'User'})
            .populate({path: 'orders.listProduct.product.ingredients', model:'Ingredient'})
            .exec(function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      restaurant.orders.id(order).complete = true;
      let chunk = {
          to: restaurant.orders.id(order).waiter.push_token,
          sound: 'default',
          body: "L'ordine " + restaurant.orders.id(order).tableNumber + " è completato!",
          data: {}
      }
      restaurant.save(async function(err){
        if (err) { return next(err); }
        try {
            let receipts = await expo.sendPushNotificationsAsync([chunk]);
            console.log(receipts);
        } catch (error) { console.error(error); }
        res.status(201).json({"message": 'Ordine completato', "result": restaurant.orders.id(order)});
      })
    }
  });
}

exports.payOrder = function(req, res, next){
  const order = req.params.id;
  Restaurant.findById(req.params.restaurant)
            .populate({path: 'orders.listProduct.product.ingredients', model:'Ingredient'})
            .exec(function(err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return res.status(422).send({ error: 'Ristorante non trovato..' }); }
    else{
      restaurant.orders.id(order).paid = true;
      restaurant.save(async function(err){
        res.status(201).json({"message": 'Pagato', "result": restaurant.orders.id(order)});
      })
    }
  });
}

'use strict';

// Node modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var jsonwebtoken = require("jsonwebtoken");
var bcrypt = require ('bcrypt');
var morgan = require('morgan');

// Custom models
var Waiter = require('./models/waiter');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/garcondb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function(req, res, next){
  console.log("Logger: " + new Date());
  next();
});

router.get('/', function(req, res){
  res.json({ message: "garcon-backend api" });
});

router.route('/auth/register').post(function(req, res){
  var waiter = new Waiter(req.body);
  waiter.hash_password = bcrypt.hashSync(req.body.password, 10);
  waiter.save(function(err, user) {
    if(err) return res.status(400).send({ message: err });
    else {
        user.hash_password = undefined;
        return res.json(user);
      }
  });
});

router.route('/auth/login').post(function(req, res){
  Waiter.findOne({
    email: req.body.email
  }, function(err, user) {
    if(err) throw err;
    if(!user) res.status(401).json({ message: 'Autenticazione fallita. Utente non trovato.' });
    else if (user) {
      if (!user.comparePassword(req.body.password)) res.status(401).json({ message: 'Autenticazione fallita. Password errata.' });
      else return res.json({token: jsonwebtoken.sign({ email: user.email, fullname: user.fullname, _id: user._id}, 'RESTFULAPIs')});
    }
  });

})

app.use('/api', router);

app.listen(port);
console.log('Listening to http://localhost:' + port);

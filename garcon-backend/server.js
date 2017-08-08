var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

var Bear = require('./models/bear');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/garcondb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function(req, res, next){
  console.log("Logger: " + new Date());
  next();
});

router.get('/', function(req, res){
  res.json({ message: "garcon-backend api" });
});

/*
router.post('/bears', function(req, res){
  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err){
    if(err) res.send(err);
    else res.json({ message: "Bear " + bear.name + " created."})
  });

});
*/

router.route('/bears')
  .post(function(req, res){
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err){
      if(err) res.send(err);
      else res.json({ message: "Bear " + bear.name + " created."})
    });
  })
  .get(function(req, res){
    Bear.find(function(err, bears){
      if(err) res.send(err);
      else res.json(bears);
    })
  });

app.use('/api', router);

app.listen(port);
console.log('Listening to http://localhost:' + port);

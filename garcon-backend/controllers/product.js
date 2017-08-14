'use strict';

const Product = require('../models/product');
//const Ingredient = require('../models/ingredient');

exports.insert = function(req, res, next) {
    const name = req.body.name;
    if (!name) { return res.status(422).send({ error: 'Inserisci il nome del prodotto.'}); }

    let product = new Product({
        name: name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        category: req.body.category
    });

    product.save(function(err, result) {
        if (err) { return next(err); }
        res.status(201).json({"message": 'Il prodotto è stato inserito con successo', "result": result});
    });

}

exports.getAll = function(req, res, next){
    Product.find().populate({path:'ingredients', model:'Ingredient'}).exec(function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"result": result});
    });
}

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

exports.getCategory = function(req, res, next){
    let category = capitalizeFirstLetter(req.params.category);
    if( category == 'Drink' || category == 'Food'){
        Product.find({category: category}).populate({path:'ingredients', model:'Ingredient'}).exec(function(err, result){
            if (err) { return next(err); }
            res.status(201).json({"result": result});
        });
    }
    else return res.status(422).send({ error: 'Categoria non valida.' });
}

exports.get = function(req, res, next){
    Product.findById(req.params.id).populate({path:'ingredients', model:'Ingredient'}).exec(function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"result": result});
    });
}

exports.update = function(req, res, next){
}

exports.delete = function(req, res, next){
    Product.remove({_id: req.params.id}, function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"message": 'Il prodotto è stato rimosso con successo'});
    });
}

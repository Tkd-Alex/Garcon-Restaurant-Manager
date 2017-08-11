'use strict';

const Ingredient = require('../models/ingredient')

exports.insert = function(req, res, next) {
    const name = req.body.name;
    if (!name) { return res.status(422).send({ error: 'Inserisci il nome dell\'ingrediente.'}); }

    Ingredient.findOne({ name: name }, function(err, existingIngrendient) {
        if (err) { return next(err); }

        if (existingIngrendient) { return res.status(422).send({ error: 'L\'ingrediente è già presente nel nostro database.' }); }
        let ingredient = new Ingredient({name: name});

        ingredient.save(function(err, ingredient) {
            if (err) { return next(err); }
            res.status(201).json({"message": 'L\'ingrediente è stato inserito con successo', "result": ingredient});
        });
    });
}

exports.getAll = function(req, res, next){
    Ingredient.find({}, function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"result": result});
    });
}

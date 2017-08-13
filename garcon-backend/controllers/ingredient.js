'use strict';

const Ingredient = require('../models/ingredient');

exports.insert = function(req, res, next) {
    const name = req.body.name;
    if (!name) { return res.status(422).send({ error: 'Inserisci il nome dell\'ingrediente.'}); }

    Ingredient.findOne({ name: name }, function(err, result) {
        if (err) { return next(err); }

        if (result) { return res.status(422).send({ error: 'L\'ingrediente è già presente nel nostro database.' }); }
        let ingredient = new Ingredient({name: name});

        ingredient.save(function(err, result) {
            if (err) { return next(err); }
            res.status(201).json({"message": 'L\'ingrediente è stato inserito con successo', "result": result});
        });
    });
}

exports.getAll = function(req, res, next){
    Ingredient.find(function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"result": result});
    });
}

exports.get = function(req, res, next){
    Ingredient.findById(req.params.id, function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"result": result});
    });
}

exports.update = function(req, res, next){
    const name = req.body.name;
    if (!name) { return res.status(422).send({ error: 'Inserisci il nome dell\'ingrediente.'}); }
    Ingredient.findById(req.params.id, function(err, result){
        if (err) { return next(err); }
        if (!result) { return res.status(422).send({ error: 'L\'ingrediente non è stato trovato..' }); }
        else{
            result.name = name;
            result.save(function(err){
                if (err) { return next(err); }
                res.status(201).json({"message": 'L\'ingrediente è stato aggiornato con successo', "result": result});
            })
        }
    });
}

exports.delete = function(req, res, next){
    Ingredient.remove({_id: req.params.id}, function(err, result){
        if (err) { return next(err); }
        res.status(201).json({"message": 'L\'ingrediente è stato rimosso con successo'});
    });
}

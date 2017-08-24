'use strict';

const Order = require('../models/order');
const Product = require('../models/product');

exports.insert = function(req, res, next) {
    const tableNumber = req.body.tableNumber;
    if (!tableNumber) { return res.status(422).send({ error: 'Inserisci il numero del tavolo.'}); }

    let order = new Order({
        tableNumber: tableNumber,
        listProduct: req.body.listProduct,
        totalPrice: req.body.totalPrice,
        waiter: req.body.waiter
    });

    order.save(function(err, result) {
        if (err) { return next(err); }
        res.status(201).json({"message": 'Ordine inserito!', "result": result});
    });

}

exports.getAll = function(req, res, next){
    Order.find().populate({path:'waiter', model:'User'}).populate("ingredients").exec(function(err, result){
        if (err) { return next(err); }
        Product.populate(result, {path:'listProduct.product.ingredients', model:'Ingredient'},function(err,result){
            res.status(201).json({"result": result});
        });
    });
}

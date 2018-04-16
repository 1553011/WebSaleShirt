var controller = {};

var models = require('../models');

controller.getAll = function (callback) {
    models.Shirt
        .findAll()
        .then(function (shirts) {
            callback(shirts);
        })
};


module.exports = controller;
var express = require('express');
var router = express.Router();

var shirtsController = require('../controllers/shirtController');

router.get('/', function (req, res) {
    req.app.locals.layout = 'layout_cart';
    shirtsController.getAll(function (shirts) {
        console.log(shirts);
        res.render('cart', {  
        });
       
    });
});

module.exports = router;
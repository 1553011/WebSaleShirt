var express = require('express');
var router = express.Router();

var shirtsController = require('../controllers/shirtController');

router.get('/', function (req, res) {
    req.app.locals.layout = 'layout_home';
    shirtsController.getAll(function (shirts) {
        console.log(shirts);
        res.render('index', {
            shirts:shirts
        });
       
    });
});

module.exports = router;
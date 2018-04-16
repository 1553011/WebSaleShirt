var express = require('express');
var router = express.Router();

var shirtsController = require('../controllers/shirtController');
router.get('/', function (req, res) {
    req.app.locals.layout = 'layout';
    shirtsController.getAll(function (shirts) {
        console.log(shirts);

        res.render('design', {
           
            shirts:shirts
            
        });
       
    });
});
// router.get('/save_image', function (req, res) {
//     console.log("A");
//     res.render('/upload/save_image.php');
// });
module.exports = router;
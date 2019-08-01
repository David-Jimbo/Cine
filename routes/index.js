var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'AMovie', fragmento: 'fragmentos/principal' });
});

router.get('/registro', function (req, res, next) {
    res.render('index', { title: 'AMovie', title2: 'Registro', fragmento:'fragmentos/registro/registrar' });
});

module.exports = router;

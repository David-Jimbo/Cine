var express = require('express');
var router = express.Router();


//persona controlador 
var persona = require('../controladores/persona_controller');
var Persona = new persona();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'AMovie', fragmento: 'fragmentos/principal' });
});

router.get('/registro', function (req, res, next) {
    res.render('index', { title: 'AMovie', title2: 'Registro', fragmento:'fragmentos/registro/registrar' });
});


router.post('/persona_controller', Persona.guardar);

module.exports = router;

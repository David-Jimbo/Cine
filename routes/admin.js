var express = require('express');
var router = express.Router();

//persona controlador 
var persona = require('../controladores/persona_controller');
var Persona = new persona();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var models = require('./../models');
    models.sequelize.sync().then(() => {
        console.log('Se ha conectado a la bd');
        res.send('Se ha sincronizado con la bd');
    }).catch( err =>{
        console.log('Hubo un error');
        res.send('No se ha sincronizado con la bd');
    });
    
    router.post('/persona_controller', Persona.guardar);

  });
  
  module.exports = router;
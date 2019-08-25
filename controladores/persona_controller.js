'use strict';

var persona = require('../models/persona');


class persona_controller {
    guardar(req, res) {
        var dperson = {// se esta guardando en el arreglo datos los names de formulario 
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fechaNacimiento,
            edad: req.body.edad,
            correo: req.body.email,
            clave: req.body.clave
        };

        var Persona= new persona(dperson);
        Persona.save().then(function(result){
               // req.flash('ok', 'se ha guardado');
                res.redirect('/');
                res.send(result);
                console.log(result);
        }).error(function(error){
            res.send(error);
        });
    }
}

module.exports = persona_controller;
"use strict";

function validarCedula(cedula) { //funcion que permite validar la cedula de Ecuador
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (var i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}

//Plaeholder handler
$(function () {

    if (!Modernizr.input.placeholder) {             //placeholder for old brousers and IE

        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

    $('#contact-form').submit(function (e) {

        e.preventDefault();
        var error = 0;
        var self = $(this);

        var $name = self.find('[name=user-name]');
        var $email = self.find('[type=email]');
        var $message = self.find('[name=user-message]');


        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test($email.val())) {
            createErrTult('Error! Wrong email!', $email)
            error++;
        }

        if ($name.val().length > 1 && $name.val() != $name.attr('placeholder')) {
            $name.removeClass('invalid_field');
        }
        else {
            createErrTult('Error! Write your name!', $name)
            error++;
        }

        if ($message.val().length > 2 && $message.val() != $message.attr('placeholder')) {
            $message.removeClass('invalid_field');
        }
        else {
            createErrTult('Error! Write message!', $message)
            error++;
        }

        if (error != 0) return;
        self.find('[type=submit]').attr('disabled', 'disabled');

        self.children().fadeOut(300, function () { $(this).remove() })
        $('<p class="success"><span class="success-huge">Thank you!</span> <br> your message successfully sent</p>').appendTo(self)
            .hide().delay(300).fadeIn();


        var formInput = self.serialize();
        $.post(self.attr('action'), formInput, function (data) { }); // end post
    }); // end submit


    $('#login-form').submit(function (e) {

        e.preventDefault();
        var error = 0;
        var self = $(this);

        var $email = self.find('[type=email]');
        var $pass = self.find('[type=password]');

        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //expresion que regula una correcta estructura del email
        //Campos para comprobar el email
        if ($email.val().length == 0) {
            createErrTult('Escriba un email!', $email);
            error++;
        } else {
            if (!emailRegex.test($email.val())) {
                createErrTult('El email es incorrecto', $email);
                error++;
            }
            $email.removeClass('invalid_field');
        }

        //Campos para comprobar la entrada de la contraseña
        if ($pass.val().length == 0) {
            createErrTult('Escriba una contraseña!', $pass);
            error++;
        } else {
            if ($pass.val().length < 4) {
                createErrTult('Su contraseña es muy anticuada :v', $pass)
                error++;
            }
            $pass.removeClass('invalid_field');
        }

        if (error != 0) return;
        self.find('[type=submit]').attr('disabled', 'disabled');

        self.children().fadeOut(300, function () { $(this).remove() })
        $('<p class="login__title">sign in <br><span class="login-edition">welcome to A.Movie</span></p><p class="success">You have successfully<br> signed in!</p>').appendTo(self)
            .hide().delay(300).fadeIn();


        // var formInput = self.serialize();
        // $.post(self.attr('action'),formInput, function(data){}); // end post
    }); // end submit


    $('#register-form').submit(function (e) {

        e.preventDefault();
        var error = 0;
        var self = $(this);

        var $email = self.find('[type=email]');
        var $pass = self.find('[type=password]');
        var $nombre = self.find('[name=nombres]')
        var $apellido = self.find('[name=apellidos]')
        var $cedula = self.find('[name=cedula]')
        var $fechaN = self.find('[name=fechaNacimiento]')

        var soloLetras = /^[a-z\s]+$/; //expresion que regula que se acepten solo letras y espacios
        //condiciones para comprobar los nombres
        if ($nombre.val().length == 0) {
            createErrTult('Escriba un nombre!', $nombre);
            error++;
        } else {
            if (!soloLetras.test($nombre.val())) {
                createErrTult('Solo se admiten letras en este campo', $nombre);
                error++;
           }
            $nombre.removeClass('invalid_field');
        }

        //condiciones para comprobar los apellidos
        if ($apellido.val().length == 0) {
            createErrTult('Escriba un apellido!', $apellido);
            error++;
        } else {
            if (!soloLetras.test($apellido.val())) {
                createErrTult('Solo se admiten letras en este campo', $apellido);
                error++;
            }
            $apellido.removeClass('invalid_field');
        }

        //condiciones para comprobar la fecha de nacimiento
        if ($fechaN.val().length == 0) {
            createErrTult('Ingrese su fecha de nacimiento', $fechaN);
            error++;
        } else{
            $fechaN.removeClass('invalid_field');
        }

        //Campos para comprobar la cedula
        if ($cedula.val().length == 0) {
            createErrTult('Escriba una CI !', $cedula);
            error++;
        } else {
            var cedulaL = /^[0-9]+$/; //expresion que regula que se acepten solo numeros
            if (!cedulaL.test($cedula.val())) {
                createErrTult('Solo se admiten numeros', $cedula)
                error++;
            } else if ($cedula.val().length > 10 || $cedula.val().length < 10) {
                createErrTult('El numero de digitos es incorrecto!', $cedula)
                error++;
            } else if (validarCedula($cedula.val()) != true) {
                createErrTult('La cedula no es correcta', $cedula);
                error++;
            } 
            $cedula.removeClass('invalid_field');
        }

        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //expresion que regula una correcta estructura del email
        //Campos para comprobar el email
        if ($email.val().length == 0) {
            createErrTult('Escriba un email!', $email);
            error++;
        } else {
            if (!emailRegex.test($email.val())) {
                createErrTult('El email es incorrecto', $email);
                error++;
            }
            $email.removeClass('invalid_field');
        }

        //Campos para comprobar la entrada de la contraseña
        if ($pass.val().length == 0) {
            createErrTult('Escriba una contraseña!', $pass);
            error++;
        } else {
            if ($pass.val().length < 4 ) {
                createErrTult('Su contraseña es muy anticuada :v', $pass)
                error++;
            } 
            $pass.removeClass('invalid_field');
        }

        if (error != 0) return;
        self.find('[type=submit]').attr('disabled', 'disabled');

        self.children().fadeOut(300, function () { $(this).remove() })
        $('<p class="login__title">sign in <br><span class="login-edition">welcome to A.Movie</span></p><p class="success">You have successfully<br> signed in!</p>').appendTo(self)
            .hide().delay(300).fadeIn();


        // var formInput = self.serialize();
        // $.post(self.attr('action'),formInput, function(data){}); // end post
    }); // end submit



    function createErrTult(text, $elem) {
        $elem.focus();
        $('<p />', {
            'class': 'inv-em alert alert-danger',
            'html': '<span class="icon-warning"></span>' + text + ' <a class="close" data-dismiss="alert" href="#" aria-hidden="true"></a>',
        })
            .appendTo($elem.addClass('invalid_field').parent())
            .insertAfter($elem)
            .delay(4000).animate({ 'opacity': 0 }, 300, function () { $(this).slideUp(400, function () { $(this).remove() }) });
    }
});

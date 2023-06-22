var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../jwt_secret/config');

var userController = {};

// mostra todos os utilizadores
userController.showAll = function(req, res) {
    User.find({}).exec((err, users) => {
        if (err) {
            console.log('Erro a ler');
            res.status(500).send(err);
        } else {
            res.json(users);
        }
    });
}

// mostra um utilizador por ID
userController.show = function(req, res) {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            console.log('Erro a ler');
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}

// atualiza um utilizador
userController.update = function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, updatedUser) => {
        if (err) {
            console.log('Erro a atualizar');
            res.status(500).send(err);
        } else {
            res.json(updatedUser);
        }
    });
}

// apaga um utilizador
userController.delete = function(req, res) {
    User.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) {
            console.log('Erro a apagar');
            res.status(500).send(err);
        } else {
            res.json({ message: 'Utilizador apagado com sucesso!' });
        }
    });
}

// cria um novo utilizador
userController.create = function(req, res) {
    var user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) {
            console.log('Erro a gravar');
            res.status(500).send(err);
        } else {
            var token = jwt.sign({ id: savedUser._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
    });
};

userController.login = function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;

            if (!isMatch) return res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    });
};



module.exports = userController;

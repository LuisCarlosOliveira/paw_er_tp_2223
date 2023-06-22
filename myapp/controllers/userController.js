var mongoose = require('mongoose');
var User = require('../models/User');

var userController = {};

// mostra todos os utilizadores
userController.showAll = function(req, res) {
    User.find({}, (err, users) => {
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
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log('Erro a ler');
            res.status(500).send(err);
        } else {
            res.json(user);
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
            res.json(savedUser);
        }
    });
}

// atualiza um utilizador
userController.update = function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
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
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log('Erro a apagar');
            res.status(500).send(err);
        } else {
            res.json({ message: 'Utilizador apagado com sucesso!' });
        }
    });
}

module.exports = userController;

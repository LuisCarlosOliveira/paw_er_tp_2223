const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../jwt_secret/config');

const userController = {};

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
};

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
};

// atualiza um utilizador
userController.update = function(req, res) {
    const decoded = jwt.verify(req.headers['x-access-token'], config.secret);
    User.findOne({ _id: decoded.id }, function(err, user) {
        if (err) {
            console.log('Erro a atualizar');
            res.status(500).send(err);
        } else {
            if (user.role == 'admin') {
                // Only an admin can change the role of any user to 'admin', 'moderator' or 'user'.
                User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, updatedUser) => {
                    if (err) {
                        console.log('Erro a atualizar');
                        res.status(500).send(err);
                    } else {
                        res.json(updatedUser);
                    }
                });
            } else if (user.role == 'moderator') {
                // A moderator can only change the role of a user to 'moderator'.
                if (req.body.role && req.body.role != 'moderator') {
                    delete req.body.role;
                }
                User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, updatedUser) => {
                    if (err) {
                        console.log('Erro a atualizar');
                        res.status(500).send(err);
                    } else {
                        res.json(updatedUser);
                    }
                });
            } else {
                // A 'user' can only change their own information and cannot change their 'role' or anyone else's.
                if (req.params.id == decoded.id) {
                    if (req.body.role) {
                        delete req.body.role; // Remove 'role' property if it exists in the request body.
                    }
                    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, updatedUser) => {
                        if (err) {
                            console.log('Erro a atualizar');
                            res.status(500).send(err);
                        } else {
                            res.json(updatedUser);
                        }
                    });
                } else {
                    res.status(403).send('Você não tem permissão para atualizar outros usuários.');
                }
            }
        }
    });
};

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
};

// get utilizador pelo username
userController.showByUsername = function(req, res) {
    User.findOne({username: req.params.username}).exec((err, user) => {
        if (err) {
            console.log('Erro a ler');
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
};

module.exports = userController;


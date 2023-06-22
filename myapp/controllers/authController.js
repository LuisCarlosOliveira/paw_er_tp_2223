const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../jwt_secret/config');
const bcrypt = require('bcryptjs');


const authController = {};

authController.login = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
        .then(function(user){
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                
                if (!isMatch) return res.status(401).send({ auth: false, token: null });

                var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token });
            });
        })
        .catch(function(err){
            next(err);
        });
};

authController.register = function(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;

    var user = new User(req.body);

    user.save((err, savedUser) => {
        if (err) {
            console.log('Erro ao gravar');
            res.status(500).send(err);
        } else {
            var token = jwt.sign({ id: savedUser._id, role: savedUser.role }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
    });
};

authController.verifyToken = function(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    // Remove 'Bearer ' from string
    token = token.slice(7, token.length);

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}


authController.checkUserRole = function(roles) {
    return function(req, res, next) {
        if (roles.includes(req.userRole)) {
            next();
        } else {
            res.status(403).send({ auth: false, message: 'Insufficient permissions.' });
        }
    }
}

//verificar user bloqueado
authController.checkBlocked = function(req, res, next) {
    let token = req.headers['authorization'];
    // Remove 'Bearer ' from string
    token = token.slice(7, token.length);

    const decoded = jwt.verify(token, config.secret);
    User.findOne({ _id: decoded.id }, function(err, user) {
        if (err) {
            console.log('Erro a ler');
            res.status(500).send(err);
        } else {
            if (user.isBlocked) {
                res.status(403).send('Your account is blocked.');
            } else {
                next();
            }
        }
    });
}


module.exports = authController;

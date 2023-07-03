const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../jwt_secret/config");

const userController = {};

// show all users
userController.showAll = function (req, res) {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log("Error Reading");
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
};

// show user by id
userController.show = function (req, res) {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      console.log("Error reading");
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

// update user
userController.update = function (req, res) {
  let token = req.headers["authorization"];
  token = token.slice(7, token.length);
  const decoded = jwt.verify(token, config.secret);
  User.findOne({ _id: decoded.id }, function (err, user) {
    if (err) {
      console.log("Error updating");
      res.status(500).send(err);
    } else {
      if (user.role == "admin") {
        // Only  admin can change the roles
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(
          (err, updatedUser) => {
            if (err) {
              console.log("Error updating");
              res.status(500).send(err);
            } else {
              res.json(updatedUser);
            }
          }
        );
      } else if (user.role == "moderator") {
        // A moderator can only change the role of a user to 'moderator'.
        if (req.body.role && req.body.role != "moderator") {
          delete req.body.role;
        }
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(
          (err, updatedUser) => {
            if (err) {
              console.log("Error updating");
              res.status(500).send(err);
            } else {
              res.json(updatedUser);
            }
          }
        );
      } else {
        // user can only change their own info and cannot change their role or othres
        if (req.params.id == decoded.id) {
          if (req.body.role) {
            delete req.body.role; // Remove role if  exists in  request body.
          }
          User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(
            (err, updatedUser) => {
              if (err) {
                console.log("Error updating");
                res.status(500).send(err);
              } else {
                res.json(updatedUser);
              }
            }
          );
        } else {
          res
            .status(403)
            .send("Insufficient permissions.");
        }
      }
    }
  });
};

// delete user
userController.delete = function (req, res) {
  User.findByIdAndRemove(req.params.id).exec((err) => {
    if (err) {
      console.log("Error deleting");
      res.status(500).send(err);
    } else {
      res.json({ message: "user deleted with success!" });
    }
  });
};

// get utilizador by username
userController.showByUsername = function (req, res) {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      console.log("Error reading");
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

module.exports = userController;

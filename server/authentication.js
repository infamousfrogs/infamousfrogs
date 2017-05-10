var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Sequelize = require('sequelize');
var flash = require('express-flash');

var sequelize = new Sequelize('postgres://localhost:5432/test');
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection is successful');
  })
  .catch(function(err) {
    console.log('Unable to connect to database');
  });

var User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

sequelize.sync();


var createUser = (req, res) => {
  User.findOne({where: {username: req.body.user}}).then(function(user) {
    if (!user) {
      User.create({
        username: req.body.user,
        password: req.body.password
      });
    return true;
    // res.render('./views/login.html', {error: 'Username doesnt exist'})
  } else {
      return false;
      // res.render('./views/login.html', {error: 'Username doesnt exist'})
    }

      // req.session.user = user;
      // res.redirect('/')
  });
};

var checkIfUserExists = (req, res) => {
  User.findOne({where: {username: req.body.user}}).then(function(user) {
    if (!user) {
      res.send('User does not exist!');
    } else {
      if (req.body.password == user.password) {
        res.redirect('/')
      }
      else {
        res.send('INCORRECT PASSWORD')
    }
  };
})
};


module.exports.checkIfUserExists = checkIfUserExists;
module.exports.createUser = createUser;

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Sequelize = require('sequelize');
var flash = require('express-flash');

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/test';
var sequelize = new Sequelize(databaseUrl);

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
  },
  allergens: {
    type: Sequelize.STRING
  }
});

var Recipe = sequelize.define('recipes', {
  username: {
    type: Sequelize.STRING
  },
  recipeId: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  usedIngredientCount: {
    type: Sequelize.INTEGER
  },
  missedIngredientCount: {
    type: Sequelize.INTEGER
  }
});

sequelize.sync();

var createRecipe = (req, res) => {
  Recipe.create({
    username: req.body.username,
    recipeId: req.body.recipeId,
    title: req.body.title,
    image: req.body.image,
    usedIngredientCount: req.body.usedIngredientCount,
    missedIngredientCount: req.body.missedIngredientCount
  });

  res.send();
};

var removeRecipe = (req, res) => {
  Recipe.destroy({
    where: {
      username: req.body.username,
      recipeId: req.body.recipeId
    }
  });

  res.send();
};

var retrieveFavorites = (req, res) => {
  Recipe.findAll({where: {username: req.body.username}})
    .then(function(recipes) {
      res.send(recipes);
    });
};

var createUser = (req, res) => {
  console.log('INSIDE CREATEUSER', req.body);
  User.findOne({where: {username: req.body.username}}).then(function(user) {
    if (!user) {
      User.create({
        username: req.body.username,
        password: req.body.password,
        allergens: req.body.allergens // ****** JEE ADDED *******
      }).then(function() {
        req.session.user = {username: req.body.username, password: req.body.password, allergens: req.body.allergens};
        User.findOne({where: {username: req.body.username}}).then(function(user) {
          res.send(user);
        });
      });
    } else {
      res.send({'useralreadyexists': 'useralreadyexists'});
    }
  });
};

var checkIfUserExists = (req, res) => {
  User.findOne({where: {username: req.body.username}}).then(function(user) {
    if (!user) {
      res.send({'userdoesnotexist': 'userdoesnotexist'});
    } else {
      if (req.body.password === user.password) {
        req.session.user = {username: req.body.username, password: req.body.password};
        res.send(user);
      } else {
        res.send({'incorrectpassword': 'incorrectpassword'});
      }
    }
  });
};


module.exports.checkIfUserExists = checkIfUserExists;
module.exports.createUser = createUser;
module.exports.createRecipe = createRecipe;
module.exports.removeRecipe = removeRecipe;
module.exports.retrieveFavorites = retrieveFavorites;

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var database = require('./database.js');
var Sequelize = require('sequelize');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var PORT = process.env.PORT || 3000;

var app = express();
app.use(flash());
app.use(session({secret: 'keyboard cat'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/../react-client/src'));


app.post('/register', function(req, res) {

  var req = {
    body: {
      user: req.body.username,
      password: req.body.password
    }
  };
  database.createUser(req, res);
});

app.post('/login', function(req, res) {

  var req = {
    body: {
      user: req.body.username,
      password: req.body.password
    }
  };
  database.checkIfUserExists(req, res);
});

app.post('/entry', function(req, res) {
  var ingreds = req.body.toString();

  //setting up params for request to Spoonacular API
  var recipeRetrievalOptions = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?',
    method: 'GET',
    headers: {
      'X-Mashape-Key': 'h88XRdVMrZmshoBOiBWVrmfnfWKTp1SlnIjjsn4adRtjrPpen1',
      'Accept': 'application/json'
    },
    qs: {
      ingredients: ingreds,
      number: 10
    }
  };

  //sending request to Spoonacular
  var finalResponseObj = {};
  var summary = {};

  request(recipeRetrievalOptions, function(error, response, body) {
    response = JSON.parse(response.body);

    for (var i = 0; i < response.length; i++) {
      var newResponse = response[i];

      //setting up object that will be stored inside of finalResponse for each recipe
      var responseObj = {};
      responseObj['id'] = newResponse.id;
      responseObj['title'] = newResponse.title;
      responseObj['image'] = newResponse.image;
      responseObj['usedIngredientCount'] = newResponse.usedIngredientCount;
      responseObj['missedIngredientCount'] = newResponse.missedIngredientCount;
      finalResponseObj[i] = responseObj;
    }
    res.send(finalResponseObj);
  });
});

app.post('/favorite', function(req, res) {
  database.createRecipe(req, res);
});

app.get('/favorite', function(req, res) {
  database.retrieveFavorites(req, res);
});


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

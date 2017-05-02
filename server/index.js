var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/entry', function(req, res) {
var options = {
  url : 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?',
  method: 'GET',
  headers: {
    'X-Mashape-Key': 'h88XRdVMrZmshoBOiBWVrmfnfWKTp1SlnIjjsn4adRtjrPpen1',
    'Accept': 'application/json'
 },
  qs: {
    ingredients: "apples",
    number: 10
  }
}

request(options, function(error, response, body) {
  console.log(JSON.parse(response.body))

})
})

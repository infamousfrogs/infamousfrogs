var pg = require('pg');
// var request = require('request'); // You might need to npm install the request module!
var request = require('request-promise');
var expect = require('chai').expect;

describe('Postgres Database Testing', function() {
  var dbConnection;
  var databaseUrl = 'postgres://localhost:5432/test';

  beforeEach(function(done) {
    dbConnection = new pg.Client(databaseUrl);
    dbConnection.connect();
    var tablename = "recipes"; // TODO: fill this out

    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should call /favoriteCreate and insert `Shit On A Shingle` recipes table in DB', function(done) {

    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/favoriteCreate',
      json: {
        username: 'joneric',
        recipeId: 555,
        title: 'Shit On A Shingle',
        image: 'shitonashingle.jpg',
        usedIngredientCount: 6,
        missedIngredientCount: 0
      }
    }, function (error, response, body) {
      var queryString = 'SELECT * FROM recipes';

      dbConnection.query(queryString, function(err, results) {

        setTimeout(function() {
          expect(results.rows.length).to.equal(1);

          expect(results.rows[0].title).to.equal('Shit On A Shingle');
        }, 500)

        done();
      });
    });
  });

  it('Should insert a `Chow Mein` recipe directly into `recipes` table', function(done) {
    var queryString = `INSERT INTO recipes (username, "recipeId", title, image, "usedIngredientCount", "missedIngredientCount", "createdAt", "updatedAt") VALUES ('joneric', 5150, 'Chow Mein', 'chowmein.png', 8, 2, current_timestamp, current_timestamp)`;

    dbConnection.query(queryString, function(err, results) {
      if (err) {
        console.log('ERROR');
      }
    });

    queryString = 'SELECT * FROM recipes';
    dbConnection.query(queryString, function(err, results) {
      if (err) {
        console.log('ERROR');
      }
      expect(results.rows[0].recipeId).to.equal(5150);
      done();
    });
  });

  it('Should insert user `sgt_slaughter` directly into `users` table', function(done) {
    var queryString = `INSERT INTO users (username, password, "createdAt", "updatedAt") VALUES ('sgt_slaughter', 'wham', current_timestamp, current_timestamp)`;

    dbConnection.query(queryString, function(err, results) {
      if (err) {
        console.log('ERROR');
      }
    });

    queryString = 'SELECT * FROM users';

    dbConnection.query(queryString, function(err, results) {
      if (err) {
        console.log('ERROR');
      }
      expect(results.rows[0].username).to.equal('sgt_slaughter');
    });

    dbConnection.query('truncate ' + 'users', done);
  });

  it('Should call /favoriteDestroy and remove `Shit On A Shingle` from recipes table in DB', function(done) {
    // Post the user to the chat server.
    // console.log('ONE!');
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/favoriteCreate',
      json: {
        username: 'joneric',
        recipeId: 666,
        title: 'Shit On A Shingle',
        image: 'shitonashingle.jpg',
        usedIngredientCount: 6,
        missedIngredientCount: 0
      }
    }, function () {
      // console.log('TWO!');
      request({
        method: 'DELETE',
        uri: 'http://127.0.0.1:3000/favoriteDestroy',
        json: {
          username: 'joneric',
          recipeId: 666
        }
      }, function(error, response, body) {
        // console.log('THREE!', response );
        var queryString = 'SELECT * FROM recipes';

        dbConnection.query(queryString, function(err, results) {
          setTimeout(function() {
            expect(results.rows.length).to.equal(0);
          },500)
            done();
        });

      })
    });
  });

  // it('Should call /favoriteDestroy and remove `Shit On A Shingle` from recipes table in DB', function(done) {
  //   // Post the user to the chat server.
  //   console.log('ONE!');
  //   request({
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:3000/favoriteCreate',
  //     json: {
  //       username: 'joneric',
  //       recipeId: 666,
  //       title: 'Shit On A Shingle',
  //       image: 'shitonashingle.jpg',
  //       usedIngredientCount: 6,
  //       missedIngredientCount: 0
  //     }
  //   })
  //   .then(function() {
  //   console.log('TWO!');
  //     request({
  //       method: 'DELETE',
  //       uri: 'http://127.0.0.1:3000/favoriteDestroy',
  //       json: {
  //         username: 'joneric',
  //         recipeId: 666
  //       }
  //     })
  //   })
  //   .then(function() {
  //     console.log('THREE!');
  //     var queryString = 'SELECT * FROM recipes';

  //     dbConnection.query(queryString, function(err, results) {
  //       // setTimeout(function() {
  //         // expect(results.rows.length).to.equal(0);
  //       // },500)
  //       console.log('FOUR');
  //       console.log('!!!!!!!!!!Rows Length is:', results.rows.length);
  //       expect(results.rows.length).to.equal(0);
  //         // done();
  //     });      
  //   })
  //   .then(function() {
  //     console.log('FIVE!');
  //     var queryString = 'SELECT * FROM recipes';

  //     dbConnection.query(queryString, function(err, results) {
  //       // setTimeout(function() {
  //         // expect(results.rows.length).to.equal(0);
  //       // },500)
  //       console.log('SIX');
  //       console.log('!!!!!!!!!!Rows Length is:', results.rows.length);
  //       expect(results.rows.length).to.equal(0);
  //         done();
  //     });      
  //   })
  // });

  it('Should call /favoriteGet and retrieve a users favorite recipe from DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/favoriteCreate',
      json: {
        username: 'joneric',
        recipeId: 888,
        title: 'Shit On A Shingle',
        image: 'shitonashingle.jpg',
        usedIngredientCount: 6,
        missedIngredientCount: 0
      }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/favoriteGet',
        json: {
          username: 'joneric'
        }
      }, function(error, response, body) {
        setTimeout(function() {
          expect(body[0].title).to.equal('Shit On A Shingle');
        }, 500)
        done();
      })
    });
  });



});

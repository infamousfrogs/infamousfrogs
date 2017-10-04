import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './../components/Nav.jsx';
import IngredientFilter from './../components/IngredientFilter.jsx';
import NearestStoreMap from './../components/NearestStoreMap.jsx';
import RecipesView from './../components/RecipesView.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import RecipesFaves from './../components/RecipesFaves.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import renderHTML from 'react-render-html';
import RecipesPlaceholder from './../components/RecipesPlaceholder.jsx'
import Paper from 'material-ui/Paper';



class homePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finalIngredients: {
        safe: [], // ****** JEE ADDED FEATURE ******
        unsafe: [] // ****** JEE ADDED FEATURE ******
      },

      list: [
        {
          proteins: {
            chicken: false,
            beef: false,
            salmon: false,
            pork: false,
            shrimp: false
          }
        },

        {
          grains: {
            oats: false,
            rice: false,
            pasta: false,
            quinoa: false,
            barley: false
          }
        },

        {
          vegetables: {
            carrots: false,
            potatoes: false,
            broccoli: false,
            tomatoes: false,
            spinach: false
          }
        },

        {
          fruits: {
            bananas: false,
            strawberries: false,
            orange: false,
            apple: false,
            mangoes: false
          }
        },

        {
          dairy: {
            milk: false,
            yogurt: false,
            cheese: false,
            butter: false,
            eggs: false
          }
        }
      ],

      recipeList: {"0":{"id":569201,"title":"Dreamy, creamy milk and white \"pots au chocolat","image":"https://spoonacular.com/recipeImages/Dreamy--creamy-milk-and-white-pots-au-chocolat-569201.jpg","usedIngredientCount":3,"missedIngredientCount":1},"1":{"id":404898,"title":"Tender Biscuits for Two","image":"https://spoonacular.com/recipeImages/Tender-Biscuits-for-Two-404898.jpg","usedIngredientCount":3,"missedIngredientCount":1},"2":{"id":530160,"title":"Blueberry Smoothie Pops","image":"https://spoonacular.com/recipeImages/Blueberry-Smoothie-Pops-530160.jpg","usedIngredientCount":3,"missedIngredientCount":2},"3":{"id":532849,"title":"Cheddar Greek Yogurt Mashed Potatoes","image":"https://spoonacular.com/recipeImages/Cheddar-Greek-Yogurt-Mashed-Potatoes-532849.jpg","usedIngredientCount":3,"missedIngredientCount":2},"4":{"id":607129,"title":"Pesto Parmesan Peppercorn Dressing {Low fat}","image":"https://spoonacular.com/recipeImages/Pesto-Parmesan-Peppercorn-Dressing-{Low-fat}-607129.jpg","usedIngredientCount":3,"missedIngredientCount":2},"5":{"id":626142,"title":"Ham and Cheese Yogurt Biscuits","image":"https://spoonacular.com/recipeImages/Ham-and-Cheese-Yogurt-Biscuits-626142.jpg","usedIngredientCount":3,"missedIngredientCount":2},"6":{"id":715729,"title":"Creamy Blue Cheese Dressing","image":"https://spoonacular.com/recipeImages/creamy-blue-cheese-dressing-715729.jpg","usedIngredientCount":3,"missedIngredientCount":2},"7":{"id":510513,"title":"Coffee Cheesecake Popsicles","image":"https://spoonacular.com/recipeImages/Coffee-Cheesecake-Popsicles-510513.jpg","usedIngredientCount":3,"missedIngredientCount":2},"8":{"id":535980,"title":"Strawberry Cheesecake Popsicles","image":"https://spoonacular.com/recipeImages/Strawberry-Cheesecake-Popsicles-535980.jpg","usedIngredientCount":3,"missedIngredientCount":3},"9":{"id":551181,"title":"Cheese Muffins","image":"https://spoonacular.com/recipeImages/Cheese-Muffins-551181.jpg","usedIngredientCount":3,"missedIngredientCount":3}},

      favoriteList: {},
      homeAddressLat: 37.7836966,
      homeAddressLng: -122.4095136,
      homeAddressWords: '20 main st exeter nh',
      foodComparison: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFavesToggle = this.handleFavesToggle.bind(this);
    this.handleUnfavToggle = this.handleUnfavToggle.bind(this);
    this.fetchRecipeById = this.fetchRecipeById.bind(this);
  }

  componentDidMount() {
    $('body').append(
      '<a href="http://hackreactor.com"> \
      <img style="position: fixed; top: 0; right: 0; border: 0;" \
      src="http://i.imgur.com/x86kKmF.png" \
      alt="Built at Hack Reactor"> \
      </a>'
    );
    $.ajax({
      type: 'GET',
      url: '/userinfo',
      success: (data) => {
        this.handleLogin(data);
      },
      error: (data) => {
        console.log('error');
      }
    });
  }

  handleChange(ingredient) {
    if (this.state.finalIngredients.safe.indexOf(ingredient) === -1) { // ****** JEE ADDED FEATURE ******
      this.state.finalIngredients.safe.push(ingredient); // ****** JEE ADDED FEATURE ******
    } else {
      var index = this.state.finalIngredients.safe.indexOf(ingredient); // ****** JEE ADDED FEATURE ******
      this.state.finalIngredients.safe.splice(index, 1); // ****** JEE ADDED FEATURE ******
    }
  }

  handleLogin(user) {
    this.setState({user});
    // ****** JEE ADDED FEATURE ******
    if (user.allergens) {
      this.state.finalIngredients.unsafe = user.allergens.split(', ');
    } // ****** END OF JEE ADDED FEATURE ******
    var userObj = {
      username: user.username
    };
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/favoriteGet',
      contentType: 'application/json',
      data: JSON.stringify(userObj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        var recipes = {};
        var comparison = {};
        for (var i = 0; i < data.length; i++) {
          recipes[data[i].recipeId] = data[i];

          // ****** JEE ADDED FEATURE ******
          $.ajax({
            type: 'GET',
            url: '/fetchRecipeById',
            contentType: 'application/json',
            data: ({id: data[i].recipeId}),
            dataType: 'text',
            success: (data) => {
              data = JSON.parse(data)
              var nutritionData = JSON.parse(data.nutrition)
              var recTitle = JSON.parse(data.title)
              comparison[recTitle] = [];
              comparison[recTitle].push(nutritionData.nutrients[0].percentOfDailyNeeds, nutritionData.nutrients[1].percentOfDailyNeeds, nutritionData.nutrients[3].percentOfDailyNeeds, nutritionData.nutrients[4].percentOfDailyNeeds, nutritionData.nutrients[7].percentOfDailyNeeds)
            },
            error: (error) => console.log('something went wrong', error)
          }) // ****** END OF JEE ADDED FEATURE ******
        };
        self.setState({favoriteList: recipes});
        self.setState({foodComparison: comparison});
        console.log('login', self.state.foodComparison)
      }
    })
  }

  handleLogout() {
    this.state.finalIngredients.unsafe = [];
    $.ajax({
      type: 'DELETE',
      url: '/logout',
      success: (data) => {
        console.log('successfully logged out');
      },
      error: (data) => {
        console.log('error logging out');
      }
    });

    this.setState({
      favoriteList: {}
    });

    delete this.state.user;
  }

//sends all the checked ingredients to be searched
  handleSubmit() {
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/entry',
      contentType: 'application/json',
      data: JSON.stringify(this.state.finalIngredients),
      dataType: 'text',
      success: (data) => {
        this.setState({recipeList: JSON.parse(data)});
      }
    });
  }


  handleFavesToggle(recipe) {
    if (this.state.user) {
      var recipeId = recipe.id;
      var newFavorite = {};
      newFavorite[recipeId] = recipe;

      var newfavoriteList = Object.assign({}, this.state.favoriteList, newFavorite);
      var newRecipeList = Object.assign({}, this.state.recipeList);

      for (var prop in newRecipeList) {
        if (newRecipeList[prop].id === recipeId) {
          delete newRecipeList[prop];
        }
      }

      this.setState({
        recipeList: newRecipeList,
        favoriteList: newfavoriteList
      });

      var favRecipe = (recipe) => {
        var self = this;
        if (!this.state.user) {
          alert('Please login in order to favorite!');
        } else {
          var newRecipe = {
            username: this.state.user.username,
            recipeId: recipe.id,
            title: recipe.title,
            image: recipe.image,
            usedIngredientCount: recipe.usedIngredientCount,
            missedIngredientCount: recipe.missedIngredientCount
          };

          $.ajax({
            type: 'POST',
            url: '/favoriteCreate',
            contentType: 'application/json',
            data: JSON.stringify(newRecipe),
            dataType: 'text',
            success: (data) => {
              console.log('POSTED');
              // var comparison = {};
              var comparison = self.state.foodComparison;
              // console.log('COMPARISON', comparison)
              // ****** JEE ADDED FEATURE ******
              $.ajax({
                type: 'GET',
                url: '/fetchRecipeById',
                contentType: 'application/json',
                data: ({id: newRecipe.recipeId}),
                dataType: 'text',
                success: (data) => {
                  data = JSON.parse(data)
                  var nutritionData = JSON.parse(data.nutrition)
                  var recTitle = JSON.parse(data.title)
                  comparison[recTitle] = [];
                  comparison[recTitle].push(nutritionData.nutrients[0].percentOfDailyNeeds, nutritionData.nutrients[1].percentOfDailyNeeds, nutritionData.nutrients[3].percentOfDailyNeeds, nutritionData.nutrients[4].percentOfDailyNeeds, nutritionData.nutrients[7].percentOfDailyNeeds)
                },
                error: (error) => console.log('something went wrong', error)
              }) // ****** END OF JEE ADDED FEATURE ******
              self.setState({foodComparison: comparison});
            }
          });
        }
      };

      favRecipe(recipe);
    } else {
      alert('Please login in order to favorite!');
    }
  }

  handleUnfavToggle(recipe) {
    var self = this;
    var recipeId = recipe.id;
    if (JSON.stringify(recipeId).length < 6) {
      recipeId = recipe.recipeId;
    }
    var newFavoriteList = Object.assign({}, this.state.favoriteList);

    delete newFavoriteList[recipeId];

    this.setState({
      favoriteList: newFavoriteList
    });



    var favRecipe = (recipe) => {
      if (!this.state.user) {
        alert('Please login in order to favorite!');
      } else {
        var newRecipe = {
          username: this.state.user.username,
          recipeId: recipeId,
        };

        $.ajax({
          type: 'DELETE',
          url: '/favoriteDestroy',
          contentType: 'application/json',
          data: JSON.stringify(newRecipe),
          dataType: 'text',
          success: (data) => {
            console.log('DESTROYED');
            console.log('DATA', newRecipe.recipeId)
            var comparison = self.state.foodComparison;

              $.ajax({
                type: 'GET',
                url: '/fetchRecipeById',
                contentType: 'application/json',
                data: ({id: newRecipe.recipeId}),
                dataType: 'text',
                success: (data) => {
                  data = JSON.parse(data)
                  var recTitle = JSON.parse(data.title)
                  // var nutritionData = JSON.parse(data.nutrition)
                  delete comparison[recTitle];   // or delete person["age"];
                  console.log('ICE CUBE', comparison)

                },
                error: (error) => console.log('something went wrong', error)
              }) // ****** END OF JEE ADDED FEATURE ******
          }
        });
      }
    };

    favRecipe(recipe);
  }

  fetchRecipeById (recipeId) {
    let recipeInstructions;
    let sampleData = [{"name":"","steps":[{"number":1,"step":"In a food processor pulse the yogurt, milk, cream cheese, condensed milk, and coffee together.Taste to make sure it is sweet enough for you and add more condensed milk/sugar if needed. You can also use Stevia to reduce the calories.","ingredients":[{"id":14209,"name":"coffee","image":"https://spoonacular.com/cdn/ingredients_100x100/coffee.jpg"}],"equipment":[{"id":404771,"name":"food processor","image":"https://spoonacular.com/cdn/equipment_100x100/food-processor.png"}]},{"number":2,"step":"Pour into popsicle molds and let freeze for 4 hours or until frozen.","ingredients":[],"equipment":[{"id":405929,"name":"popsicle molds","image":"https://spoonacular.com/cdn/equipment_100x100/popsicle-molds.jpg"}]}]}];
    if (recipeId !== undefined) {
      //*****RPK ADDED FEATURE*********
      $.ajax({
        type: 'GET',
        url: '/fetchRecipeById',
        contentType: 'application/json',
        data: ({id: recipeId}),
        dataType: 'text',
        success: (data) => {
          //****RPK REFACTORED FEATURE*********
          data = JSON.parse(data);
          var recipeObj = JSON.parse(data.instructions)[0].steps;
          var recipeIngredients = []
          var recipeDescription = ''
          var recipeNutrition = {};
          for (var i = 0; i < recipeObj.length; i++) {
            recipeDescription += ('<br>' + "<strong>Step " + recipeObj[i].number + "</strong>: " + recipeObj[i].step + '</br>')
            if (recipeObj[i].ingredients) {
              for (var j = 0; j < recipeObj[i].ingredients.length; j++) {
                if (recipeIngredients.indexOf(recipeObj[i].ingredients[j].name) === -1) {
                recipeIngredients.push(recipeObj[i].ingredients[j].name)
                }
              }
            }
          }
          var finalIngredients = "<br><strong>Ingredients: "
          for (var i = 0; i < recipeIngredients.length; i++) {
            if (i + 1 === recipeIngredients.length) {
              finalIngredients += (recipeIngredients[i])
            }
            else {
              finalIngredients += (recipeIngredients[i] + ", ")
            }
          }
          recipeDescription = renderHTML(finalIngredients + "</br>" + recipeDescription)
          this.setState({recipeId: recipeDescription});

          //****** RPK ADDED FEATURE *******
          var recipeNutrition = JSON.parse(data.nutrition).nutrients;
          var nutrientTitle = [];
          var percentDaily = [];
          let dialogNutrientTitle = [];
          let dialogPercentDaily = [];
          recipeNutrition.forEach(function(nutrient) {

            // For popover nutrient graphs
            nutrientTitle.push(nutrient.title);
            percentDaily.push(nutrient.percentOfDailyNeeds);
          });

          this.setState({
            nutrientTitle: nutrientTitle,
            percentDaily: percentDaily,
          });
        },
        error: (error) => console.log('fetchRecipeById error', error)
      });
      //*********RPK ADDED FEATURES*********
      //consider refactoring request into homePage
      // $.ajax({
      //   type: 'GET',
      //   // url: `/summary?id=${recipeId}`,
      //   url: `/summary?id=${recipeId}`,
      //   contentType: 'application/json',
      //   data: ({id: recipeId}),
      //   dataType: 'text',
      //   success: (data) => {
      //     this.setState({srcId: data});
      //     this.setState({fetchRecipeById: recipeId});
      //   }
      // });
    }
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleChangeAddress () {
    $.ajax({
      type: 'GET',
      url: '/addressConvert',
      contentType: 'application/json',
      data: ({address: this.state.homeAddressWords}),
      dataType: 'text',
      success: (data) => {
        var result = JSON.parse(data)
        this.setState({
          homeAddressLat: result.results[0].geometry.location.lat,
          homeAddressLng: result.results[0].geometry.location.lng
        })
      },
      error: (err) => {
        alert('ERROR')
        console.log('error is ', err)
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>

          <Nav handleLogin={this.handleLogin} handleLogout={this.handleLogout} user={this.state.user}/>

          <div className="container">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <div className="row">
                  <div className="col">
                  <h2 className="display-4">Choose Your Ingredients</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[0]}/>
                  </div>
                  <div className="col">
                    <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[1]}/>
                  </div>
                  <div className="col">
                    <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[2]}/>
                  </div>
                  <div className="col">
                    <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[3]}/>
                  </div>
                  <div className="col">
                    <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[4]}/>
                  </div>
                  <div className="col text-center">
                    <RaisedButton className="logButton" label="Search" onClick={this.handleSubmit}></RaisedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="display-4">Search Results</h2>
                <RecipesView
                  recipeList = {this.state.recipeList}
                  handleFavesToggle = {this.handleFavesToggle}
                  fetchRecipeById = {this.fetchRecipeById}
                  recipeInstruction = {this.state.recipeId}
                  nutrientTitle = {this.state.nutrientTitle}
                  percentDaily = {this.state.percentDaily}
                />
              </div>
            </div>
          

            <div className="row">
              <div className="col-sm-6">
                <h2 className="display-4">Find A Store</h2>
                <NearestStoreMap
                state={this.state}
                handleChangeAddress={this.handleChangeAddress.bind(this)}
                changeProp={this.changeProp.bind(this)}/>
              </div>
              <div className="col-sm-6">
                <h2 className="display-4">Your Favorites</h2>
                {this.state.user && <RecipesFaves
                  user = {this.state.user.username}
                  recipeList = {this.state.recipeList}
                  favoriteList={this.state.favoriteList}
                  handleFavesToggle={this.handleFavesToggle}
                  handleUnfavToggle={this.handleUnfavToggle}
                  fetchRecipeById = {this.fetchRecipeById}
                  recipeInstruction = {this.state.recipeId}
                  nutrientTitle = {this.state.nutrientTitle}
                  percentDaily = {this.state.percentDaily}
                  dialogNutrientTitle = {this.state.dialogNutrientTitle}
                  dialogPercentDaily = {this.state.dialogPercentDaily}
                  foodComparison = {this.state.foodComparison}
                  srcId = {this.state.srcId}
                  />}
                  {!this.state.user && <RecipesPlaceholder/>}
              </div>
            </div>
          </div>
          <div className="container">
            <footer className="footer">
              <p className="float-right"><a href="#">Back to top</a></p>
              <p><a target="_blank" href="https://github.com/ckeating-nh">Chris</a> &middot; <a target="_blank" href="https://github.com/Kale007">Raj</a> &middot; <a target="_blank" href="https://github.com/JonEricEscobedo">Jon Eric</a> &middot; Project originally created by the <a target="_blank" href="https://github.com/infamousfrogs/infamousfrogs/graphs/contributors">Infamous Frogs</a> &middot; Icon by <a target="_blank" href="https://thenounproject.com/search/?q=vegetable_013-garlic-food-herb-veggie-eat&i=569323">Pham Thi Dieu Linh</a> &middot; 2017</p>
            </footer>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default homePage;

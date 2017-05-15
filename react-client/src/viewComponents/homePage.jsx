import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './../components/Nav.jsx';
import IngredientFilter from './../components/IngredientFilter.jsx';
import RecipesView from './../components/RecipesView.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import RecipesFaves from './../components/RecipesFaves.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


class homePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finalIngredients: [],
      
      list: [
        {proteins: {
          chicken: false,
          beef: false,
          salmon: false,
          pork: false,
          shrimp: false
        }
        },

        {grains: {
          oats: false,
          rice: false,
          pasta: false,
          quinoa: false,
          barley: false
        }
        },

        {vegetables: {
          carrots: false,
          potatoes: false,
          broccoli: false,
          tomatoes: false,
          spinach: false
        }
        },

        {fruits: {
          bananas: false,
          strawberries: false,
          orange: false,
          apple: false,
          mangoes: false
        }
        },

        {dairy: {
          milk: false,
          yogurt: false,
          cheese: false,
          butter: false,
          eggs: false
        }
        }
      ],

      recipeList: {"0":{"id":569201,"title":"Dreamy, creamy milk and white \"pots au chocolat","image":"https://spoonacular.com/recipeImages/Dreamy--creamy-milk-and-white-pots-au-chocolat-569201.jpg","usedIngredientCount":3,"missedIngredientCount":1},"1":{"id":404898,"title":"Tender Biscuits for Two","image":"https://spoonacular.com/recipeImages/Tender-Biscuits-for-Two-404898.jpg","usedIngredientCount":3,"missedIngredientCount":1},"2":{"id":530160,"title":"Blueberry Smoothie Pops","image":"https://spoonacular.com/recipeImages/Blueberry-Smoothie-Pops-530160.jpg","usedIngredientCount":3,"missedIngredientCount":2},"3":{"id":532849,"title":"Cheddar Greek Yogurt Mashed Potatoes","image":"https://spoonacular.com/recipeImages/Cheddar-Greek-Yogurt-Mashed-Potatoes-532849.jpg","usedIngredientCount":3,"missedIngredientCount":2},"4":{"id":607129,"title":"Pesto Parmesan Peppercorn Dressing {Low fat}","image":"https://spoonacular.com/recipeImages/Pesto-Parmesan-Peppercorn-Dressing-{Low-fat}-607129.jpg","usedIngredientCount":3,"missedIngredientCount":2},"5":{"id":626142,"title":"Ham and Cheese Yogurt Biscuits","image":"https://spoonacular.com/recipeImages/Ham-and-Cheese-Yogurt-Biscuits-626142.jpg","usedIngredientCount":3,"missedIngredientCount":2},"6":{"id":715729,"title":"Creamy Blue Cheese Dressing","image":"https://spoonacular.com/recipeImages/creamy-blue-cheese-dressing-715729.jpg","usedIngredientCount":3,"missedIngredientCount":2},"7":{"id":510513,"title":"Coffee Cheesecake Popsicles","image":"https://spoonacular.com/recipeImages/Coffee-Cheesecake-Popsicles-510513.jpg","usedIngredientCount":3,"missedIngredientCount":2},"8":{"id":535980,"title":"Strawberry Cheesecake Popsicles","image":"https://spoonacular.com/recipeImages/Strawberry-Cheesecake-Popsicles-535980.jpg","usedIngredientCount":3,"missedIngredientCount":3},"9":{"id":551181,"title":"Cheese Muffins","image":"https://spoonacular.com/recipeImages/Cheese-Muffins-551181.jpg","usedIngredientCount":3,"missedIngredientCount":3}},

      favoriteList: {}
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
    if (this.state.finalIngredients.indexOf(ingredient) === -1) {
      this.state.finalIngredients.push(ingredient);
    } else {
      var index = this.state.finalIngredients.indexOf(ingredient);
      this.state.finalIngredients.splice(index, 1);
    }
  }

  handleLogin(user) {
    this.setState({user});
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
        var obj = {};
        for (var i = 0; i < data.length; i++) {
          obj[data[i].recipeId] = data[i];
        }
        self.setState({favoriteList: obj});
      }
    });
  }

  handleLogout() {
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
      $.ajax({
        type: 'GET',
        url: '/fetchRecipeById',
        contentType: 'application/json',
        data: ({id: recipeId}),
        dataType: 'text',
        success: (data) => {
          let recipeIdObj = { recipeId: data};
          this.setState(recipeIdObj);
          return this.state.recipeId;
        },
        error: (error) => console.log('fetchRecipeById error', error)
      });
  }

  render() {
    return (
    <MuiThemeProvider>
      <div>
        <Nav handleLogin={this.handleLogin} handleLogout={this.handleLogout} user={this.state.user}/>
        <h4>Filter by Ingredient(s):</h4>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[0]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[1]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[2]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[3]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[4]}/>
<<<<<<< 92b3028e20df7970d576b8dd7e7f2944c260d986
=======

>>>>>>> css addons and instructions and view
        <RecipesView
          recipeList = {this.state.recipeList}
          handleFavesToggle = {this.handleFavesToggle}
          fetchRecipeById = {this.fetchRecipeById}
          recipeInstruction = {this.state.recipeId}
          />
<<<<<<< 92b3028e20df7970d576b8dd7e7f2944c260d986
        {this.state.user && <RecipesFaves user = {this.state.user.username} recipeList = {this.state.recipeList} favoriteList={this.state.favoriteList} handleFavesToggle={this.handleFavesToggle} handleUnfavToggle={this.handleUnfavToggle}/>}
=======

        {this.state.user && <RecipesFaves 
          user = {this.state.user.username} 
          recipeList = {this.state.recipeList} 
          favoriteList={this.state.favoriteList} 
          handleFavesToggle={this.handleFavesToggle} 
          handleUnfavToggle={this.handleUnfavToggle}
          recipeInstruction = {this.state.recipeId}/>}
      
>>>>>>> css addons and instructions and view
        <RaisedButton label="Search" onClick={this.handleSubmit}></RaisedButton>
      </div>
   </MuiThemeProvider>

    );
  }
}

export default homePage;

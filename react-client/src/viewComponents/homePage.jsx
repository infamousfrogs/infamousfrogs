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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFavesToggle = this.handleFavesToggle.bind(this);
    this.handleUnfavToggle = this.handleUnfavToggle.bind(this);
  }

//changes the state of an ingredient to be checked or unchecked
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
    console.log(user.username)
    var userObj = {
      username: user.username
    }
    var self = this
    $.ajax({
      type: 'POST',
      url: '/favoriteGet',
      contentType: 'application/json',
      data: JSON.stringify(userObj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        var obj = {}
        for (var i = 0; i < data.length; i++) {
          obj[data[i].recipeId] = data[i]
        }
        self.setState({favoriteList: obj})
      }
    });
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
          }
          console.log("IN HERE")
          $.ajax({
            type: 'POST',
            url: '/favoriteCreate',
            contentType: 'application/json',
            data: JSON.stringify(newRecipe),
            dataType: 'text',
            success: (data) => {
              console.log("POSTED");
            }
          })
        }
      };

      favRecipe(recipe);
    }
  else {
    alert("Please login in order to favorite!")

  }
}

  handleUnfavToggle(recipe) {
    console.log("IN HERE", this.state.favoriteList)
    console.log(recipe);
    var recipeId = recipe.id;
    if (JSON.stringify(recipeId).length < 6) {
      recipeId = recipe.recipeId
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
        console.log(recipeId)
        var newRecipe = {
          username: this.state.user.username,
          recipeId: recipeId,
        }
        console.log(newRecipe)
        console.log("IN HERE")
        $.ajax({
          type: 'DELETE',
          url: '/favoriteDestroy',
          contentType: 'application/json',
          data: JSON.stringify(newRecipe),
          dataType: 'text',
          success: (data) => {
            console.log("DESTROYED");
          }
        })
      }
    };

    favRecipe(recipe);
  }

  render() {
    if (this.state["404898"]) {
      console.log(this.state["404898"])
    }
    return (
    <MuiThemeProvider>
      <div>
        <Nav handleLogin = {this.handleLogin}/>
        <h4>Filter by Ingredient(s):</h4>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[0]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[1]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[2]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[3]}/>
        <IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[4]}/>
        <RecipesView recipeList = {this.state.recipeList} handleFavesToggle={this.handleFavesToggle}/>
        {this.state.user && <RecipesFaves user = {this.state.user.username} recipeList = {this.state.recipeList} favoriteList={this.state.favoriteList} handleFavesToggle={this.handleFavesToggle} handleUnfavToggle={this.handleUnfavToggle}/>}
        <RaisedButton onClick={this.handleSubmit} label='Search'></RaisedButton>
      </div>
   </MuiThemeProvider>

    );
  }
}

export default homePage;

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IngredientFilter from './components/IngredientFilter.jsx';
import RecipesView from './components/RecipesView.jsx'



class App extends React.Component {
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
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

//changes the state of an ingredient to be checked or unchecked
  handleChange(ingredient) {
    if (this.state.finalIngredients.indexOf(ingredient) === -1) {
      this.state.finalIngredients.push(ingredient)
    }
    else {
      var index = this.state.finalIngredients.indexOf(ingredient)
      this.state.finalIngredients.splice(index, 1)
    }
  }

//sends all the checked ingredients to be searched
  handleSubmit() {
    var self = this
    $.ajax({
      type: 'POST',
      url: '/entry',
      contentType: 'application/json',
      data: JSON.stringify(this.state.finalIngredients),
      dataType: 'text',
      success: (data) => {
        this.setState({recipeList: JSON.parse(data)})
        console.log(data)
      }
     })
   }


  render() {
    console.log(this.state.list[0])
    return (
      <div>
        <h1>Pick Your Ingredients</h1>
        <IngredientFilter  handleChange = {this.handleChange} ingredients={this.state.list[0]}/>
        <IngredientFilter  handleChange = {this.handleChange} ingredients={this.state.list[1]}/>
        <IngredientFilter  handleChange = {this.handleChange} ingredients={this.state.list[2]}/>
        <IngredientFilter  handleChange = {this.handleChange} ingredients={this.state.list[3]}/>
        <IngredientFilter  handleChange = {this.handleChange} ingredients={this.state.list[4]}/>
        <RecipesView recipeList = {this.state.recipeList} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IngredientChoices from '/.components/IngredientChoices.jsx'
import IngredientFilter from './components/IngredientFitler.jsx';
import RecipeView from './components/RecipeView.jsx'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      proteins: {},
      grains: {},
      vegetables: {},
      fruits: {},
      dairy: {}

    };
  }

//changes the state of an ingredient to be checked or unchecked
  handleChange() {
    console.log("change status of ingredient to true/checkmarked")
  }

//sends all the checked ingredients to be searched
  handleSubmit() {
    this.setState({});
  }

  fetchRecipes() {
    var context = this;
    $.ajax({
      type: 'GET',
      url: '/entry',
      contentType: 'application/json'
     })
    .done((data) => {
     console.log('success', data);
     context.setState({recipes: data});
   })
    .fail((err) => {
     console.log('There was an error!', err);
    })
  }

  render() {
    return (
      <div>
        <h1>Pick Your Ingredients</h1>
        <IngredientFilter />
        <RecipeView recipes={this.state.recipes} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

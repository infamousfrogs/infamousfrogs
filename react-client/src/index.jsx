import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IngredientFilter from './components/IngredientFilter.jsx';
import RecipeView from './components/RecipeView.jsx'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      
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
    ]
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
    console.log(this.state.list[0])
    return (
      <div>
        <h1>Pick Your Ingredients</h1>
        <IngredientFilter  ingredients={this.state.list[0]}/>
        <IngredientFilter  ingredients={this.state.list[1]}/>
        <IngredientFilter  ingredients={this.state.list[2]}/>
        <IngredientFilter  ingredients={this.state.list[3]}/>
        <IngredientFilter  ingredients={this.state.list[4]}/>
        <RecipeView recipes={this.state.recipes} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

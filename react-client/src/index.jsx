import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IngredientChoices from '/.components/IngredientChoices.jsx'
import IngredientFilter from './components/IngredientFitler.jsx';
import RecipeView from './components/RecipeView.jsx'


class App extends React.Component {
  contructor(props) {
    super(props);

    this.state = {

      proteins: proteins,
      grains: grains,
      vegetables: vegetables,
      fruits: fruits,
      dairy: dairy

    }

    
  }


  render() {
    return(

      <h1>App Name Here</h1>
      <IngredientFilter />


      )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
import React from 'react';
import RecipeItem from './RecipeItem.jsx'

//display all the recipes retrieved from API 

const RecipesView = (props) => (
  <div>
    {props.recipeList.map( recipe => 
    
    <RecipeItem className="recipeItem" recipe={recipe} key={recipe.id} /> 

    )}
  </div>

)

export default RecipesView;
import React from 'react';
import RecipeItem from './RecipeItem.jsx'

//display all the recipes retrieved from API

const RecipesView = (props) => {
  return(
  <div>

  {props.recipeList ? Object.keys(props.recipeList).map((key, index) => {
    console.log(key)


  return <RecipeItem className="recipeItem" recipe={props.recipeList[index]} key={props.recipeList[index].id} />

  }) : <p>No recipes</p>
}
  </div>

)
}

export default RecipesView;

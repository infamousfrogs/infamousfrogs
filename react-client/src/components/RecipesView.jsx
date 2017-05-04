import React from 'react';
import RecipeItem from './RecipeItem.jsx';

//display all the recipes retrieved from API
const RecipesView = (props) => {
  return (
  <div>
    {props.recipeList ?
      Object.keys(props.recipeList).map((key, index) =>
      <RecipeItem key={props.recipeList[index].id} recipe={props.recipeList[index]}/>
      ) : <p>No recipes</p>
    }
  </div>
  );
};

export default RecipesView;
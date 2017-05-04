import React from 'react';

const RecipeItem = (props) => (
  <div>
    <div className="Recipe" >
      title: {props.recipe.title}<br/>
      <img className="RecipeImage" src ={props.recipe.image}/><br/>
      used IngredientCount: {props.recipe.usedIngredientCount}<br/>
      missed IngredientCount: {props.recipe.missedIngredientCount}<br/>
      likes: {props.recipe.likes}
    </div>
  </div>
);

export default RecipeItem;
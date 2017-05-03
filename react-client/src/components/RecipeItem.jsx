import React from 'react';

const RecipeItem = (props) => (
  <div>
    <div className="Recipe" >
     title: {props.recipe.title}<br></br>
     <img className="RecipeImage" src ={props.recipe.image}/><br></br>
   {/* '' remove quotes from image src to disply*/}
   used IngredientCount: {props.recipe.usedIngredientCount} <br></br>
     missed IngredientCount: {props.recipe.missedIngredientCount} <br></br>
     likes: {props.recipe.likes} 


    </div>
  </div>)

export default RecipeItem

{/*
  id, title, image, imageType, usedIngredientCount, missedIngredientCount, likes
*/}
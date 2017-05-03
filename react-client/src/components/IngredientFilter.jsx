import React from 'react';

//user clicks on ingredient category (i.e. proteins), checks ingredients they want to serach for


const IngredientFilter = (props) => {
const arrayOfIngredients = [];
var label = Object.keys(props.ingredients)[0]
for (var key in props.ingredients[label]) {
  arrayOfIngredients.push(key)
}

return(
<div>
  <h3>{label}</h3>
   <form>
   <input type="checkbox" value="ingredient2"/> {arrayOfIngredients[0]}<br/> 
    <input type="checkbox" value="ingredient2"/> {arrayOfIngredients[1]}<br/> 
    <input type="checkbox" value="ingredient3"/> {arrayOfIngredients[2]}<br/> 
    <input type="checkbox" value="ingredient4"/> {arrayOfIngredients[3]}<br/> 
    <input type="checkbox" value="ingredient5"/> {arrayOfIngredients[4]}<br/> 
  </form>
</div>
  )
};


export default IngredientFilter;
import React from 'react';

//user clicks on ingredient category (i.e. proteins), checks ingredients they want to serach for

const IngredientFilter = (props) => (

  <div>

    <div>
      <h1>Proteins</h1>
      <ul>
        <li> Chicken</li>
        <li> Fish </li>
        <li> Beef </li>
        <li> Pork </li>
      </ul>
    </div>

    <div>
      <h1>Grains</h1>
      <ul>
        <li> Pasta </li>
        <li> Rice </li>
        <li> Quinoa </li>
        <li> Something Else? </li>
      </ul>
    </div>

    <div>
      <h1>Vegetables</h1>
      <ul>
        <li> Potatoes </li>
        <li> Broccoli </li>
        <li> Carrots </li>
        <li> Tomatoes </li>
      </ul>
    </div>

    <div>
      <h1>Fruits</h1>
      <ul>
        <li> Banana </li>
        <li> Strawberries </li>
        <li> Orange </li>
        <li> Apple </li>
      </ul>

    </div>

    <div>
      <h1>Dairy</h1>
      <ul>
        <li> Milk </li>
        <li> Yogurt </li>
        <li> Cheese </li>
        <li> Something Else? </li>
      </ul>

    </div>


  </div>
  
  );


export default IngredientFilter;
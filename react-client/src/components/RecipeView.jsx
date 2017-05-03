import React from 'react';

//display all the recipes retrieved from API 

const RecipeView = (props) => (
	<div>
		{props.recipes.map(recipe =>
	    	<RecipeEntry recipe={recipe} />)}
	</div>

	);

export default RecipeView;


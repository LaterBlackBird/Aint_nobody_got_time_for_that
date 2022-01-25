import React from 'react';
import './recipe.css'


function Recipe({ recipe }) {
  return (
    <div className='recipe_card flex_col_center'>
      <i className="fas fa-times recipe_remove_button hide"></i>
      <p>{recipe.name}</p>
    </div>);
}

export default Recipe;

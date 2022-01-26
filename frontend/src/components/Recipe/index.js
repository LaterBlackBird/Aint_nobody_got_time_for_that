import React from 'react';
import { useDispatch } from 'react-redux';
import { removeRecipe } from '../../store/recipe';
import './recipe.css'


function Recipe({ recipe, dayId }) {
  const dispatch = useDispatch();

  const removeFromDay = () => {
    dispatch(removeRecipe({dayId, recipe}))
  }

  return (
    <div className='recipe_card flex_col_center'>
      <p>{recipe.name}</p>
      <i className="fas fa-times recipe_remove_button hide" onClick={() => removeFromDay()}></i>
    </div>);
}

export default Recipe;

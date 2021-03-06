import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeRecipe } from '../../store/recipe';
import { setSelected } from '../../store/recipe';
import { Modal } from '../../context/modals';
import './recipe.css'
import RecipeRead from '../RecipeReadModal';


function Recipe({ recipe, dayId }) {
  const dispatch = useDispatch();
  const [showRecipeModal, setShowRecipeModal] = useState(false)


  const removeFromDay = (e) => {
    e.stopPropagation();
    dispatch(removeRecipe({ dayId, recipe }))
  }


  const selectRecipe = () => {
    dispatch(setSelected(recipe));
    setShowRecipeModal(true)
  }

  return (
    <>
      <div className='recipe_card flex_col_center' onClick={() => selectRecipe()}>
        <p>{recipe.name}</p>
        <i className="fas fa-times recipe_remove_button hide" onClick={(e) => removeFromDay(e)}></i>
      </div>
      {showRecipeModal && (
        <Modal onClose={() => setShowRecipeModal(false)}>
          <RecipeRead showRecipeModal={setShowRecipeModal}/>
        </Modal>
      )}
    </>
  );
}

export default Recipe;

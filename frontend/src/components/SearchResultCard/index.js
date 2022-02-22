import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSearchedRecipe, setSelected } from '../../store/recipe';
import { Modal } from '../../context/modals';
import RecipeRead from '../RecipeReadModal';
import './searchResultCard.css'



function SearchResultCard({ recipe, dayId, setSearchText }) {
  const dispatch = useDispatch();
  const [showRecipeModal, setShowRecipeModal] = useState(false)

  const addRecipe = (e) => {
    e.stopPropagation();
    dispatch(addSearchedRecipe({ dayId, recipe }))
  }

  const selectRecipe = () => {
    dispatch(setSelected(recipe));
    setShowRecipeModal(true)
  }


  return (
    <>
      <div className="search_result_card" onClick={() => selectRecipe()}>
        <p>{recipe.name}</p>
        <p className='plus' onClick={(e) => addRecipe(e)}>+</p>
      </div>
      {
        showRecipeModal && (
          <Modal onClose={() => setShowRecipeModal(false)}>
            <RecipeRead showRecipeModal={setShowRecipeModal} setSearchText={setSearchText}/>
          </Modal>
        )
      }
    </>
  );
}

export default SearchResultCard;

import React from 'react';
import { useDispatch } from 'react-redux';
import { addSearchedRecipe } from '../../store/recipe';
import './searchResultCard.css'



function SearchResultCard({recipe, dayId}) {
  const dispatch = useDispatch();

  const addRecipe = () => {
    // console.log(recipe)
    dispatch(addSearchedRecipe({dayId, recipe}))
  }

  return (
    <div className="search_result_card">
        <p>{recipe.name}</p>
        <p className='plus' onClick={() => addRecipe()}>+</p>
    </div>
    );
}

export default SearchResultCard;

import React from 'react';
import './searchResultCard.css'


function SearchResultCard({recipe, dayId}) {
  const addRecipe = () => {
    console.log('click')
  }

  return (
    <div className="search_result_card">
        <p>{recipe.name}</p>
        <p className='plus' onClick={() => addRecipe()}>+</p>
    </div>
    );
}

export default SearchResultCard;

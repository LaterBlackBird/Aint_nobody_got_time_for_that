import React from 'react';

function SearchResultCard({recipe, dayId}) {
  return (
    <div className="search_result_card">
        <p>{recipe.name}</p>
    </div>
    );
}

export default SearchResultCard;

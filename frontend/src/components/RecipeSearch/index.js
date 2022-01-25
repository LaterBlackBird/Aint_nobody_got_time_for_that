import React from 'react';
import './recipeSearch.css'

function RecipeSearch({ setShowRecipeSearch, dayId }) {

    return (
            <div className="search_container flex_col_center">
                <h2>Search For A Recipe</h2>
                <form action="">
                    <input type="search" placeholder='Search by name or tag'/>
                </form>
            </div>
    );
}

export default RecipeSearch;

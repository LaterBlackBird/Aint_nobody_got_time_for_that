import React from 'react';
import './recipeSearchModal.css'

function RecipeSearchModal({ setShowRecipeSearch, dayId }) {
    return (
        <div className="modal_background flex_col_center" onClick={() => setShowRecipeSearch(false)}>
            <div className="search_container flex_col_center">
                <i className="fas fa-times recipe_search_close" onClick={() => setShowRecipeSearch(false)}></i>
                <p>{dayId}</p>
            </div>
        </div>
    );
}

export default RecipeSearchModal;

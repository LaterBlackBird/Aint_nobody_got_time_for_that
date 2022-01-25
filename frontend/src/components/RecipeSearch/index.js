import React, { useState } from 'react';
import { useEffect } from 'react';
import './recipeSearch.css'

function RecipeSearch({ setShowRecipeSearch, dayId }) {
    const [searchText, setSearchText] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        
    })

    const search = () => { }

    return (
        <div className="search_container">
            <h2>Search For A Recipe</h2>
            <form onSubmit={(e)=> e.preventDefault()}>
                <input
                    name='searchRecipes'
                    ref={(input) => { input && input.focus() }}
                    type='search'
                    placeholder={errors.length ? errors[0] : `Search by name or tag`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search_input"
                />
            </form>

        </div>
    );
}

export default RecipeSearch;

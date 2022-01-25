import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../store/recipe';
import './recipeSearch.css'

function RecipeSearch({ dayId }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText) dispatch(searchRecipes(searchText));
    },[dispatch, searchText])


    return (
        <div className="search_container">
            <h2>Search For A Recipe</h2>
            <form onSubmit={(e)=> e.preventDefault()}>
                <input
                    name='searchRecipes'
                    ref={(input) => { input && input.focus() }}
                    type='search'
                    placeholder='Search by name or tag'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search_input"
                />
            </form>

        </div>
    );
}

export default RecipeSearch;

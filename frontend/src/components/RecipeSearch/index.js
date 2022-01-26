import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../../store/recipe';
import SearchResultCard from '../SearchResultCard';
import './recipeSearch.css'

function RecipeSearch({ dayId }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector(state => state.recipes.searchResults);
    let searchResultsArray = [];

    useEffect(() => {
        if (searchText) dispatch(searchRecipes(searchText));
    }, [dispatch, searchText])


    if (searchResults) {
        searchResultsArray = Object.values(searchResults);
    }

    return (
        <div className="search_container">
            <h2>Search For A Recipe</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
            <div className="search_results_container">
                {searchResultsArray &&
                    searchResultsArray.map(result => (
                        <SearchResultCard key={result.id} recipe={result} dayId={dayId}/>
                    ))
                }
            </div>

        </div>
    );
}

export default RecipeSearch;

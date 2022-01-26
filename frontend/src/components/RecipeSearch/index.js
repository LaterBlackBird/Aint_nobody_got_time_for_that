import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../../store/recipe';
import SearchResultCard from '../SearchResultCard';
import './recipeSearch.css'

function RecipeSearch({ dayId }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const searchResultsArr = useSelector(state => Object.values(state.recipes.searchResults))

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
            <div className="search_results_container">
                {/* {searchResultsArr &&
                    searchResultsArr.map(result => {
                        <SearchResultCard key={result.id} recipe={result} dayId={dayId}/>
                    })
                } */}
            </div>

        </div>
    );
}

export default RecipeSearch;

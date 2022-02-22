import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes, clearSearchResultsState, clearPrevSelectedRecipeState } from '../../store/recipe';
import SearchResultCard from '../SearchResultCard';
import { Modal } from '../../context/modals';
import CreateRecipe from '../CreateRecipeModal';
import './recipeSearch.css'

function RecipeSearch({ dayId }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector(state => state.recipes.searchResults);
    const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false)
    let searchResultsArray = [];

    // Search the database when the user enters a new search term
    useEffect(() => {
        //debounce the search action hitting the database
        const dealySearch = setTimeout(() => {
            if (searchText) dispatch(searchRecipes(searchText));
        }, 400);

        return () => clearTimeout(dealySearch)
    }, [dispatch, searchText])

    // if there are search results, create an array for mapping
    if (searchResults) {
        searchResultsArray = Object.values(searchResults);
    }

    // when the create option is selected, clear search field and results
    const createOptionSelected = () => {
        setSearchText('');
        dispatch(clearSearchResultsState())
        dispatch(clearPrevSelectedRecipeState());
        setShowCreateRecipeModal(true);
    }


    return (
        <>
            <div className="search_container">
                <div className="search_info">
                    <h2 id='search_header'>Search For A Recipe or
                        <span id='create_recipe_button'
                            onClick={() => createOptionSelected()}> Create Your Own</span>
                    </h2>

                    <input
                        name='searchRecipes'
                        ref={(input) => { input && input.focus() }}
                        type='search'
                        placeholder='Search by name or tag'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search_input"
                    />

                    <div className="search_results_container">
                        {searchResultsArray &&
                            searchResultsArray.map(result => (
                                <SearchResultCard key={result.id} recipe={result} dayId={dayId} setSearchText={setSearchText}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                showCreateRecipeModal && (
                    <Modal onClose={() => setShowCreateRecipeModal(false)}>
                        <CreateRecipe showModal={setShowCreateRecipeModal} />
                    </Modal>
                )
            }
        </>
    );
}

export default RecipeSearch;

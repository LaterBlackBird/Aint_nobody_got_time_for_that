import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../../store/recipe';
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

    useEffect(() => {
        if (searchText) dispatch(searchRecipes(searchText));
    }, [dispatch, searchText])

    // if there are search results, create a an array for mapping
    if (searchResults) {
        searchResultsArray = Object.values(searchResults);
    }

    const closeModal = ()=> {
        setShowCreateRecipeModal(false)
    }

    return (
        <>
            <div className="search_container">
                <div className="search_info">
                    <h2 id='search_header'>Search For A Recipe or
                        <span id='create_recipe_button'
                            onClick={() => setShowCreateRecipeModal(true) }> Create Your Own</span>
                    </h2>
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
                                <SearchResultCard key={result.id} recipe={result} dayId={dayId} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                showCreateRecipeModal && (
                    <Modal onClose={() => setShowCreateRecipeModal(false)}>
                        <CreateRecipe showModal={setShowCreateRecipeModal}/>
                    </Modal>
                )
            }
        </>
    );
}

export default RecipeSearch;

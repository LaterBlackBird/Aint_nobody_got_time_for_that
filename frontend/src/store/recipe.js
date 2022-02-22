// Thunk action creators
// Retrieve information from the database
export const getRecipesForToday = dayId => async (dispatch) => {
    const response = await fetch(`/api/daily_schedules/${dayId}/recipes`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipes(data));
    }
}


// Search the database
export const searchRecipes = searchTerm => async (dispatch) => {
    const response = await fetch(`/api/recipes/search/${searchTerm}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSearchResults(data));
    }
}

// Add searched recipe to day card
export const addSearchedRecipe = data => async (dispatch) => {
    const { dayId, recipe } = data;
    const recipeId = recipe.id;
    const response = await fetch(`/api/recipes/day_recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dayId, recipeId })
    });
    if (response.ok) {
        const addDayId = dayId;
        const addRecipe = recipe;
        dispatch(searchedRecipeToState({ addDayId, addRecipe }));
    }
}

// Remove recipe from day card
export const removeRecipe = data => async (dispatch) => {
    const { dayId, recipe } = data;
    const recipeId = recipe.id;
    await fetch(`/api/recipes/day_recipes/${dayId}/${recipeId}`, {
        method: 'DELETE',
    });
    const removeDayId = dayId;
    const removeRecipe = recipeId;
    dispatch(removeThisRecipe({ removeDayId, removeRecipe }));
}

// reset state
export const resetRecipeState = () => async (dispatch) => {
    dispatch(resetState());
}

// Load tags for a selected recipe
export const getRecipeTags = recipe_id => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe_id}/tags`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipeTags(data));
    }
}

// Action types
// To help prevent errors
const GET_RECIPES_BY_DAY = 'daily_schedules/GET_RECIPES_BY_DAY'
const SET_SELECTED_RECIPE = 'daily_schedules/SET_SELECTED_RECIPE'
const LOAD_SEARCHED_RECIPES = 'recipes/LOAD_SEARCHED_RECIPES'
const ADD_SEARCHED_RECIPE = 'recipes/ADD_SEARCHED_RECIPES'
const CLEAR_SEARCH = 'recipes/CLEAR_SEARCH'
const REMOVE_RECIPE_FROM_DAY = 'recipes/REMOVE_RECIPE_FROM_DAY'
const RESET_STATE = 'recipes/RESET_STATE'
const CLEAR_SELECTED_STATE = 'recipe/CLEAR_SELECTED_STATE'
const LOAD_RECIPE_TAGS = 'recipes/LOAD_RECIPE_TAGS'
const TOGGLE_EDIT_FLAG = 'recipes/TOGGLE_EDIT_FLAG'

// Actions
const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES_BY_DAY,
        recipes
    }
}

export const setSelected = (recipe) => {
    return {
        type: SET_SELECTED_RECIPE,
        recipe
    }
}

const loadSearchResults = (recipes) => {
    return {
        type: LOAD_SEARCHED_RECIPES,
        recipes
    }
}

const searchedRecipeToState = (recipe) => {
    return {
        type: ADD_SEARCHED_RECIPE,
        recipe
    }
}

export const clearSearchResultsState = () => {
    return {
        type: CLEAR_SEARCH,
        payload: null
    }
}

const removeThisRecipe = (recipe) => {
    return {
        type: REMOVE_RECIPE_FROM_DAY,
        recipe
    }
}

const resetState = () => {
    return {
        type: RESET_STATE,
        payload: null
    }
}

export const clearPrevSelectedRecipeState = () => {
    return {
        type: CLEAR_SELECTED_STATE,
        payload: null
    }
}

const loadRecipeTags = (tags) => {
    return {
        type: LOAD_RECIPE_TAGS,
        tags
    }
}

export const editFlagToggle = (bool) => {
    return {
        type: TOGGLE_EDIT_FLAG,
        bool
    }
}


// Reducer
// Replace state with database information from thunk
export default function recipeReducer(state = { daily: {}, tags: {}, selected: {}, editFlag: false }, action) {
    switch (action.type) {
        case GET_RECIPES_BY_DAY:
            const updateState = { ...state };
            updateState.daily[action.recipes.dayId] = {}
            //normalize data
            action.recipes.recipes.forEach(recipe => {
                updateState.daily[action.recipes.dayId][recipe.id] = recipe
            });
            return updateState;
        case SET_SELECTED_RECIPE:
            const selectedState = {...state};
            selectedState.selected = action.recipe;
            return selectedState;
        case LOAD_SEARCHED_RECIPES:
            const searchState = { ...state };
            searchState['searchResults'] = {};
            action.recipes.search_results.forEach(recipe => {
                searchState.searchResults[recipe.id] = recipe;
            })
            return {
                ...searchState
            };
        case CLEAR_SEARCH:
            const clearSearchState = { ...state };
            delete clearSearchState['searchResults'];
            return {
                ...clearSearchState
            };
        case ADD_SEARCHED_RECIPE:
            const { addDayId, addRecipe } = action.recipe;
            const addSearchState = { ...state };
            if (!addSearchState.daily[addDayId]) {
                addSearchState.daily[addDayId] = {};
            }
            addSearchState.daily[addDayId][addRecipe.id] = addRecipe;
            return addSearchState;
        case REMOVE_RECIPE_FROM_DAY:
            const { removeDayId, removeRecipe } = action.recipe;
            const removeFromDayState = { ...state };
            delete removeFromDayState.daily[removeDayId][removeRecipe]
            return removeFromDayState;
        case RESET_STATE:
            const resetState = { daily: {} };
            return resetState;
        case CLEAR_SELECTED_STATE:
            const clearSelectedState = {...state};
            clearSelectedState.selected = {};
            clearSelectedState.tags = {};
            clearSelectedState.editFlag = false;
            return clearSelectedState;
        case LOAD_RECIPE_TAGS:
            const addTagState = { ...state };
            addTagState.tags = {};
            action.tags.tags.forEach(tag => {
                addTagState.tags[tag.id]=tag.name
            })
            return addTagState
        case TOGGLE_EDIT_FLAG:
            const editState = {...state};
            editState.editFlag = action.bool;
            return editState;
        default:
            return state;
    }
}

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
    const {dayId, recipe} = data;
    const recipeId = recipe.id;
    const response = await fetch(`/api/recipes/day_recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dayId, recipeId })
    });
    if (response.ok) {
        dispatch(searchedRecipeToState(data));
    }
}



// Action types
// To help prevent errors
const GET_RECIPES_BY_DAY = 'daily_schedules/GET_RECIPES_BY_DAY'
const LOAD_SEARCHED_RECIPES = 'recipes/LOAD_SEARCHED_RECIPES'
const ADD_SEARCHED_RECIPE = 'recipes/ADD_SEARCHED_RECIPES'


// Actions
const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES_BY_DAY,
        recipes
    }
}

const loadSearchResults = (recipes) => {
    return {
        type: LOAD_SEARCHED_RECIPES,
        recipes
    }
}

const searchedRecipeToState = (recipes) => {
    return {
        type: ADD_SEARCHED_RECIPE,
        recipes
    }
}



// Reducer
// Replace state with database information from thunk
export default function recipeReducer(state = { daily: {} }, action) {
    switch (action.type) {
        case GET_RECIPES_BY_DAY:
            const updateState = { ...state };
            updateState.daily[action.recipes.dayId] = {}
            //normalize data
            action.recipes.recipes.forEach(recipe => {
                updateState.daily[action.recipes.dayId][recipe.id] = recipe
            });
            return updateState;
        case LOAD_SEARCHED_RECIPES:
            const searchState = { ...state };
            searchState['searchResults'] = {...action.recipes.search_results}
            return {
                ...searchState
            };
        case ADD_SEARCHED_RECIPE:
            const {dayId, recipe} = action.recipes;
            const addSearchState = {...state};
            console.log(addSearchState)
            console.log(addSearchState.daily[dayId]?true:false)
            if (!addSearchState.daily[dayId]) {
                addSearchState.daily[dayId] = {};
            }
            addSearchState.daily[dayId][recipe.id] = recipe;
            return addSearchState;
        default:
            return state;
    }
}

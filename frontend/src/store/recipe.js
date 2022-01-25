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



// Action types
// To help prevent errors
const GET_RECIPES_BY_DAY = 'daily_schedules/GET_RECIPES_BY_DAY'
const LOAD_SEARCHED_RECIPES = 'recipes/LOAD_SEARCHED_RECIPES'



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



// Reducer
// Replace state with database information from thunk
export default function recipeReducer(state = { daily:{ } }, action) {
    switch (action.type) {
        case GET_RECIPES_BY_DAY:
            const recipesForToday = { ...state, ...action.recipes };
            return {
                ...recipesForToday
            };
        case LOAD_SEARCHED_RECIPES:
                const searchResults = { ...action.recipes };
                return {
                    ...searchResults
                };
        default:
            return state;
    }
}

// Thunk action creators
// Retrieve information from the database
export const getRecipesForToday = dayId => async (dispatch) => {
    const response = await fetch(`/api/daily_schedules/${dayId}/recipes`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipes(data));
    }
}



// Action types
// To help prevent errors
const GET_RECIPES_BY_DAY = 'daily_schedules/GET_RECIPES_BY_DAY'



// Actions
const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES_BY_DAY,
        recipes
    }
}



// Reducer
// Replace state with database information from thunk
export default function recipeReducer(state = { }, action) {
    switch (action.type) {
        case GET_RECIPES_BY_DAY:
            const recipesForToday = { ...state, ...action.recipes };
            return {
                ...recipesForToday
            };
        default:
            return state;
    }
}
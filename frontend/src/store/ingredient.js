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
const GET_RECIPES = 'daily_schedules/GET_RECIPES'



// Actions
const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        recipes
    }
}




// Reducer
// Replace state with database information from thunk
export default function ingredientReducer(state = { }, action) {
    switch (action.type) {
        case GET_RECIPES:
            const updateState = { ...state };
            updateState.daily[action.recipes.dayId] = {}
            //normalize data
            action.recipes.recipes.forEach(recipe => {
                updateState.daily[action.recipes.dayId][recipe.id] = recipe
            });
            return updateState;
        default:
            return state;
    }
}

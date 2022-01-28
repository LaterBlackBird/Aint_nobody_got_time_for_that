// Thunk action creators
// Retrieve information from the database
export const loadIngredients = recipeId => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ingredients`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipes(data));
    }
}



// Action types
// To help prevent errors
const GET_INGREDIENTS = 'recipes/GET_INGREDIENTS'



// Actions
const loadRecipes = (ingredients) => {
    return {
        type: GET_INGREDIENTS,
        ingredients
    }
}



// Reducer
// Replace state with database information from thunk
export default function ingredientReducer(state = { }, action) {
    switch (action.type) {
        case GET_INGREDIENTS:
            const loadState = { };
            //normalize data
            action.ingredients.ingredients.forEach(ingredient => {
                loadState[ingredient.id] = ingredient
            });
            return loadState;
        default:
            return state;
    }
}

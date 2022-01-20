// Thunk action creators
// Retrieve information from the database
export const getMealPlans = userId => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/meal_plans`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadMealPlans(data));
    }
}

//Add a new meal plan to the database
export const addMealPlan = planInfo => async (dispatch) => {
    const { userId, newPlanName } = planInfo
    console.log(userId, newPlanName)
    // const response = await fetch(`/api/users/${userId}/meal_plans`);
    // if (response.ok) {
    //     const data = await response.json();
    //     dispatch(loadMealPlans(data));
    // }
}


// Action types
// To help prevent errors
const GET_MEAL_PLANS = 'user/GET_MEAL_PLANS'


// Actions
const loadMealPlans = (userMealPlans) => {
    return {
        type: GET_MEAL_PLANS,
        userMealPlans
    }
}


// Reducer
// Replace state with database information from thunk
export default function mealPlanReducer(state = {}, action) {
    switch (action.type) {
        case GET_MEAL_PLANS:
            // normalize data
            const allMealPlans = {};
            action.userMealPlans.meal_plans.forEach(mealPlan => {
                allMealPlans[mealPlan.id] = mealPlan;
            });
            return {
                ...allMealPlans,
            };
        default:
            return state;
    }
}

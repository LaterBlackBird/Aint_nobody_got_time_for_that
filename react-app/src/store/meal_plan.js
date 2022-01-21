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
    const response = await fetch(`/api/meal_plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPlanName, userId })
    });
    if (response.ok) {
        const plan = await response.json();
        dispatch(createMealPlan(plan));
        return plan;
    }
}

export const selectThisPlan = planInfo => async (dispatch) => {
    dispatch(selectedPlan(planInfo));
}

// Action types
// To help prevent errors
const GET_MEAL_PLANS = 'user/GET_MEAL_PLANS'
const ADD_MEAL_PLANS = 'meal_plans/ADD_MEAL_PLANS'
const SET_MEAL_PLAN = 'meal_plans/SET_MEAL_PLAN'


// Actions
const loadMealPlans = (userMealPlans) => {
    return {
        type: GET_MEAL_PLANS,
        userMealPlans
    }
}

const createMealPlan = (newMealPlan) => {
    return {
        type: ADD_MEAL_PLANS,
        newMealPlan
    }
}

const selectedPlan = (plan) => {
    return {
        type: SET_MEAL_PLAN,
        plan
    }
}


// Reducer
// Replace state with database information from thunk
export default function mealPlanReducer(state = { all_plans: {} }, action) {
    switch (action.type) {
        case GET_MEAL_PLANS:
            const allMealPlans = {};
            action.userMealPlans.meal_plans.forEach(mealPlan => {
                // normalize data
                allMealPlans[mealPlan.id] = mealPlan;
            });
            return {
                all_plans: { ...allMealPlans },
            };
        case ADD_MEAL_PLANS:
            let addState = { ...state };
            addState.all_plans[action.newMealPlan.id] = action.newMealPlan;
            return addState
        case SET_MEAL_PLAN:
            let setState = { ...state };
            setState['selected'] = action.plan;
            return setState
        default:
            return state;
    }
}

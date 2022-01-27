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

// user has made a meal plan selection
export const selectThisPlan = planInfo => async (dispatch) => {
    dispatch(selectedPlan(planInfo));
}

// edit the name of a meal plan
export const editMealPlan = (selectedPlanId, editedPlanName) => async (dispatch) => {
    const response = await fetch(`/api/meal_plans/${selectedPlanId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ editedPlanName })
    });
    if (response.ok) {
        const plan = await response.json();
        dispatch(editThisMealPlan(plan));
        return plan;
    }
}

// delete a meal plan
export const deleteMealPlan = (selectedPlanId) => async (dispatch) => {
    const response = await fetch(`/api/meal_plans/${selectedPlanId}`, {
        method: 'DELETE',

    });
    if (response.ok) {
        dispatch(deleteThisMealPlan(selectedPlanId));
    }
}

// delete the selected meal plan
export const deleteSelectedPlan = () => async (dispatch) => {
    dispatch(deleteSelection());
}

//Reset meal plan state
export const resetMealPlans = () => async (dispatch) => {
    dispatch(resetAllMeals());
}

// Action types
// To help prevent errors
const GET_MEAL_PLANS = 'user/GET_MEAL_PLANS'
const ADD_MEAL_PLANS = 'meal_plans/ADD_MEAL_PLANS'
const SET_MEAL_PLAN = 'meal_plans/SET_MEAL_PLAN'
const DELETE_MEAL_PLAN = 'meal_plans/DELETE_MEAL_PLAN'
const DELETE_SELECTION = 'meal_plans/DELETE_SELECTION'
const RESET_MEAL_PLANS = 'meal_plans/RESET_MEAL_PLANS'


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

const editThisMealPlan = (newMealPlan) => {
    return {
        type: ADD_MEAL_PLANS,
        newMealPlan
    }
}

const deleteThisMealPlan = (planId) => {
    return {
        type: DELETE_MEAL_PLAN,
        planId
    }
}

const deleteSelection = () => {
    return {
        type: DELETE_SELECTION,
        payload: null
    }
}

const resetAllMeals = () => {
    return {
        type: RESET_MEAL_PLANS,
        payload: null
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
            addState['selected'] = action.newMealPlan;
            return addState;
        case SET_MEAL_PLAN:
            let setState = { ...state };
            setState['selected'] = action.plan;
            return setState;
        case DELETE_MEAL_PLAN:
            let deleteState = { ...state };
            delete deleteState.all_plans[action.planId];
            delete deleteState.selected;
            return deleteState;
        case DELETE_SELECTION:
            let deleteSelectionState = { ...state };
            delete deleteSelectionState.selected;
            return deleteSelectionState;
        case RESET_MEAL_PLANS:
            let resetState = { all_plans: {} };
            return resetState;
        default:
            return state;
    }
}

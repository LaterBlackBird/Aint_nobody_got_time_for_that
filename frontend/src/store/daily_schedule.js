// Thunk action creators
// Retrieve information from the database
export const getDialySchedules = mealPlanId => async (dispatch) => {
    const response = await fetch(`/api/meal_plans/${mealPlanId}/daily_schedules`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDialySchedules(data));
    }
}

// Add a new daily schedule to the database
export const addDailySchedule = dayInfo => async (dispatch) => {
    const { planId, newDayName } = dayInfo
    const response = await fetch(`/api/daily_schedules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newDayName, planId })
    });
    if (response.ok) {
        const day = await response.json();
        dispatch(createDay(day));
        return day;
    }
}


// Edit a daily schedule
export const editDailySchedule = (dailyScheduleId, editedDayName) => async (dispatch) => {
    const response = await fetch(`/api/daily_schedules/${dailyScheduleId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ editedDayName })
    });
    if (response.ok) {
        const day = await response.json();
        dispatch(editThisDay(day));
        return day;
    }
}

// Delete a daily schedule
export const deleteDailySchedule = (dayId) => async (dispatch) => {
    const response = await fetch(`/api/daily_schedules/${dayId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteThisDay(dayId));
    }
}

// Reset daily schedules
export const resetDialySchedules = () => async (dispatch) => {
    dispatch(resetAllDays());
}



// Action types
// To help prevent errors
const GET_DAILY_SCHEDULES = 'meal_plans/GET_DAILY_SCHEDULES'
const ADD_EDIT_DAILY_SCHEDULE = 'daily_schedules/ADD_EDIT_DAILY_SCHEDULE'
const DELETE_DAILY_SCHEDULE = 'meal_plans/DELETE_DAILY_SCHEDULE'
const RESET_DAILY_SCHEDULE = 'meal_plans/RESET_DAILY_SCHEDULE'


// Actions
const loadDialySchedules = (dailySchedules) => {
    return {
        type: GET_DAILY_SCHEDULES,
        dailySchedules
    }
}

const createDay = (dailyScheduleInfo) => {
    return {
        type: ADD_EDIT_DAILY_SCHEDULE,
        dailyScheduleInfo
    }
}

const editThisDay = (dailyScheduleInfo) => {
    return {
        type: ADD_EDIT_DAILY_SCHEDULE,
        dailyScheduleInfo
    }
}

const deleteThisDay = (dayId) => {
    return {
        type: DELETE_DAILY_SCHEDULE,
        dayId
    }
}

const resetAllDays = () => {
    return {
        type: RESET_DAILY_SCHEDULE,
        payload: null
    }
}


// Reducer
// Replace state with database information from thunk
export default function dailyScheduleReducer(state = {}, action) {
    switch (action.type) {
        case GET_DAILY_SCHEDULES:
            const allDailySchedules = {};
            action.dailySchedules.daily_schedules.forEach(dailySchedule => {
                // normalize data
                allDailySchedules[dailySchedule.id] = dailySchedule;
            });
            return {
                ...allDailySchedules
            };
        case ADD_EDIT_DAILY_SCHEDULE:
            let addState = { ...state };
            addState[action.dailyScheduleInfo.id] = action.dailyScheduleInfo;
            return addState;
        case DELETE_DAILY_SCHEDULE:
            let deleteState = { ...state };
            delete deleteState[action.dayId];
            return deleteState;
        case RESET_DAILY_SCHEDULE:
            let resetState = {};
            return resetState;
        default:
            return state;
    }
}

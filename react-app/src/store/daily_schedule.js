// Thunk action creators
// Retrieve information from the database
export const getDialySchedules = mealPlanId => async (dispatch) => {
    const response = await fetch(`/api/meal_plans/${mealPlanId}/daily_schedules`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDialySchedules(data));
    }
}

//Add a new daily schedule to the database
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


// Action types
// To help prevent errors
const GET_DAILY_SCHEDULES = 'meal_plans/GET_DAILY_SCHEDULES'
const ADD_EDIT_DAILY_SCHEDULE = 'daily_schedules/ADD_EDIT_DAILY_SCHEDULE'



// Actions
const loadDialySchedules = (dailySchedules) => {
    return {
        type: GET_DAILY_SCHEDULES,
        dailySchedules
    }
}

const createDay = (newDailySchedule) => {
    return {
        type: ADD_EDIT_DAILY_SCHEDULE,
        newDailySchedule
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
            addState[action.newDailySchedule.id] = action.newDailySchedule;
            return addState;
        default:
            return state;
    }
}

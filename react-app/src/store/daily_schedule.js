// Thunk action creators
// Retrieve information from the database
export const getDialySchedules = mealPlanId => async (dispatch) => {
    const response = await fetch(`/api/meal_plans/${mealPlanId}/daily_schedules`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDialySchedules(data));
    }
}



// Action types
// To help prevent errors
const GET_DAILY_SCHEDULES = 'meal_plans/GET_DAILY_SCHEDULES'



// Actions
const loadDialySchedules = (dailySchedules) => {
    return {
        type: GET_DAILY_SCHEDULES,
        dailySchedules
    }
}


// Reducer
// Replace state with database information from thunk
export default function dailyScheduleReducer(state = { }, action) {
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
        default:
            return state;
    }
}

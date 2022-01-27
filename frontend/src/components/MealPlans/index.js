import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMealPlan, selectThisPlan } from '../../store/meal_plan';
import { getDialySchedules } from '../../store/daily_schedule';
import './meal_plans.css'

function MealPlans() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const plans = useSelector(state => state.mealPlans.all_plans);
    const selectedPlan = useSelector(state => state.mealPlans.selected)
    const plansArray = Object.values(plans);
    const [newPlanFormVisibility, setNewPlanFormVisibility] = useState(false)
    const [newPlanName, setNewPlanName] = useState('')
    const [errors, setErrors] = useState([]);


    // Select a meal plan, create selection store
    const selectMealPlan = (plan) => {
        dispatch(selectThisPlan(plan))
        dispatch(getDialySchedules(plan.id))
    }

    // Create a new meal plan
    const addPlan = async (e) => {
        e.preventDefault();
        let userId = user.id;
        setErrors([]);

        if (newPlanName.length < 1) {
            setErrors(['Name Cannot Be Empty'])
        } else {
            dispatch(addMealPlan({ userId, newPlanName }));
            setNewPlanFormVisibility(false);
            setNewPlanName('')
        }
    }

    let newPlanForm;
    if (newPlanFormVisibility) {
        newPlanForm = (
            <form onSubmit={addPlan} className='flex_col_center'>
                <input
                    name='newPlanName'
                    ref={(input) => { input && input.focus() }}
                    type='text'
                    placeholder={errors.length ? errors[0] : 'New Plan Name'}
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    className="meal_plan_card flex_col_center"
                />
                <p onClick={() => setNewPlanFormVisibility(false)}>Cancel</p>
            </form>
        )
    }


    return (
        <div id="meal_plan_container" className='flex_col_center'>
            <div id='meal_plan_list' className='flex_col_center'>
                <div id="meal_plan_header" className='flex_col_center'>
                    <p>MEAL PLANS</p>
                </div>
                {plansArray.map(plan => (
                    <div className={`meal_plan_card flex_col_center ${selectedPlan && selectedPlan.id === plan.id?"selected_plan":""}`} key={plan.id} onClick={(e) => selectMealPlan(plan)}>
                        <p>{plan.name}</p>
                    </div>
                ))}
                {newPlanFormVisibility && newPlanForm}
            </div>

            <div id="add_plan" className='flex_col_center' onClick={() => setNewPlanFormVisibility(true)}>
                <p>Add A Meal Plan</p>
                <p className='plus'>+</p>
            </div>
        </div>
    )
}

export default MealPlans;

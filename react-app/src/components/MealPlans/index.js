import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom'
// import { useHistory, Redirect } from 'react-router';
import { getMealPlans } from '../../store/meal_plan';
import './meal_plans.css'

function MealPlans() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const plans = useSelector(state => state.mealPlans);
    const plansArray = Object.values(plans);
    const [newPlanFormVisibility, setNewPlanFormVisibility] = useState(false)
    const [ newPlanName, setNewPlanName ] = useState('')

    useEffect(() => {
        dispatch(getMealPlans(user.id));
    }, [dispatch, user])

    const selectMealPlan = (planId) => {
        console.log('you selected ', plans[planId].name);
    }

    const addPlan = () => {
        console.log(`sudo added ${newPlanName} for now`)
    }

    let newPlanForm;
    if (newPlanFormVisibility) {
        newPlanForm = (
            <form onSubmit={addPlan} className=''>
                {/* <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div> */}
                <input
                    name='newPlanName'
                    ref={(input) => {input && input.focus() }}
                    type='text'
                    placeholder='New Plan Name'
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                />
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
                    <div className="meal_plan_card flex_col_center" key={plan.id} onClick={() => selectMealPlan(plan.id)}>
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

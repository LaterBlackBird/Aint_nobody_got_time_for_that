import React, { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(getMealPlans(user.id));
    }, [dispatch, user])

    const selectMealPlan = (planId) => {
        console.log('you selected ', plans[planId].name);
    }

    return (
        <div id="meal_plan_container">
            <div id="meal_plan_header">
                <p>MEAL PLANS</p>
            </div>
            {plansArray.map(plan => (
                <div className="meal_plan_card" key={plan.id} onClick={() => selectMealPlan(plan.id)}>
                    <p>{plan.name}</p>
                </div>
            ))}
        </div>
    )
}

export default MealPlans;

import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMealPlans, addMealPlan } from '../../store/meal_plan';
import MealPlans from '../MealPlans';
import './homepage.css'



function Homepage() {

    return (
        <div id="homepage_container">
            <MealPlans />
            <div id="daily_schedule_workspace">

            </div>
        </div>
    );
}

export default Homepage;

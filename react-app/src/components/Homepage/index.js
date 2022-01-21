import React from 'react';
import { useSelector } from 'react-redux';
import MealPlans from '../MealPlans';
import './homepage.css'



function Homepage() {
    const selectedPlan = useSelector(state => state.mealPlans.selected);

    

    return (
        <div id="homepage_container">
            <MealPlans />
            <div id="daily_schedule_workspace">
                {selectedPlan &&
                    <span id='workspace_name_header'>
                        {selectedPlan.name}
                        <i className="far fa-edit workspace_name_icon"></i>
                        <i className="far fa-trash-alt workspace_name_icon"></i>
                    </span>
                }
            </div>
        </div>
    );
}

export default Homepage;

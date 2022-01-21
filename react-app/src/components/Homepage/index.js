import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealPlans from '../MealPlans';
import { editMealPlan } from '../../store/meal_plan';
import './homepage.css'



function Homepage() {
    const dispatch = useDispatch();
    const selectedPlan = useSelector(state => state.mealPlans.selected);
    const [editPlanNameVisibility, setEditPlanNameVisibility] = useState(false);
    const [editedPlanName, setEditedPlanName] = useState('')
    const [errors, setErrors] = useState([]);

    const editPlan = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (editedPlanName.length < 1) {
            setErrors(['Name Cannot Be Empty'])
        } else {
            dispatch(editMealPlan(selectedPlan.id, editedPlanName))
            setEditPlanNameVisibility(false);
            setEditedPlanName('')
        }
    }

    let editPlanForm;
    if (editPlanNameVisibility) {
        editPlanForm = (
            <form onSubmit={editPlan} id='edit_plan_form' className=''>
                <div className='flex_col_center'>
                    <input
                        name='editedPlanName'
                        ref={(input) => { input && input.focus() }}
                        type='text'
                        placeholder={errors.length ? errors[0] : `${selectedPlan.name}`}
                        value={editedPlanName}
                        onChange={(e) => setEditedPlanName(e.target.value)}
                        className="flex_col_center"
                    />
                    <p onClick={() => setEditPlanNameVisibility(false)}>Cancel</p>
                </div>
            </form>
        )
    }

    return (
        <div id="homepage_container">
            <MealPlans />
            <div id="daily_schedule_workspace">
                {selectedPlan && !editPlanNameVisibility &&
                    <span id='workspace_name_header'>
                        {selectedPlan.name}
                        <i className="far fa-edit workspace_name_icon" onClick={() => setEditPlanNameVisibility(true)}></i>
                        <i className="far fa-trash-alt workspace_name_icon"></i>
                    </span>
                }
                {editPlanNameVisibility && editPlanForm}
            </div>
        </div>
    );
}

export default Homepage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealPlans from '../MealPlans';
import { getMealPlans, editMealPlan, deleteMealPlan } from '../../store/meal_plan';
import './homepage.css'



function Homepage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const selectedPlan = useSelector(state => state.mealPlans.selected);
    const [editPlanNameVisibility, setEditPlanNameVisibility] = useState(false);
    const [editedPlanName, setEditedPlanName] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getMealPlans(user.id));
    }, [dispatch])

    useEffect(() => {

    })

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

    const deletePlan = async () => {
        dispatch(deleteMealPlan(selectedPlan.id))
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
                {!selectedPlan &&
                    <span className='workspace_name_header'>Select or Create A Meal Plan</span>
                }
                {selectedPlan && !editPlanNameVisibility &&
                    <span className='workspace_name_header'>
                        {selectedPlan.name}
                        <i className="far fa-edit workspace_name_icon" onClick={() => setEditPlanNameVisibility(true)}></i>
                        <i className="far fa-trash-alt workspace_name_icon" onClick={() => deletePlan()}></i>
                    </span>
                }
                {editPlanNameVisibility && editPlanForm}
                <div id="daily_schedule_container">

                </div>
            </div>
        </div>
    );
}

export default Homepage;

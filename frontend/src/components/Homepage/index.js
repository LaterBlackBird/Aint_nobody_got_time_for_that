import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealPlans from '../MealPlans';
import DailyScheduleCard from '../DailyScheduleCard';
import { getMealPlans, editMealPlan, deleteMealPlan, deleteSelectedPlan } from '../../store/meal_plan';
import { getDialySchedules, addDailySchedule, resetDialySchedules } from '../../store/daily_schedule';
import './homepage.css'



function Homepage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const selectedPlan = useSelector(state => state.mealPlans.selected);
    const dailySchedulesArray = useSelector(state => Object.values(state.dailySchedules));
    const [editPlanNameVisibility, setEditPlanNameVisibility] = useState(false);
    const [editedPlanName, setEditedPlanName] = useState('')
    const [newDayFormVisibility, setNewDayFormVisibility] = useState(false)
    const [newDayName, setNewDayName] = useState('')
    const [errors, setErrors] = useState([]);


    // Retrieve and update meal plans associated with the user
    useEffect(() => {
        dispatch(getMealPlans(user.id));
    }, [dispatch, user])


    // Reset daily schedules when the user selects or deletes a meal plan
    useEffect(() => {
        if (selectedPlan) dispatch(getDialySchedules(selectedPlan.id));
        else if (!selectedPlan) dispatch(resetDialySchedules())
    }, [dispatch, selectedPlan])


    // Edit the meal plan name
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
                        maxLength={40}
                    />
                    <p onClick={() => setEditPlanNameVisibility(false)}>Cancel</p>
                </div>
            </form>
        )
    }


    // Delete the meal plan
    const deletePlan = async () => {
        let confirm = window.confirm('This will permanently delete this meal plan')
        if (confirm) {
            await dispatch(deleteMealPlan(selectedPlan.id));
            dispatch(deleteSelectedPlan());
        }
    }


    // Create a new daily schedule
    const addDay = async (e) => {
        e.preventDefault();
        let planId = selectedPlan.id;
        setErrors([]);

        if (newDayName.length < 1) {
            setErrors(['Name Cannot Be Empty'])
        } else {
            dispatch(addDailySchedule({ planId, newDayName }));
            setNewDayFormVisibility(false);
            setNewDayName('')
        }
    }

    let newDayForm;
    if (newDayFormVisibility) {
        newDayForm = (
            <form onSubmit={addDay} className='daily_schedule_card flex_col_center'>
                <input
                    name='newDayName'
                    ref={(input) => { input && input.focus() }}
                    type='text'
                    placeholder={errors.length ? errors[0] : 'New Plan Name'}
                    value={newDayName}
                    onChange={(e) => setNewDayName(e.target.value)}
                    className="daily_schedule_header flex_col_center"
                    maxLength={40}
                />
                <p onClick={() => setNewDayFormVisibility(false)}>Cancel</p>
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
                    {dailySchedulesArray &&
                        dailySchedulesArray.map(dailySchedule => (
                            <DailyScheduleCard key={dailySchedule.id} dailySchedule={dailySchedule} />
                        ))
                    }

                    {newDayFormVisibility && newDayForm}

                    {selectedPlan && !newDayFormVisibility &&
                        <div id="add_daily_schedule_card" className='flex_col_center'>
                            <div id='add_button' className='flex_col_center' onClick={() => setNewDayFormVisibility(true)}>
                                <p>Add A Day</p>
                                <p className='plus'>+</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Homepage;

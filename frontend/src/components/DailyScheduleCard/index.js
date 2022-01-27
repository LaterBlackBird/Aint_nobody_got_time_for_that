import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editDailySchedule, deleteDailySchedule } from '../../store/daily_schedule';
import { getRecipesForToday } from '../../store/recipe';
import Recipe from '../Recipe';
import { RecipeSearchModal } from '../../context/recipeSearchModal';
import RecipeSearch from '../RecipeSearch';
import './daily_schedule.css'

function DailyScheduleCard({ dailySchedule }) {
    const dispatch = useDispatch();
    const [editDayNameFormVisibility, setEditDayNameFormVisibility] = useState(false)
    const [editedDayName, setEditedDayName] = useState('')
    const dayId = (dailySchedule.id).toString();
    const todaysRecipes = useSelector(state => state.recipes.daily[dayId])
    const [showRecipeSearchModal, setShowRecipeSearchModal] = useState(false)
    const [errors, setErrors] = useState([]);
    let recipeArr = [];


    useEffect(() => {
        dispatch(getRecipesForToday(dailySchedule.id))
    }, [dispatch, dailySchedule])


    // if there are recipes available after loading the card, create a an array for mapping
    if (todaysRecipes) {
        recipeArr = Object.values(todaysRecipes);
    }


    //edit the daily schedule name
    const editDay = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (editedDayName.length < 1) {
            setErrors(['Name Cannot Be Empty'])
        } else {
            dispatch(editDailySchedule(dailySchedule.id, editedDayName))
            setEditDayNameFormVisibility(false);
            setEditedDayName('')
        }
    }
    

    let editDayForm;
    if (editDayNameFormVisibility) {
        editDayForm = (
            <form onSubmit={editDay} className='daily_schedule_header flex_col_center'>
                <input
                    name='editDayName'
                    ref={(input) => { input && input.focus() }}
                    type='text'
                    placeholder={errors.length ? errors[0] : `${dailySchedule.name}`}
                    value={editedDayName}
                    onChange={(e) => setEditedDayName(e.target.value)}
                    className="edit_daily_schedule_header flex_col_center"
                    maxLength={40}
                />
                <p onClick={() => setEditDayNameFormVisibility(false)}>Cancel</p>
            </form>
        )
    }


    //delete the daily schedule
    const deleteDay = () => {
        let confirm = window.confirm('This will permanently delete this day')
        if (confirm) {
            dispatch(deleteDailySchedule(dailySchedule.id))
        }
    }



    return (
        <div className="daily_schedule_card flex_col_center">
            <i className="fas fa-times daily_schedule_delete" onClick={() => deleteDay()}></i>
            <div className='daily_schedule_header flex_col_center'>
                {editDayNameFormVisibility ? editDayForm :
                    <p onClick={() => setEditDayNameFormVisibility(true)}>{dailySchedule.name}</p>
                }
            </div>
            <div className="recipes_container flex_col_center">
                {recipeArr &&
                    recipeArr.map(recipe => (
                        <Recipe key={recipe.id} recipe={recipe} dayId={dailySchedule.id} />
                    ))
                }
            </div>
            <div id='add_button' className='flex_col_center' onClick={() => setShowRecipeSearchModal(true)}>
                <p>Add A Recipe</p>
                <p className='plus'>+</p>
            </div>
            {showRecipeSearchModal && (
                <RecipeSearchModal onClose={() => setShowRecipeSearchModal(false)}>
                    <RecipeSearch dayId={dailySchedule.id} />
                </RecipeSearchModal>
            )}
        </div>
    );
}

export default DailyScheduleCard;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editDailySchedule, deleteDailySchedule } from '../../store/daily_schedule';
import './daily_schedule.css'

function DailyScheduleCard({ dailySchedule }) {
    const dispatch = useDispatch();
    const [editDayNameFormVisibility, setEditDayNameFormVisibility] = useState(false)
    const [editedDayName, setEditedDayName] = useState('')
    const [errors, setErrors] = useState([]);


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
                />
                <p onClick={() => setEditDayNameFormVisibility(false)}>Cancel</p>
            </form>
        )
    }


    //delete the daily schedule
    const deleteDay = () => {
        console.log('click')
        dispatch(deleteDailySchedule(dailySchedule.id))
    }


    return (
        <div className="daily_schedule_card flex_col_center">
            <i className="fas fa-times daily_schedule_delete" onClick={() => deleteDay()}></i>
            <div className='daily_schedule_header flex_col_center'>
                {editDayNameFormVisibility ? editDayForm :
                    <p onClick={() => setEditDayNameFormVisibility(true)}>{dailySchedule.name}</p>
                }

            </div>
        </div>
    );
}

export default DailyScheduleCard;

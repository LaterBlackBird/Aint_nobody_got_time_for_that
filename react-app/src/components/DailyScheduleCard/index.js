import React from "react";
import { useSelector } from 'react-redux';
import './daily_schedule.css'

function DailyScheduleCard({ dailySchedule }) {

    return (
        <div className="daily_schedule_card flex_col_center">
            <div className='daily_schedule_header flex_col_center'>
                <p>{dailySchedule.name}</p>
            </div>
        </div>
    );
}

export default DailyScheduleCard;

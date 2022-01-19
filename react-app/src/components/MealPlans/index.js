import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom'
// import { useHistory, Redirect } from 'react-router';
import { getMealPlans } from '../../store/meal_plan';

function MealPlanList() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getMealPlans(user.id))

      }, [dispatch, user])

    return (
        <p>Meal Plans in console</p>
    )
}

export default MealPlanList;

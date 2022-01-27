import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { resetDialySchedules } from '../../store/daily_schedule';
import { resetRecipeState } from '../../store/recipe';
import { resetMealPlans } from '../../store/meal_plan';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetMealPlans());
    await dispatch(resetDialySchedules());
    await dispatch(resetRecipeState());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;

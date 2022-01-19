import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import scrum_board from '../images/undraw_scrum_board_re_wk7v.svg'
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='user_auth_page'>
      <div className="user_auth_header">
        <p>AINT NOBODY GOT TIME FOR THAT</p>
      </div>
      <div className="user_auth_container">
        <img src={scrum_board} alt="people planning on a board" className='user_auth_graphic' />
        <div className="user_auth_form_container">
          <form onSubmit={onLogin} className='user_auth_form'>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            <button type='submit' className='user_auth_submit'>Login</button>
            <button type='submit' id='demo_login_button' onClick={demoLogin}>Demo Login</button>
            <Link to='/sign-up' className='login_signup_switch_text'>Create An Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

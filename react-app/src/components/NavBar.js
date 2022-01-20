import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from './images/logo.svg'



const NavBar = () => {

  let userLinks;
  const user = useSelector(state => state.session.user);
  if (!user) {
    userLinks = (
      <>
        <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
        <span> | </span>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
      </>
    )
  } else {
    userLinks = (
      <>
        <span>Welcome {user.username}</span>
        <span> | </span>
        <LogoutButton />
      </>
    )
  }

  return (
    <div className='navbar'>
      <span>

        <Link to='/homepage'>
          <span>AINT NOBODY GOT TIME FOR THAT  </span>
          <img src={logo} alt="logo" id='nav_logo' />
        </Link>
      </span>
      <nav>
        {userLinks}
      </nav>
    </div>
  );
}

export default NavBar;

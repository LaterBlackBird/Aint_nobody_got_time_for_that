import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from './images/logo.svg'



const NavBar = () => {


  const scrollToAbout = () => {
    window.scrollTo({
      top: 10000,
      behavior: 'smooth'
    })
  }

  let userLinks;
  const user = useSelector(state => state.session.user);
  if (!user) {
    userLinks = (
      <>
        <NavLink to='/login' exact={true} activeClassName='active'>Login &nbsp;</NavLink>
        <span>&nbsp; | &nbsp;</span>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>&nbsp; Sign Up </NavLink>
        <span>&nbsp; | &nbsp; &nbsp;</span>
        <p id='about_link' onClick={() => scrollToAbout()}>About &nbsp;</p>
      </>
    )
  } else {
    userLinks = (
      <>
        <span>Welcome, {user.username} &nbsp;</span>
        <span>&nbsp; | &nbsp; &nbsp;</span>
        {!window.location.href.endsWith('homepage') &&
          <>
            <NavLink to='/homepage'>My Meal Plans &nbsp;</NavLink>
            <span>&nbsp; | &nbsp; &nbsp;</span>
            <p id='about_link' onClick={() => scrollToAbout()}>About &nbsp;</p>
            <span>&nbsp; | &nbsp; &nbsp;</span>
          </>}
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

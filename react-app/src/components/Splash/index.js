import React from 'react';
import { Link } from 'react-router-dom';
import eating from '../images/undraw_eating_together_re_ux62.svg'
import logo from '../images/logo.svg'
import schedule from '../images/undraw_date_picker_re_r0p8.svg'
import meal_plan_preview from '../images/meal_plan_preview.png'
import daily_schedule_preview from '../images/daily_schedule_preview.png'
import shopping from '../images/undraw_empty_cart_co35.svg'
import './splash.css'

function Splash() {
    return (
        <>
            <div className='splash'>
                <div id='hero_bar'>
                    <div id='hero_bar_branding' className='flex_col_center'>
                        <div id='brand'>
                            <p>AINT NOBODY<br /> GOT TIME<br /> FOR THAT</p>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='copy'>
                            <span>Eating a healthy diet is more important that ever, but it doesn’t happen by accident. <br />
                                <br />
                                That’s where Aint Nobody Got Time For That comes in. <br />
                                <br />
                                Planning made easy and fast. Spend less time planning your <br />
                                meals and more time enjoying them with the people you care about.</span>
                        </div>
                        <button><Link to='/sign-up' className='sign_up'> Get Started For Free </Link></button>
                    </div>
                    <img src={eating} alt="people eating at a table" id='hero_image' />
                </div>
            </div >
            <div className="splash flex_col_center blue_background">
                <div className='feature_container' id='feature_1'>
                    <div className="feature_card flex_col_center">
                        <p>ORGANIZE BY WEEK,<br />EVENTS, OR WHATEVER<br />YOU CHOOSE</p>
                        <img src={meal_plan_preview} alt="preview of meal planning" />
                    </div>
                    <img src={schedule} alt="a person scheduling on a calendar" id='schedule_img' />
                </div>
                <div className='feature_container flex_col_center' id='feature_2'>
                    <div className="feature_card flex_col_center">
                        <p>SCHEDULE EACH DAY WITH A UNIQUE MENU</p>
                        <img src={daily_schedule_preview} alt="preview of daily schedule" />
                    </div>
                </div>
                <div className='feature_container' id='feature_3'>
                    <img src={shopping} alt="a person scheduling on a calendar" id='shopping_img' />
                    <div className="feature_card flex_col_center">
                        <p>SEARCH FOR YOUR<br />FAVORITE MEALS</p>
                        <img src={meal_plan_preview} alt="preview of recipe search" />
                    </div>
                </div>
                <button><Link to='/sign-up' className='sign_up'> Get Started For Free </Link></button>
            </div>
            <div id="about">
                <h2>About</h2>
                <h3>Seth Holland</h3>
            </div>
        </>
    );
}

export default Splash;

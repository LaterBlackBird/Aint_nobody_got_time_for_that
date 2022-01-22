import React from 'react';
import { Link } from 'react-router-dom';
import eating from '../images/undraw_eating_together_re_ux62.svg'
import logo from '../images/logo.svg'
import schedule from '../images/undraw_date_picker_re_r0p8.svg'
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
                    <div id="feature_1">
                        <div className="feature_card flex_col_center">
                            <p>ORGANIZE BY WEEK,<br />EVENTS, OR WHATEVER<br />YOU CHOOSE</p>
                        </div>
                        <img src={schedule} alt="a person scheduling on a calendar" />
                    </div>
            </div>
        </>
    );
}

export default Splash;

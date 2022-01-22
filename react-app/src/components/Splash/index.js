import React from 'react';
import eating from '../images/undraw_eating_together_re_ux62.svg'
import logo from '../images/logo.png'
import './splash.css'

function Splash() {
    return (
        <div className='splash' id='hero_bar'>
            <div id='hero_bar_branding' className='flex_col_center'>
                <div id='brand'>
                    <p>AINT NOBODY<br /> GOT TIME<br /> FOR THAT</p>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='copy'>
                    <span>Eating a healthy diet is more important that ever, but it doesn’t happen by accident. <br />
                        <br />
                        That’s where Aint Nobody Got Time For That comes in. <br />
                        <br />
                        Planning made easy and fast. Spend less time planning your <br />
                        meals and more time enjoying them with the people you care about.</span>
                </div>
                <button>Get Started For Free</button>
            </div>
            <img src={eating} alt="people eating at a table" />
        </div >);
}

export default Splash;

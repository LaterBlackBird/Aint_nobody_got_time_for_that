import React from 'react';
import { Link } from 'react-router-dom';
import eating from '../images/undraw_eating_together_re_ux62.svg'
import logo from '../images/logo.svg'
import schedule from '../images/undraw_date_picker_re_r0p8.svg'
import meal_plan_preview from '../images/meal_plan_preview.png'
import daily_schedule_preview from '../images/daily_schedule_preview.png'
import recipes_preview from '../images/recipes_preview.png'
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
                            <span>Eating a healthy diet is more important than ever, but it doesn’t happen by accident. <br />
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
                        <img src={recipes_preview} alt="preview of recipe search" />
                    </div>
                </div>
                <button><Link to='/sign-up' className='sign_up'> Get Started For Free </Link></button>
            </div>
            <div id="about">
                <h3>About</h3>
                <div className="info">
                    <img id='selfie' src="https://avatars.githubusercontent.com/u/14840521?v=4" alt="" />
                    <div className='links flex_col_center'>
                        <h2 className='name'>Seth Holland</h2>
                        <div className="author_links">
                            <a href='https://www.linkedin.com/in/seth-holland/' target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in splash_text"></i></a>
                            <a href='https://github.com/LaterBlackBird' target="_blank" rel="noopener noreferrer"><i className="fab fa-github splash_text"></i></a>
                            <a href='https://angel.co/u/seth-holland' target="_blank" rel="noopener noreferrer"><i className="fab fa-angellist splash_text"></i></a>

                        </div>
                    </div>
                </div>
                <div id='built_with'>
                    <h3>Built With:</h3>
                    <img className='badge' src={`https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black`} alt="JavaScript" />
                    <img className='badge' src={`https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54`} alt="Python" />
                    <img className='badge' src={`https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white`} alt="HTML5" />
                    <img className='badge' src={`https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white`} alt="CSS3" />
                    <img className='badge' src={`https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white`} alt="NodeJS" />
                    <img className='badge' src={`https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white`} alt="PostgreSQL" />
                    <img className='badge' src={`https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`} alt="React" />
                    <img className='badge' src={`https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white`} alt="Redux" />
                    <img className='badge' src={`https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white`} alt="Flask" />
                    <img className='badge' src={`https://img.shields.io/badge/SQLAlchemy-d71f00?style=for-the-badge&logo=SQLAlchemy&logoColor=white`} alt="SQLAlchemy" />
                    <img className='badge' src={`https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white`} alt="Heroku" />
                    <img className='badge' src={`https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white`} alt="Docker" />
                </div>
            </div>
        </>
    );
}

export default Splash;

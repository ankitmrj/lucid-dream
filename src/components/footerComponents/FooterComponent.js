import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function FooterComponent() {
    const {pathname} = useLocation();
    if (pathname === '/signin' || pathname === '/signup') return null;
  return (
    
    <div id='footer'>
    <footer>
        {/*<svg className='footer-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3B1C54" fill-opacity="1" d="M0,192L120,202.7C240,213,480,235,720,229.3C960,224,1200,192,1320,176L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>*/}
        <div className='footer-bg'>
            <div className='footer-sections'>
                <div className='footer-about'>
                    <h2>STAY LUCID</h2>
                    <p>We believe that dreaming is a skill that can be trained and made easier among common folk. Our mission is to make Lucid Dreaming as easy as it can be while providing you with the knowledge you need to become an active dreamer.</p>
                </div>
                <div className='footer-contact'>
                    <h2>Contact</h2>
                    <p>Dream stories, questions, suggestions, we want to hear it!</p>
                    <a rel='noreferrer' href='https://ndias.info' target='_blank'>999-999-9999</a>
                    <a rel='noreferrer' href='https://ndias.info' target='_blank'>email@email.com</a>
                </div>
            </div>
        </div>
        <div className='author'>
            <hr/>
            <p>Made with 🤍 by <a href='https://nehemiahdias.netlify.app/' target='_blank' rel='noreferrer'>Nehemiah Dias</a></p>
        </div>
    </footer>
    </div>
  )
}

export default FooterComponent
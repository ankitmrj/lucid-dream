import React from 'react';
import './Footer.css';

function FooterComponent() {
  return (
    <footer>
        {/*<svg className='footer-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3B1C54" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,69.3C672,85,768,139,864,144C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>*/}
        <div className='footer-sections'>
            <div className='footer-about'>
                <h2>STAY LUCID</h2>
                <p>We believe that dreaming is a skill that can be trained and made easier among common folk. Our mission is to make Lucid Dreaming as easy as it can be while providing you with the knowledge you need to become an active dreamer.</p>
            </div>
            <div className='footer-contact'>
                <h2>Contact</h2>
                <p>Dream stories, questions, suggestions, we want to hear it!</p>
                <a href='#'>999-999-9999</a>
                <a href='#'>email@email.com</a>
            </div>
        </div>
        <div className='author'>
            <hr/>
            <p>Made with 🤍 by <a href='https://nehemiahdias.netlify.app/' target='_blank'>Nehemiah Dias</a></p>
        </div>
    </footer>
  )
}

export default FooterComponent
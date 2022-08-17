import React from 'react';
import './HeaderComponent.css';
import home from '../images/home.png';
import tools from '../images/time.png';
import journal from '../images/travel-journal.png';

function HeaderComponent() {
  return (
    <header>
        <nav id='nav-links'>
            <img alt='home' src={home} className='icon' />
            <img alt='Journal' src={journal} className='icon' />
            <img alt='Tools' src={tools} className='icon' />
        </nav>
    </header>
  )
}

export default HeaderComponent
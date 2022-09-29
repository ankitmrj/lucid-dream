import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css';
import home from '../images/home.png';
// import tools from '../images/time.png';
import journal from '../images/travel-journal.png';
import user from '../images/user.png';
import forum from '../images/forum-white.png';

function HeaderComponent() {
  return (
    <header>
        <nav id='nav-links'>
            <Link to='/' ><img alt='home' src={home} className='icon' /></Link>
            <Link to='dream-journal'><img alt='Journal' src={journal} className='icon' /></Link>
            <Link to='forum' ><img alt='Sign In' src={forum} className='icon' /></Link>
            {/* <Link to='reality-check'><img alt='Tools' src={tools} className='icon' /></Link> */}
            <Link to='account' ><img alt='Sign In' src={user} className='icon' /></Link>
        </nav>
    </header>
  )
}

export default HeaderComponent
import React from 'react';
import './Landing.css';
import sleep from '../images/sleep.png';
import journal from '../images/travel-journal-black.png';
import time from '../images/time-black.png';
import forum from '../images/forum.png';

function LandingComponent() {
  return (
    <div id='landing-component'>
        <section id='landing-section'>
            <div id='intro-section'>
                <div className='landing-text'>
                    <h1>MAKE YOUR DREAMS COME TRUE</h1>
                    <p>If you could control your dreams and do as you please, what would you do? Find out tonight with the help of Stay Lucid! Lucid Dreaming is when the dreamer is aware they're dreaming, sounds simple enough right? It takes an immense amount of practice and mental awareness which is much harder than it sounds, Stay Lucid is here to make that as easy as possible!</p>
                    <div className='landing-learn-more'>
                        <div className='landing-buttons'>
                            <button>Learn More!</button>
                        </div>
                        <img alt='sleep illustration' src={sleep} width='300px' />
                    </div>
                </div>
                <svg className='landing-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3B1C54" fillOpacity="1" d="M0,32L48,48C96,64,192,96,288,112C384,128,480,128,576,112C672,96,768,64,864,64C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>
            
        </section>
        <div className='key-features'>
                <h2>Key Features</h2>
                <div className='features'>
                    <div className='feature'>
                        <img alt='dream journal' src={journal} width='50px' />
                        <h3>Dream Journal</h3>
                        <p>Dream recall is one of the most important things when it comes to lucid dreaming because what's the point of a lucid dream if you can't even remember it? The best way to train your dream recall is something that we provide for you! The Stay Lucid dream journal.</p>
                    </div>
                    {/* <div className='feature'>
                        <img alt='reality check' src={time} width='50px' />
                        <h3>Reality Checks</h3>
                        <p>Our busy lives restrict us from remembering to do a reality check every hour, we got you covered! With Stay Lucid, you have the option of reminding yourself to do a reality check every hour within a set period daily!</p>
                    </div> */}
                    <div className='feature'>
                        <img alt='forum' src={forum} width='50px' />
                        <h3>The Dream Forum</h3>
                        <p>There are millions of different techniques to lucid dream and it's impossible to list each one on this website, that's where the Dream Forum comes in! Users like yourself can share techniques that work for them, their dream experiences, questions, and advice on anything involving dreaming!</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default LandingComponent
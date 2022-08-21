import React from 'react';
import './Landing.css';

function LandingComponent() {
  return (
    <div id='landing-component'>
        <section id='landing-section'>
            <h1>Make Your Dreams Come True!</h1>
            <p>If you could control your dreams and do as you please, what would you do? Find out tonight with the help of Stay Lucid! Lucid Dreaming is when the dreamer is aware they're dreaming, sounds simple enough right? It takes an immense amount of practice and mental awareness which is much harder than it sounds, Stay Lucid is here to make that as easy as possible!</p>

            <div className='key-features'>
                <h2>Key Features</h2>
                <div className='feature'>
                    <h3>Dream Journal</h3>
                    <p>Dream recall is one of the most important things when it comes to lucid dreaming because what's the point of a lucid dream if you can't even remember it? The best way to train your dream recall is something that we provide for you! The Stay Lucid dream journal.</p>
                </div>
                <div className='feature'>
                    <h3>Reality Checks</h3>
                    <p>Our busy lives restrict us from remembering to do a reality check every hour, we got you covered! With Stay Lucid, you have the option of reminding yourself to do a reality check every hour within a set period daily!</p>
                </div>
                <div className='feature'>
                    <h3>The Dream Forum</h3>
                    <p>There are millions of different techniques to lucid dream and it's impossible to list each one on this website, that's where the Dream Forum comes in! Users like yourself can share techniques that work for them, their dream experiences, questions, and advice on anything involving dreaming!</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default LandingComponent
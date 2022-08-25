import React, { useState } from 'react';
import './Journal.css';

function JournalComponent() {
    const toggleDreamText = () => {
        const dreamInput = document.querySelector('.dream-text');

        dreamInput.classList.toggle('hidden')
    }

    return (
        <div id='journal-component'>
            <section id='journal-input'>
                <h1>Dream Journal</h1>
                <p>A dream journal is vital to Lucid Dreaming because it trains your dream recall. You can also use your dream journal as a guide to many different techniques. All you need to do is enter your dream every morning, Stay Lucid makes that as easy as it can be!</p>
                <div className='new-dream'>
                    <button onClick={toggleDreamText}>New Dream</button>
                    <div className='dream-text hidden'>
                        <textarea rows='10' cols='100'></textarea>
                        <p>Tags:</p>
                        <div className='tags'>
                            <label className='switch' htmlFor='lucid'>
                                <input type='checkbox' id='lucid' name='lucid' value='Lucid' />
                                <span className='slider'>Lucid</span>
                            </label>
                            <label className='switch' htmlFor='nightmare'>
                                <input type='checkbox' id='nightmare' name='nightmare' value='Nightmare' />
                                <span className='slider'>Nightmare</span>
                            </label>
                            <label className='switch' htmlFor='semi-lucid'>
                                <input type='checkbox' id='semi-lucid' name='semi-lucid' value='Semi-Lucid' />
                                <span className='slider'>Semi-Lucid</span>
                            </label>
                            <label className='switch' htmlFor='vivid'>
                                <input type='checkbox' id='vivid' name='vivid' value='Vivid' />
                                <span className='slider'>Vivid</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JournalComponent
import React from 'react';
import './Journal.css';

function JournalComponent() {
  return (
    <div id='journal-component'>
        <section id='journal-input'>
            <h1>Dream Journal</h1>
            <p>A dream journal is vital to Lucid Dreaming because it trains your dream recall. You can also use your dream journal as a guide to many different techniques. All you need to do is enter your dream every morning, Stay Lucid makes that as easy as it can be!</p>
            <div className='new-dream'>
                <button>New Dream</button>
                <div className='dream-text'>
                    <textarea rows='10' cols='100'></textarea>
                    <p>Tags:</p>
                    <div className='tags'>
                        <label className='switch' htmlFor='lucid'>
                            <input type='checkbox' id='lucid' name='lucid' value='Lucid' />
                            <span className='slider'>Lucid</span>
                        </label>
                        <label htmlFor='nightmare'>Nightmare
                            <input type='checkbox' id='nightmare' name='nightmare' value='Nightmare' />
                        </label>
                        <label htmlFor='semi-lucid'>Semi-Lucid
                            <input type='checkbox' id='semi-lucid' name='semi-lucid' value='Semi-Lucid' />
                        </label>
                        <label htmlFor='vivid'>Vivid
                            <input type='checkbox' id='vivid' name='vivid' value='Vivid' />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default JournalComponent
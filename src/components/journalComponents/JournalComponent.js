import React from 'react'

function JournalComponent() {
  return (
    <div id='journal-component'>
        <section id='journal-input'>
            <h1>Dream Journal</h1>
            <p>A dream journal is vital to Lucid Dreaming because it trains your dream recall. You can also use your dream journal as a guide to many different techniques. All you need to do is enter your dream every morning, Stay Lucid makes that as easy as it can be!</p>
            <div className='new-dream'>
                <button>New Dream</button>
                <div className='dream-text'>
                    <textarea></textarea>
                    <button>+ Tags</button>
                    <div className='tags'>
                        <button>Lucid</button>
                        <button>Nightmare</button>
                        <button>Semi-Lucid</button>
                        <button>Vivid</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default JournalComponent
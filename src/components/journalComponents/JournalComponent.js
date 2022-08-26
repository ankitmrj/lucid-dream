import React, { useEffect, useState } from 'react';
import './Journal.css';

function JournalComponent() {
    const [dreamInputVisible, setDreamInputVisible] = useState(false);
    const [dreamTitle, setDreamTitle] = useState('');
    const [dreamDate, setDreamDate] = useState(new Date().toJSON().slice(0, 10));
    const [dreamText, setDreamText] = useState('');
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']);

    const toggleDreamText = () => {
        setDreamInputVisible(dreamInputVisible ? false : true);
        const dreamInput = document.querySelector('.dream-text');

        dreamInput.classList.toggle('hidden')
    }
    const discardDream = () => {
        toggleDreamText();
        setDreamText('');
    }
    const displayDreamTags = () => {
        const tagsParent = document.querySelector('.tags');

        for (let i in dreamTags){
            const dreamTag = dreamTags[i]
            //creats tags label and adds class
            const tagLabel = document.createElement('label');
            tagLabel.classList.add('switch');

            //creates tags input with attributes
            const tagInput = document.createElement('input');
            tagInput.setAttribute('value', dreamTag);
            tagInput.setAttribute('type', 'checkbox');
            tagInput.setAttribute('id', dreamTag);
            tagInput.setAttribute('name', dreamTag);

            //creates tags span with text and attributes
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('slider');
            tagSpan.innerHTML = dreamTag.charAt(0).toUpperCase() + dreamTag.slice(1);

            //appends elements
            tagLabel.appendChild(tagInput, tagSpan);
            tagsParent.appendChild(tagLabel);
        }
    }
    useEffect(() => {
        displayDreamTags()
    }, [])

    return (
        <div id='journal-component'>
            <section id='journal-input'>
                <h1>Dream Journal</h1>
                <p>A dream journal is vital to Lucid Dreaming because it trains your dream recall. You can also use your dream journal as a guide to many different techniques. All you need to do is enter your dream every morning, Stay Lucid makes that as easy as it can be!</p>
                <div className='new-dream'>
                    {
                        dreamInputVisible ?
                        <button onClick={discardDream}>Discard Dream</button> :
                        <button onClick={toggleDreamText}>New Dream</button>}
                    <div className='dream-text hidden'>
                        <p>Title (optional): </p>
                        <input 
                            type='text' 
                            value={dreamTitle}
                            onChange={(e) => setDreamTitle(e.target.value)}
                        />
                        <p>Date:</p>
                        <input 
                            type='date' 
                            value={dreamDate} 
                            onChange={(e) => setDreamDate(e.target.value)}
                        />
                        <p>Dream:</p>
                        <textarea 
                            id='dream-textarea'
                            rows='10' 
                            cols='100'
                            value={dreamText}
                            onChange={(e) => setDreamText(e.target.value)}
                        ></textarea>
                        <p>Tags:</p>
                        <div className='tags'>
                            {/*
                            <label className='switch'>
                                <input type='checkbox' id='lucid' name='lucid' value='Lucid' />
                                <span className='slider'>Lucid</span>
                            </label>
                            <label className='switch'>
                                <input type='checkbox' id='nightmare' name='nightmare' value='Nightmare' />
                                <span className='slider'>Nightmare</span>
                            </label>
                            <label className='switch'>
                                <input type='checkbox' id='semi-lucid' name='semi-lucid' value='Semi-Lucid' />
                                <span className='slider'>Semi-Lucid</span>
                            </label>
                            <label className='switch'>
                                <input type='checkbox' id='vivid' name='vivid' value='Vivid' />
                                <span className='slider'>Vivid</span>
                    </label>*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JournalComponent
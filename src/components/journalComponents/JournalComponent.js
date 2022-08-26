import React, { useEffect, useState } from 'react';
import './Journal.css';

function JournalComponent() {
    //represents if the dream menu is hidden or not
    const [dreamInputVisible, setDreamInputVisible] = useState(false);
    const [dreamTitle, setDreamTitle] = useState('');
    const [dreamDate, setDreamDate] = useState(new Date().toJSON().slice(0, 10)); //automatically sets to todays date
    const [dreamText, setDreamText] = useState('');
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']); //all tags to filter dreams
    const [createTag, setCreateTag] = useState('');

    //toggles dream menu 
    const toggleDreamText = () => {
        setDreamInputVisible(dreamInputVisible ? false : true);
        const dreamInput = document.querySelector('.dream-text');

        dreamInput.classList.toggle('hidden')
    }

    //hides new dream menus and clears dream text
    const discardDream = () => {
        toggleDreamText();
        setDreamText('');
    }

    //creates new tag and appends it to the bottom of tags
    const createDreamTag = (newTag) => {
        const tagsParent = document.querySelector('.tags');

        //creats tag label and adds class
        const tagLabel = document.createElement('label');
        tagLabel.classList.add('switch');

        //creates tag input with attributes
        const tagInput = document.createElement('input');
        tagInput.setAttribute('value', newTag);
        tagInput.setAttribute('type', 'checkbox');
        tagInput.setAttribute('id', newTag);
        tagInput.setAttribute('name', newTag);

        //creates tag span with text and attributes
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('slider');
        tagSpan.innerHTML = newTag.charAt(0).toUpperCase() + newTag.slice(1);

        //appends elements
        tagLabel.appendChild(tagInput);
        tagLabel.appendChild(tagSpan);
        tagsParent.appendChild(tagLabel);
    }

    //displays default dream tags 
    const displayInitialDreamTags = () => {
        for (let i in dreamTags){
            const dreamTag = dreamTags[i]
            createDreamTag(dreamTag)
        }
    }

    //add new tag to list as a checkbox
    const addNewTag = () => {
        setDreamTags(...dreamTags, createTag);
        createDreamTag(createTag);
        setCreateTag('');
    }

    useEffect(() => {
        displayInitialDreamTags()
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
                        <input 
                            type='text'
                            value={createTag}
                            onChange={(e) => setCreateTag(e.target.value)}
                        />
                        <button onClick={addNewTag}>+</button>
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
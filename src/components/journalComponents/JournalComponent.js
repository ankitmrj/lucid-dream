import React, { useEffect, useState } from 'react';
import DisplayedDream from './DisplayedDream';
import './Journal.css';

function JournalComponent() {
    const dreamCheckboxes = document.querySelectorAll('.switch input');

    //represents if the dream menu is hidden or not
    const [dreamInputVisible, setDreamInputVisible] = useState(false);
    const [dreamTitle, setDreamTitle] = useState('');
    const [dreamDate, setDreamDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); //automatically sets to todays date
    const [dreamText, setDreamText] = useState('');
    //default dream tags
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']);
    const [createTag, setCreateTag] = useState('');
    /*Dream object template in userDreams list
        title: dreamTitle,
        tags: dreamTags,
        date: dreamDate,
        dreamDesc: dreamText
    */
    //list of dream objects with the above template
    const [userDreams, setUserDreams] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDesc, setSelectedDesc] = useState('');
    const [isActive, setIsActive] = useState('none');

    //toggles dream menu 
    const toggleDreamText = () => {
        setDreamInputVisible(dreamInputVisible ? false : true);
        const dreamInput = document.querySelector('.dream-text');

        dreamInput.classList.toggle('hidden')
    }

    useEffect(() => {
        document.querySelectorAll('.dream').forEach(item => {
            if (item.getAttribute('added') === "true"){

            } else {
                item.addEventListener('click', toggleDisplayedDream);
                item.setAttribute('added', "true");
            }
        })
    }, [userDreams])

    //hides new dream menus and clears dream text
    const discardDream = () => {
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');
        
        for (let i in dreamCheckboxes){
            if (dreamCheckboxes[i].checked){
                dreamCheckboxes[i].checked = false;
            }
        }
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

    const toggleVisibleDream = () => {
        if (isActive === 'none'){
            setIsActive('block');
        } else {
            setIsActive('none');
        }
    }

    const toggleDisplayedDream = (e) => {
        const searchTitle = e.target.id;
        var clickedDream;
    
        for (let dream in userDreams){
            if (userDreams[dream].title === searchTitle){
                clickedDream = userDreams[dream];
            }
        }
        console.log(clickedDream)
        setSelectedTitle(clickedDream.title);
        setSelectedDate(clickedDream.date);
        setSelectedDesc(clickedDream.dreamDesc);
        setIsActive('block');
        console.log(selectedTitle, selectedDate, selectedDesc)
    }
    
    //displays users dreams with title, date, and tags
    const displayUserDreams = (newDream) => {
        //parent element of all user dreams
        const displayedDreams = document.querySelector('.displayed-dreams');

        //container for dream title, date, and tags
        const dreamParent = document.createElement('div');
        dreamParent.classList.add('dream');
        dreamParent.setAttribute('id', newDream.title);
        //dreamParent.addEventListener('click', toggleDisplayedDream)

        //container for title and date for flexbox
        const dreamTitleParent = document.createElement('div');
        dreamTitleParent.classList.add('user-dream-title');

        //dream title
        const dreamTitleText = document.createElement('h2');
        dreamTitleText.innerHTML = newDream.title;

        //dream date
        const dreamDateText = document.createElement('h4');
        dreamDateText.innerHTML = newDream.date;

        //appends all elements to parents
        dreamParent.appendChild(dreamTitleParent);
        dreamTitleParent.appendChild(dreamTitleText);
        dreamTitleParent.appendChild(dreamDateText);

        //dream tag container
        const dreamTagsParent = document.createElement('div');
        dreamTagsParent.classList.add('user-dream-tags');

        //loops through tags and creates p element for each one
        for (let i in newDream.tags){
            //p element for tag
            const dreamTagText = document.createElement('p');
            dreamTagText.classList.add('user-dream-tag');
            
            //sets tag text and adds to container
            dreamTagText.innerHTML = newDream.tags[i];
            dreamTagsParent.appendChild(dreamTagText);
        }

        //appends both divs to main dream container
        dreamParent.appendChild(dreamTagsParent);
        displayedDreams.appendChild(dreamParent);
    }

    //add new tag to list as a checkbox
    const addNewTag = () => {
        if (!dreamTags.includes(createTag)){
            setDreamTags([...dreamTags, createTag]);
            createDreamTag(createTag);
            setCreateTag('');
        }
    }

    const submitNewDream = () => {
        const activeDreamTags = [];
        for (let i in dreamCheckboxes){
            if (dreamCheckboxes[i].checked){
                activeDreamTags.push(dreamCheckboxes[i].value);
                dreamCheckboxes[i].checked = false;
            }
        }

        const newDream = {
            title: dreamTitle, 
            tags: activeDreamTags, 
            date: dreamDate, 
            dreamDesc: dreamText
        }

        setUserDreams([...userDreams, newDream])
        displayUserDreams(newDream);

        toggleDreamText();
        setDreamText('');
        setDreamTitle('');

    }

    useEffect(() => {
        displayInitialDreamTags();
    }, [])

    return (
        <>
        <DisplayedDream title={selectedTitle} date={selectedDate} dreamDesc={selectedDesc} active={isActive} toggleActive={toggleVisibleDream} />
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
                        </div>
                        <button style={{marginBottom: '100px'}} onClick={submitNewDream}>Submit Dream</button>
                        <button onClick={() => console.log(userDreams)}>ConsoleLog</button>
                    </div>
                </div>
            </section>
            <section style={{marginBottom: '100px'}} id='user-dreams'>
                <h1>Dreams:</h1>
                <div className='displayed-dreams'>
                    <div className='dream' id='example-dream' onClick={toggleDisplayedDream}>
                        <div className='user-dream-title'>
                            <h2>EXAMPLE DREAM</h2>
                            <h4>2022-08-20</h4>
                        </div>
                        <div className='user-dream-tags'>
                            <p className='user-dream-tag'>Lucid</p>
                            <p className='user-dream-tag'>Vivid</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default JournalComponent
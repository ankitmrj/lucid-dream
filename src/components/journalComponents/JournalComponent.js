import React, { useEffect, useState } from 'react';
import DisplayedDream from './DisplayedDream';
import { db } from '../../firebase-config';
import './Journal.css';
import { set, ref, onValue, get } from 'firebase/database';
import { uuidv4 } from '@firebase/util';

function JournalComponent() {
    const dreamCheckboxes = document.querySelectorAll('.switch input');
    //represents if the dream menu is hidden or not
    const [dreamInputVisible, setDreamInputVisible] = useState(false);
    //variable for title input field
    const [dreamTitle, setDreamTitle] = useState('');
    //variable for date input field
    const [dreamDate, setDreamDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); //automatically sets to todays date
    //variable for dream text field
    const [dreamText, setDreamText] = useState('');
    //default dream tags
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']);
    //variable for the new tag input field
    const [createTag, setCreateTag] = useState('');
    /*Dream object template in userDreams list
        title: dreamTitle,
        tags: dreamTags,
        date: dreamDate,
        dreamDesc: dreamText
    */
    //list of dream objects with the above template
    const [userDreams, setUserDreams] = useState([]); //list of all user dreams
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
        onValue(ref(db), (snapshot) => {
            setUserDreams([])
            const data = snapshot.val();
            if (data !== null){
                Object.values(data).forEach(dream => {
                    setUserDreams(oldArray => [...oldArray, dream]);
                })
            }
        })
        displayInitialDreamTags();
    }, [])

    const clickFeatureDreams = () => {
        document.querySelectorAll('.dream').forEach(item => {
            //checks if dream existed before a new dream was added
            if (item.getAttribute('added') === "true"){

            } else {
                item.addEventListener('click', toggleDisplayedDream);
                item.setAttribute('added', "true");
            }
        })
    }

    //adds event listener for each added dream for click function

    //hides new dream menus and clears dream text
    const discardDream = () => {
        //resets variables and hides menu
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');
        
        for (let i in dreamCheckboxes){
            if (dreamCheckboxes[i].checked){
                dreamCheckboxes[i].checked = false; //unchecks checked tags
            }
        }
    }

    //creates new tag and appends it to the bottom of tags
    const createDreamTag = (newTag) => {
        const tagsParent = document.querySelector('.tags');

        //creates tag label and adds class
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

    //toggler for clicked dream, hides/displays dream that user clicks
    const toggleVisibleDream = () => {
        if (isActive === 'none'){
            setIsActive('block');
        } else {
            setIsActive('none');
        }
    }

    const toggleDisplayedDream = (e) => {
        //stores the name of the dream to search through list
        const searchTitle = e.target.id;
        var clickedDream; //found dream, undefined for now
    
        //filters through dreams in list until it finds the dream with searchTitle
        for (let dream in userDreams){
            if (userDreams[dream].title === searchTitle){
                clickedDream = userDreams[dream]; //saves found dream object to clickedDream
            }
        }

        //sets variables to use as props
        setSelectedTitle(clickedDream.title);
        setSelectedDate(clickedDream.date);
        setSelectedDesc(clickedDream.dreamDesc);
        setIsActive('block'); //When variables are set, this displays it
    }
    
    //displays users dreams with title, date, and tags
    const displayUserDreams = (newDream) => {
        //parent element of all user dreams
        const displayedDreams = document.querySelector('.displayed-dreams');

        //container for dream title, date, and tags
        const dreamParent = document.createElement('div');
        dreamParent.classList.add('dream');
        dreamParent.setAttribute('id', newDream.title);

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
        //checks if tag already exits
        if (!dreamTags.includes(createTag)){
            setDreamTags([...dreamTags, createTag]);
            createDreamTag(createTag);
            setCreateTag('');
        }
    }

    //function to add dream to list
    const submitNewDream = (e) => {
        e.preventDefault();
        //list for checked tags
        const activeDreamTags = [];
        //loops through checkboxes and pushes checked tags to above list
        for (let i in dreamCheckboxes){
            if (dreamCheckboxes[i].checked){
                activeDreamTags.push(dreamCheckboxes[i].value);
                dreamCheckboxes[i].checked = false; //resets value
            }
        }

        //creates new dream object
        const newDream = {
            title: dreamTitle, 
            tags: activeDreamTags, 
            date: dreamDate, 
            dreamDesc: dreamText
        }

        setUserDreams(oldDreams => [...oldDreams, newDream])//adds dream to global dreams
        //displayUserDreams(newDream); //adds "dream card" to the DOM

        const uuid = uuidv4()
        set(ref(db, `/${uuid}`), newDream)

        //resets dream values
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');

    }

    

    

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
                        <button type='button' onClick={discardDream}>Discard Dream</button> :
                        <button type='button' onClick={toggleDreamText}>New Dream</button>}
                    <div className='dream-text hidden'>
                        <form onSubmit={submitNewDream}>
                            <p><label htmlFor='title'>Title (optional): </label></p>
                            <input
                                id='title'
                                type='text' 
                                value={dreamTitle}
                                onChange={(e) => setDreamTitle(e.target.value)}
                            />
                            <p><label htmlFor='date'>Date:</label></p>
                            <input 
                                id='date'
                                type='date' 
                                value={dreamDate} 
                                onChange={(e) => setDreamDate(e.target.value)}
                            />
                            <p><label htmlFor='dream-textarea'>Dream:</label></p>
                            <textarea 
                                id='dream-textarea'
                                rows='10' 
                                cols='100'
                                value={dreamText}
                                onChange={(e) => setDreamText(e.target.value)}
                            ></textarea>
                            <p><label htmlFor='tags'>Tags:</label></p>
                            <input 
                                id='tags'
                                type='text'
                                value={createTag}
                                onChange={(e) => setCreateTag(e.target.value)}
                            />
                            <button type='button' onClick={addNewTag}>+</button>
                            <div className='tags'>
                            </div>
                            <button type='submit' style={{marginBottom: '100px'}}>Submit Dream</button>
                        </form>
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
                    {userDreams.map((dream, index) => (
                        <div key={index} className='dream' id={dream.title} onClick={toggleDisplayedDream}>
                            <div className='user-dream-title'>
                                <h2>{dream.title}</h2>
                                <h4>{dream.date}</h4>
                            </div>
                            <div className='user-dream-tags'>
                                {dream.tags.map((tag, index) => (
                                    <p key={index}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        </>
    )
}

export default JournalComponent
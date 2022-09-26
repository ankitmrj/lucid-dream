import React, {  useEffect, useState } from 'react';
import { set, ref, onValue, remove } from 'firebase/database';
import { uuidv4 } from '@firebase/util';
import { db } from '../../firebase-config';

import DisplayedDream from './DisplayedDream';
import './Journal.css';
import { UserAuth } from '../../context/AuthContext';

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
    //dream tag variables
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']);
    const [createTag, setCreateTag] = useState('');
    const [isActive, setIsActive] = useState('none'); //if tag input is checked
    //list of dream object value variables
    const [userDreams, setUserDreams] = useState([]); //list of all user dreams
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDesc, setSelectedDesc] = useState('');

    // const [toEditDream, setToEditDream] = useState({});
    // const [isEdit, setIsEdit] = useState(false);
    const {user} = UserAuth();

    const fetchDreams = () => {
        setTimeout(() => {
            onValue(ref(db), (snapshot) => {
                setUserDreams([])
                let uid = user.uid;
                let data = snapshot.val();
                if (data !== null){
                    Object.values(data[uid].dreams).forEach(dream => {
                        setUserDreams(oldArray => [...oldArray, dream]);
                    })
                }
                
            })
        }, 500)
        
    }

    //renders initial dreams from database
    useEffect( () => {
        fetchDreams();
        // eslint-disable-next-line
    }, [])

    //toggles dream menu 
    const toggleDreamText = () => {
        setDreamInputVisible(dreamInputVisible ? false : true);
        const dreamInput = document.querySelector('.dream-text');
        dreamInput.classList.toggle('hidden')
    }

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

    //toggler for clicked dream, hides/displays dream that user clicks
    const toggleVisibleDream = () => {
        if (isActive === 'none'){
            setIsActive('block');
        } else {
            setIsActive('none');
        }
    }

    // const findClickedDream = (dreamToFind) => {
    //     const searchTitle = dreamToFind;
    //     var clickedDream; //found dream, undefined for now
    
    //     //filters through dreams in list until it finds the dream with searchTitle
    //     for (let dream in userDreams){
    //         if (userDreams[dream].title === searchTitle){
    //             clickedDream = userDreams[dream]; //saves found dream object to clickedDream
    //         }
    //     }
    //     return clickedDream;
    // }

    //finds dream user clicks and displays it in a readable format
    const toggleDisplayedDream = (dream) => {
        const clickedDream = dream;

        //sets variables to use as props
        setSelectedTitle(clickedDream.title);
        setSelectedDate(clickedDream.date);
        setSelectedDesc(clickedDream.dreamDesc);
        setIsActive('block'); //When variables are set, this displays it
    }

    //add new tag to list as a checkbox
    const addNewTag = () => {
        const uuid = uuidv4()
        //checks if tag already exits
        if (!dreamTags.includes(createTag)){
            setDreamTags([...dreamTags, createTag]);
            set(ref(db, `${user.uid}/tags/${uuid}`), createTag)
            setCreateTag('');
        }
    }

    //function to add dream to list
    const submitNewDream = (e) => {
        e.preventDefault();

        //random uuid to identify item
        const uuid = uuidv4()
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
            dreamDesc: dreamText,
            uuid
        }

        setUserDreams(oldDreams => [...oldDreams, newDream])//adds dream to global dreams
        set(ref(db, `${user.uid}/dreams/${uuid}`), newDream)

        //resets dream values
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');
    }

    //removes dream from database
    const handleDelete = (dream) => {
        remove(ref(db, `/${dream.uuid}`))
    }

    // const handleUpdate = (dream) => {
    //     const clickedDream = findClickedDream(dream.title);
    //     setToEditDream(clickedDream)
    //     setIsEdit(true);
    // }

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
                            <p><label htmlFor='title'>Title: </label></p>
                            <input
                                id='title'
                                type='text' 
                                value={dreamTitle}
                                onChange={(e) => setDreamTitle(e.target.value)}
                                required
                            />
                            <p><label htmlFor='date'>Date:</label></p>
                            <input 
                                id='date'
                                type='date' 
                                value={dreamDate} 
                                onChange={(e) => setDreamDate(e.target.value)}
                                required
                            />
                            <p><label htmlFor='dream-textarea'>Dream:</label></p>
                            <textarea 
                                id='dream-textarea'
                                rows='10' 
                                cols='100'
                                value={dreamText}
                                onChange={(e) => setDreamText(e.target.value)}
                                required
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
                                {dreamTags.map(tag => (
                                    <label className='switch'>
                                        <input 
                                            value={tag}
                                            type='checkbox'
                                            id={tag}
                                            name={tag}
                                        />
                                        <span className='slider'>{tag}</span>
                                    </label>
                                ))}
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
                        <>
                        <div key={index} className='dream' id={dream.title} onClick={() => toggleDisplayedDream(dream)}>
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
                        <button onClick={() => handleDelete(dream)}>Delete</button>
                        {/* <button id={dream.title} onClick={() => handleUpdate(dream)}>Edit</button> */}
                        </>
                    ))}
                    {/* {isEdit ? 
                    <div>
                        <form >
                            <input 
                                type='text' 
                                value={toEditDream.title} 
                                onChange={e => setToEditDream(prev => ({...prev, title: e.target.value}))} 
                            />

                            <input 
                                type='date' 
                                value={toEditDream.date} 
                                onChange={e => setToEditDream(prev => ({...prev, date: e.target.value}))} 
                            />

                            <textarea 
                                value={toEditDream.dreamDesc} 
                                onChange={e => setToEditDream(prev => ({...prev, dreamDesc: e.target.value}))}
                            ></textarea>
                            
                            <p><label htmlFor='tags'>Tags:</label></p>
                            <input 
                                id='tags'
                                type='text'
                                value={createTag}
                                onChange={(e) => setCreateTag(e.target.value)}
                            />
                            <button type='button' onClick={addNewTag}>+</button>
                            <div className='edit-tags'>
                                {toEditDream.tags.forEach(tag => {
                                    if (dreamTags.includes(tag)){}
                                    else {
                                        setDreamTags([...dreamTags, tag])
                                    }
                                })}
                                {dreamTags.map((tag) => (
                                    <label className='switch'>
                                        <input 
                                            value={tag} 
                                            type='checkbox' 
                                            id={tag} 
                                            name={tag} 
                                            defaultChecked={toEditDream.tags.includes(tag) ? 'checked' : ''}
                                        />
                                        <span className='slider'>{tag}</span>
                                    </label>
                                ))}
                            </div>
                            <button type='submit'>Finish Editing</button>
                        </form>
                    </div>
                    :
                    null
                    } */}
                </div>
            </section>
        </div>
        </>
    )
}

export default JournalComponent
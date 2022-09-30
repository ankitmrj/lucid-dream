import React, { useEffect, useState } from 'react';
import { set, ref, child, remove, get, getDatabase } from 'firebase/database';
import { uuidv4 } from '@firebase/util';
import { db } from '../../firebase-config';
import LoadingScreen from 'react-loading-screen'
import DisplayedDream from './DisplayedDream';
import profanityFinder from 'profanity-finder';
import './Journal.css';
import { UserAuth } from '../../context/AuthContext';

function JournalComponent() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    //represents if the dream menu is hidden or not
    const [dreamInputVisible, setDreamInputVisible] = useState(false);
    //variable for title input field
    const [dreamTitle, setDreamTitle] = useState('');
    //variable for date input field
    const [dreamDate, setDreamDate] = useState(new Date().toLocaleDateString('pt-br').split('/').reverse().join('-')); //automatically sets to todays date
    //variable for dream text field
    const [dreamText, setDreamText] = useState('');
    //dream tag variables
    const [dreamTags, setDreamTags] = useState(['lucid', 'nightmare', 'semi-lucid', 'vivid']);
    const [shareToForum, setShareToForum] = useState(false);
    const [createTag, setCreateTag] = useState('');
    const [isActive, setIsActive] = useState('none'); //if tag input is checked
    //list of dream object value variables
    const [userDreams, setUserDreams] = useState([]); //list of all user dreams
    const [selectedDream, setSelectedDream] = useState({});
    const [toEditDream, setToEditDream] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const dreamCheckboxes = document.querySelectorAll('.switch input');
    const { user } = UserAuth();
    const findProfanity = profanityFinder.findprofanity;

    const fetchData = async () => {
        const dbRef = ref(getDatabase());
        const dreamsArr = []

        //Fetches dreams from firebase's database
        await get(child(dbRef, `/${user.uid}/dreams`)).then(snapshot => {
            if (snapshot.exists()) {
                const dreams = snapshot.val()
                Object.values(dreams).forEach(dream => {
                    dreamsArr.push(dream);
                })
            }
        }).catch(err => {
            console.error(err);
        })
        dreamsArr.sort((a, b) => b.timestamp - a.timestamp)
        setUserDreams([...dreamsArr]);

        //Fetches created tags from firebase's database
        await get(child(dbRef, `/${user.uid}/tags`)).then(snapshot => {
            if (snapshot.exists()) {
                const tags = snapshot.val()
                Object.values(tags).forEach(tag => {
                    setDreamTags(prev => [...prev, tag])
                })
            }
        })
        setLoading(false);
    }

    //renders initial dreams from database
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [user])

    //toggles dream menu 
    const toggleDreamText = () => {
        setDreamInputVisible(dreamInputVisible ? false : true);
        setError('');
        const dreamInput = document.querySelector('.dream-text');
        dreamInput.classList.toggle('hidden')
    }

    //hides new dream menus and clears dream text
    const discardDream = () => {
        //resets variables and hides menu
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');

        for (let i in dreamCheckboxes) {
            if (dreamCheckboxes[i].checked) {
                dreamCheckboxes[i].checked = false; //unchecks checked tags
            }
        }
    }

    //toggler for clicked dream, hides/displays dream that user clicks
    const toggleVisibleDream = () => {
        if (isActive === 'none') {
            setIsActive('block');
        } else {
            setIsActive('none');
        }
    }

    //finds dream user clicks and displays it in a readable format
    const toggleDisplayedDream = (dream) => {
        setSelectedDream(dream);
        setIsActive('block'); //When variables are set, this displays it
    }

    //add new tag to list as a checkbox
    const addNewTag = () => {
        const uuid = uuidv4()
        if (createTag.length < 1){
            setError('You cannot add an empty tag!');
            return null;
        }
        //checks if tag already exits
        if (!dreamTags.includes(createTag)) {
            setDreamTags([...dreamTags, createTag]);
            set(ref(db, `${user.uid}/tags/${uuid}`), createTag)
            setCreateTag('');
        }
    }

    //function to add dream to list
    const submitNewDream = (e) => {
        e.preventDefault();

        const userInfo = {
            username: user.displayName,
            profilePic: user.photoURL,
            uid: user.uid
        }

        //random uuid to identify item
        const uuid = uuidv4()
        //list for checked tags
        const activeDreamTags = [];

        //loops through checkboxes and pushes checked tags to above list
        for (let i in dreamCheckboxes) {
            if (dreamCheckboxes[i].checked) {
                activeDreamTags.push(dreamCheckboxes[i].value);
                dreamCheckboxes[i].checked = false; //resets value
            }
        }
        if (activeDreamTags.length < 1){
            setError('You must add at least one tag!')
            return null
        }
        


        //creates new dream object
        const newDream = {
            title: dreamTitle,
            tags: activeDreamTags,
            date: dreamDate,
            dreamDesc: dreamText,
            sharing: shareToForum,
            timestamp: Date.now(),
            userInfo,
            postData: {likes: 0},
            uuid
        }

        if (shareToForum && (findProfanity(newDream.title) || findProfanity(newDream.dreamDesc))){
            setError('You can not post dreams with profanity!');
            return;
        }

        setUserDreams(oldDreams => [newDream, ...oldDreams])//adds dream to global dreams
        set(ref(db, `${user.uid}/dreams/${uuid}`), newDream)
        if (shareToForum){
            set(ref(db, `shared-dreams/${uuid}`), newDream);
        }

        //resets dream values
        toggleDreamText();
        setDreamText('');
        setDreamTitle('');
        setShareToForum(false);
        setError('');
    }

    //removes dream from database
    const handleDelete = async (dream) => {
        await remove(ref(db, `/shared-dreams/${dream.uuid}`));
        await remove(ref(db, `/${user.uid}/dreams/${dream.uuid}`));
        window.location.reload();
    }

    //Sets necessary variables for the edit form
    const toggleUpdate = (dream) => {
        setToEditDream(dream);
        setIsEdit(!isEdit);
        setError('');
    }

    //Handles submission when you finish editing
    const handleSubmitEdit = e => {
        e.preventDefault();
        const userInfo = {
            username: user.displayName,
            profilePic: user.photoURL,
            uid: user.uid
        }
        //Selects all inputs in the dom
        const dreamCheckboxes = document.querySelectorAll('.switch input');

        //list for checked tags
        const activeDreamTags = [];

        //loops through checkboxes and pushes checked tags to above list
        for (let i in dreamCheckboxes) {
            if (dreamCheckboxes[i].checked) {
                activeDreamTags.push(dreamCheckboxes[i].value);
                dreamCheckboxes[i].checked = false; //resets value
            }
        }
        if (activeDreamTags.length < 1){
            setError('You must add at least one tag!')
            return null
        }
        if (toEditDream.sharing && (findProfanity(toEditDream.title) || findProfanity(toEditDream.dreamDesc))){
            setError('You can not post dreams with profanity!');
            return;
        }

        //Resets dream that has a matching uuid
        setUserDreams(prev =>
            prev.map(dream => {
                if (dream.uuid === toEditDream.uuid) {
                    return { ...toEditDream, tags: activeDreamTags }
                }
                return dream
            })
        )

        //updates dream in firebase's database
        set(ref(db, `/${user.uid}/dreams/${toEditDream.uuid}`),
            {
                ...toEditDream, tags: activeDreamTags
            }).catch(err => console.error(err))
        if (toEditDream.sharing){
            set(ref(db, `/shared-dreams/${toEditDream.uuid}`), 
            {
                ...toEditDream, tags: activeDreamTags, userInfo, postData: {likes: 0}
            }
            ).catch(err => console.error(err));
        } else {
            remove(ref(db, `/shared-dreams/${toEditDream.uuid}`));
        }
        setIsEdit(false);
        setError('');
    }

    return (
        <LoadingScreen
            loading={loading}
            bgColor='#E8EBF4'
            spinnerColor='#7336A4'
            text='Loading...'
        >
            <DisplayedDream active={isActive} toggleActive={toggleVisibleDream} selectedDream={selectedDream} />
            <div id='journal-component'>
                <section id='journal-input'>
                    <div className='journal-intro'>
                        <h1>Dream Journal</h1>
                        <p>A dream journal is vital to Lucid Dreaming because it trains your dream recall. You can also use your dream journal as a guide to many different techniques. All you need to do is enter your dream every morning, Stay Lucid makes that as easy as it can be!</p>
                    </div>
                    <div className='new-dream'>
                        {
                            dreamInputVisible ?
                                <button className='create-dream-btn' type='button' onClick={discardDream}>Discard Dream</button> :
                                <button className='create-dream-btn' type='button' onClick={toggleDreamText}>New Dream</button>}
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
                                    minLength='10'
                                    id='dream-textarea'
                                    rows='10'
                                    cols='100'
                                    value={dreamText}
                                    onChange={(e) => setDreamText(e.target.value)}
                                    required
                                ></textarea>
                                <div className='share-container'>
                                    <label htmlFor='share-checkbox'>Share To Forum:</label>
                                        <input 
                                            type='checkbox'
                                            id='share-checkbox'
                                            checked={shareToForum}
                                            onChange={e => setShareToForum(e.target.checked)}
                                        />
                                </div>
                                <p><label htmlFor='tags'>Tags:</label></p>
                                <div className='tags-inputs'>
                                <input
                                    id='tags'
                                    type='text'
                                    min='3'
                                    value={createTag}
                                    onChange={(e) => setCreateTag(e.target.value)}
                                />
                                <button className='add-tag-btn' type='button' onClick={addNewTag}>+</button>
                                </div>
                                <div className='tags'>
                                    {dreamTags.map((tag, i) => {
                                        const capitalized =
                                            tag.charAt(0).toUpperCase()
                                            + tag.slice(1);
                                        return (
                                            <label key={i} className='switch'>
                                                <input
                                                    value={tag}
                                                    type='checkbox'
                                                    id={tag}
                                                    name={tag}
                                                />
                                                <span className='slider'>{capitalized}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                                {error && <p className='error-msg'>{error}</p>}
                                <button className='submit-dream' type='submit' style={{ marginBottom: '100px' }}>Submit Dream</button>
                            </form>
                        </div>
                    </div>

                </section>
                <section id='user-dreams'>
                    <h1 className='dreams-title'>Dreams</h1>
                    <div className='displayed-dreams'>
                        {/* <div className='dream' id='example-dream' onClick={toggleDisplayedDream}>
                            <div className='user-dream-title'>
                                <h2>EXAMPLE DREAM</h2>
                                <h4>2022-08-20</h4>
                            </div>
                            <div className='user-dream-tags'>
                                <p className='user-dream-tag'>Lucid</p>
                                <p className='user-dream-tag'>Vivid</p>
                            </div>
                        </div> */}
                        {userDreams.length === 0 ?
                            <p className='no-dreams-msg'>You have not created dreams yet!</p>
                            :
                        <>
                        {userDreams.map((dream, index) => (
                            <div key={index} className='dream-outline'>
                                <div className='dream' id={dream.title} onClick={() => toggleDisplayedDream(dream)}>
                                    <div className='user-dream-title'>
                                        <h2>{dream.title}</h2>
                                        <h4>{dream.date}</h4>
                                    </div>
                                    <div className='user-dream-tags'>
                                        {dream.tags.map((tag, index) => (
                                            <p key={index}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                                        ))}
                                    </div>

                                </div>
                                <div className='dream-actions'>
                                    <button className='delete-drm' onClick={() => handleDelete(dream)}>Delete</button>
                                    <button className='edit-drm' onClick={() => toggleUpdate(dream)}>Edit</button>
                                </div>
                            </div>
                        ))}
                        </>
                        }
                        {isEdit &&
                            <div className='dream-text edit-dream'>
                                <form onSubmit={handleSubmitEdit} >
                                    <label>Title:
                                    <input
                                        id="edit-title"
                                        type='text'
                                        value={toEditDream.title}
                                        onChange={e => setToEditDream(prev => ({ ...prev, title: e.target.value }))}
                                    /></label>

                                    <label>Date:
                                    <input
                                        type='date'
                                        value={toEditDream.date}
                                        onChange={e => setToEditDream(prev => ({ ...prev, date: e.target.value }))}
                                    /></label>

                                    <label>Dream:
                                    <textarea
                                        value={toEditDream.dreamDesc}
                                        onChange={e => setToEditDream(prev => ({ ...prev, dreamDesc: e.target.value }))}
                                        rows='10'
                                        cols='100'
                                    ></textarea></label>
                                    <div className='share-container'>
                                        <label>Share To Forum:
                                            <input 
                                                type='checkbox'
                                                checked={toEditDream.sharing}
                                                onChange={e => setToEditDream(prev => ({...prev, sharing: e.target.checked}))}
                                            />
                                        </label>
                                    </div>

                                    <p><label htmlFor='tags'>Tags:</label></p>
                                    <div className='tags-inputs'>
                                    <input
                                        id='tags'
                                        type='text'
                                        value={createTag}
                                        onChange={(e) => setCreateTag(e.target.value)}
                                    />
                                    <button className='add-tag-btn' type='button' onClick={addNewTag}>+</button>
                                    </div>
                                    <div className='edit-tags'>
                                        {toEditDream.tags.forEach(tag => {
                                            if (dreamTags.includes(tag)) { }
                                            else {
                                                setDreamTags([...dreamTags, tag])
                                            }
                                        })}
                                        {dreamTags.map((tag, index) => (
                                            <label className='switch' key={index}>
                                                <input
                                                    value={tag}
                                                    type='checkbox'
                                                    id={tag}
                                                    name={tag}
                                                    defaultChecked={toEditDream.tags.includes(tag) ? 'checked' : ''}
                                                    min='3'
                                                />
                                                <span className='slider'>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {error && <p className='error-msg'>{error}</p>}
                                    <div className='edit-action-btns'>
                                        <button className='edit-submit' type='submit'>Finish Editing</button>
                                        <button className='edit-cancel' type='button' onClick={() => setIsEdit(false)} >Cancel Edit</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </LoadingScreen>
    )
}

export default JournalComponent
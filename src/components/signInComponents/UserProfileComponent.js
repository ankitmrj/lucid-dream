import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import placeholder from '../images/placeholder.png'
import './UserProfile.css';
import LoadingScreen from 'react-loading-screen'
import { child, get, ref as fdRef, getDatabase } from 'firebase/database';

function UserProfileComponent() {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [image, setImage] = useState(null);
    const [amountOfDreams, setAmountOfDreams] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(0);
    const [error, setError] = useState('');
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    const dbRef = fdRef(getDatabase());

    const fetchData = async () => {
        await get(child(dbRef, `/${user.uid}/dreams`))
            .then(snapshot => {
                if(snapshot.exists()){
                    setAmountOfDreams(Object.values(snapshot.val()).length)
                }
            })
            .catch(err => {
                console.error(err);
            })
        await get(child(dbRef, `${user.uid}/stats`))
            .then(snapshot => {
                if (snapshot.exists()){
                    const likes = snapshot.val()
                    if (!likes.likes){
                        setAmountOfLikes(0);
                    } else {
                        setAmountOfLikes(likes.likes)
                    }
                }
            })
        setLoading(false);
    }

    

    useEffect(() => {
        if (!user.photoURL) {
            setImage(placeholder)
        } else {
            setImage(user.photoURL)
        }
        setUsername(user.displayName);
        fetchData();
        // eslint-disable-next-line
    }, [user])

    const handleImageChange = async e => {
        setLoading(true);
        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            setImage(e.target.files[0])
        } else {
            setLoading(false);
            setError('Image must be .png or .jpg');
            setTimeout(() => {
                setError('');
            }, 5000)
            return;
        }
        
        const newImage = e.target.files[0];
        const fileRef = ref(storage, user.uid + '/images/');

        await uploadBytes(fileRef, newImage);
        const photoURL = await getDownloadURL(fileRef)

        updateProfile(user, { photoURL })
        // window.location.reload();
    }

    const handleSubmitEdit = async () => {
        const toSetUsername = username.split(' ').join('-');
        if (username.length < 3) {
            return;
        }
        setLoading(true);
        await updateProfile(user, { displayName: toSetUsername })
            .then(() => { console.log('Updated') })
            .catch(e => { console.error(e) })

        window.location.reload();
    }

    const toggleEdit = () => {
        setIsEdit(isEdit ? false : true)
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signup');
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <LoadingScreen
            loading={loading}
            bgColor='#E8EBF4'
            spinnerColor='#7336A4'
            text='Loading...'
        >
                <section id="user">
                    <h1>User Profile</h1>
                    <div className='user-card'>
                        <div className='user-image'>
                            {user.photoURL ?
                                <>
                                    {isEdit ?
                                        <>
                                            <img src={image} alt='profile' />
                                            <label className='file'>+
                                                <input
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={handleImageChange}
                                                /></label>
                                        </>
                                        :
                                        <img src={image} alt='profile' />
                                    }
                                </>
                                :
                                <>
                                    {isEdit ?
                                        <>
                                            <img src={placeholder} alt='profile' />
                                            <label className='file'>+
                                                <input
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={handleImageChange}
                                                /></label>
                                        </>
                                        :
                                        <img src={placeholder} alt='profile' />
                                    }
                                </>
                            }
                        </div>
                        <div className='social-interactions'>
                            <p>Likes: {amountOfLikes}</p>
                            <p>Dreams: {amountOfDreams}</p>
                        </div>
                        <div className='user-info'>
                            <h3>Email</h3>
                            <p>{user.email}</p>
                            {user.displayName &&
                                <>
                                    <h3>Username</h3>
                                    {isEdit ?
                                        <input
                                            placeholder='New Username...'
                                            type='text'
                                            min='1'
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                        />
                                        :
                                        <p>{user.displayName}</p>
                                    }
                                </>
                            }
                        </div>
                        {error && <p className='error-msg user-err'>{error}</p>}
                        <div className='user-action-btns'>
                            {isEdit ?
                                <>
                                    <button className='edit-account' type='button' onClick={toggleEdit}>Cancel</button>
                                    <button className='submit-edits' type='button' onClick={handleSubmitEdit}>Submit</button>
                                </>
                                :
                                <>
                                    <button className='edit-account' type='button' onClick={toggleEdit}>Edit Account</button>
                                    <button className='logout-btn' type='button' onClick={handleLogout}>Logout</button>
                                </>}

                        </div>
                    </div>
                </section>
        </LoadingScreen>
    );
}

export default UserProfileComponent
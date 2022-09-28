import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import placeholder from '../images/placeholder.png'
import './UserProfile.css';

function UserProfileComponent() {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [image, setImage] = useState(null);
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.photoURL) {
            setImage(placeholder)
        } else {
            setImage(user.photoURL)
        }
    }, [user])

    const handleImageChange = async e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        const newImage = e.target.files[0];
        const fileRef = ref(storage, user.uid + '/images/');

        await uploadBytes(fileRef, newImage);
        const photoURL = await getDownloadURL(fileRef)

        updateProfile(user, { photoURL })
        window.location.reload();
    }

    const handleUpload = async () => {
        setLoading(true)
        const fileRef = ref(storage, user.uid + '/images/');

        await uploadBytes(fileRef, image);
        const photoURL = await getDownloadURL(fileRef)

        updateProfile(user, { photoURL })
        window.location.reload();
    }

    const handleSubmitEdit = () => {
        updateProfile(user, { displayName: username })
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
        <div>
            {!user ?
                <p>Loading...</p>
                :
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
                            <p>Likes: 0</p>
                            <p>Dreams: 0</p>
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
                                            value={user.displayName}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                        />
                                        :
                                        <p>{user.displayName}</p>
                                    }
                                </>
                            }
                        </div>
                        <div className='user-action-btns'>
                            {isEdit ?
                                <>
                                    <button className='edit-account' type='button' onClick={toggleEdit}>Cancel</button>
                                    <button className='submit-edits'>Submit</button>
                                </>
                                :
                                <>
                                <button className='edit-account' type='button' onClick={toggleEdit}>Edit Account</button>
                                <button className='logout-btn' type='button' onClick={handleLogout}>Logout</button>
                                </>}
                            
                        </div>
                    </div>
                </section>
            }
        </div>
    );
}

export default UserProfileComponent
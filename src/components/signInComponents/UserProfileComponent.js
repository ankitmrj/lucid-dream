import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../firebase-config';
import { getDownloadURL, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import placeholder from '../images/placeholder.png'
import './UserProfile.css';

function UserProfileComponent() {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [image, setImage] = useState(null);
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.photoURL){
            setImage(placeholder)
        } else {
            setImage(user.photoURL)
        }
    }, [user])

    const handleImageChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        setLoading(true)
        const fileRef = ref(storage, user.uid + '/images/');

        const snapshot = await uploadBytes(fileRef, image);
        const photoURL = await getDownloadURL(fileRef)

        updateProfile(user, {photoURL})
        window.location.reload();
    }

    const handleSubmitEdit = () => {
        updateProfile(user, {displayName: username})
            .then(() => {console.log('Updated')})
            .catch(e => {console.error(e)})
        
        window.location.reload();
    }

    const toggleEdit = () => {
        setIsEdit(isEdit ? false : true)
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signup');
        } catch(e) {
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
                            <img src={image} alt='profile' />
                        </div>
                        <div className='social-interactions'>
                            <p>Likes: 0</p>
                            <p>Dreams: 0</p>
                        </div>
                        <div className='user-info'>
                            <h3>Email</h3>
                            <p>{user.email}</p>
                            { user.displayName &&
                            <>
                                <h3>Username</h3>
                                <p>{user.displayName}</p>
                            </>
}
                        </div>
                        <div className='user-action-btns'>
                            { isEdit ?
                            <button className='edit-account' type='button' onClick={toggleEdit}>Cancel</button>
                            :
                            <button className='edit-account' type='button' onClick={toggleEdit}>Edit Account</button>}
                            <button className='logout-btn' type='button' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    {isEdit &&
                    <div className='edit-user-account'> 
                        <div className='upload-image'>
                            <input 
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                            <button type='button' onClick={handleUpload} disabled={image === placeholder || loading}>Upload</button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmitEdit}>
                                <input 
                                    type='text'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                                <button type='submit'>Submit Edits</button>
                            </form>
                            
                        </div>
                        </div>
                    }
                </section>
            }
        </div>
    );
}

export default UserProfileComponent
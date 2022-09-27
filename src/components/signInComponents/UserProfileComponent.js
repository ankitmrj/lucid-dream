import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../firebase-config';
import { getDownloadURL, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import './UserProfile.css';

function UserProfileComponent() {
    const [isEdit, setIsEdit] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [image, setImage] = useState(null);
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

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
                        <div className='image'>
                            <img src={user.photoURL} alt='profile' />
                        </div>
                        <div className='user-info'>
                            <p>{user.email}</p>
                            <p>{user.displayName}</p>
                        </div>
                        <button type='button'>Edit Account</button>
                        <button type='button' onClick={handleLogout}>Logout</button>
                    </div>
                    {isEdit &&
                    <> 
                        <div className='upload-image'>
                            <input 
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                            <button onClick={handleUpload} disabled={!image || loading}>Upload</button>
                        </div>
                        <div>
                            <input 
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            
                        </div>
                        </>
                    }
                </section>
            }
        </div>
    );
}

export default UserProfileComponent
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './UserProfile.css';

function UserProfileComponent() {
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signup');
            console.log('user logged out')
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
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </section>
            }
        </div>
    );
}

export default UserProfileComponent
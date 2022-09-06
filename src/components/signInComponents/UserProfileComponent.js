import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserAuth} from '../../context/AuthContext'

function UserProfileComponent(props) {
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
                <div>
                    <h1>User</h1>
                    <p>{user.email}</p>
                    <p>{user.displayName}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }
        </div>
    );
}

export default UserProfileComponent
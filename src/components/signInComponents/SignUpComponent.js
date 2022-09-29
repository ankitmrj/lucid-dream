import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import {UserAuth} from '../../context/AuthContext'
import { getAuth, sendEmailVerification } from 'firebase/auth';

function ProfileComponent() {
    //USER VARIABLES
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    //Error variable for user feedback
    const [error, setError] = useState('');

    //imports the create user and update username from auth context
    const {createUser, updateUsername} = UserAuth();
    const navigate = useNavigate(); //navigate for when you want to switch user action

    //logic for when user clicks button or presses enter
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            //creates user and updates username 
            await createUser(registerEmail, registerPassword);
            await updateUsername(registerUsername);
            const auth = getAuth()
            await sendEmailVerification(auth.currentUser)
            navigate('/account'); //sends user to their account page
        } catch(e) {
            setError(e.message);
            console.log(e.message)
        }
    }

    return (
        <div id='sign-in-component'>
            <section id='sign-in-section'>
                <div className='sign-in-form'>
                <h1>Sign Up</h1>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='input'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            id='username' 
                            name='username' 
                            type='text'
                            onChange={(e) => {setRegisterUsername(e.target.value)}} 
                            required
                        />
                        </div>
                        <div className='input'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            id='email' 
                            name='email' 
                            type='email'
                            onChange={(e) => {setRegisterEmail(e.target.value)}} 
                            required
                        />
                        </div>
                        <div className='input'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            id='password' 
                            name='password' 
                            type='password'
                            onChange={(e) => {setRegisterPassword(e.target.value)}} 
                            required
                        />
                        </div>
                        {error && <p>{error}</p>}
                        <div className='sign-in-actions'>
                        <button type='submit' id='sign-in-button'>Sign Up</button>
                        <Link to='/signin' className='sign-up-text'>
                            Already have an account? Sign In
                        </Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ProfileComponent
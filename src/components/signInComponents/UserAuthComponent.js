import React, { useState } from 'react';
import './Profile.css';
import UserProfileComponent from './UserProfileComponent'
import { auth } from '../../firebase-config';
import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword
} from 'firebase/auth';

function ProfileComponent() {
    //USER VARIABLES
    const [user, setUser] = useState({});
    const [userAction, setUserAction] = useState('sign-in');
    //REGISTER USER VARIABLES
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    //LOGIN USER VARIABLES
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Loading and error variables for user feedback
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const toggleUserAction = () => {
        userAction === 'sign-in' ? setUserAction('sign-up') : setUserAction('sign-in');
    }

    const resetUserInputs = () => {
        setRegisterEmail('');
        setRegisterUsername('');
        setRegisterPassword('');
        setLoginEmail('');
        setLoginPassword('');
    }

    //registers user using email, username, and password
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

            //creates username and adds it to firebase
            updateProfile(auth.currentUser, {
                displayName: registerUsername
            })

            setUser(user);
            resetUserInputs();

        } catch (error) {
            console.log(error.message);
        }
    }
    //logs user in if they have an account
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            setUser(user);
            resetUserInputs();

        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div id='sign-in-component'>
            <section id='sign-in-section'>
                <div className='sign-in-form'>
                {userAction === 'sign-in' ? <h1>Sign In</h1> : <h1>Sign Up</h1>}
                    <div className='form'>
                        {userAction === 'sign-up' ?
                            <div className='input'>
                            <label htmlFor='username'>Username:</label>
                            <input 
                                id='username' 
                                name='username' 
                                type='text'
                                onChange={(e) => {setRegisterUsername(e.target.value)}} 
                            />
                            </div>
                            :
                            null
                        }
                        <div className='input'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            id='email' 
                            name='email' 
                            type='email'
                            onChange={(e) => {setLoginEmail(e.target.value)}} 
                        />
                        </div>
                        <div className='input'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            id='password' 
                            name='password' 
                            type='password'
                            onChange={(e) => {setLoginPassword(e.target.value)}} 
                        />
                        </div>
                        <div className='sign-in-actions'>
                        {userAction === 'sign-in' ? 
                            <button id='sign-in-button' onClick={login}>Sign In</button>
                            :
                            <button id='sign-in-button' onClick={register}>Sign Up</button>
                        }
                        {userAction === 'sign-in' ? 
                            <button className='sign-up-text' onClick={toggleUserAction}>Don't have an account? Sign Up</button>
                            :
                            <button className='sign-up-text' onClick={toggleUserAction}>Already have an account? Sign In</button>
                        }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileComponent
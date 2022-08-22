import React, { useEffect, useState } from 'react';
import './Profile.css';
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

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    //registers user using email, username, and password
    const register = async () => {
        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        updateProfile(auth.currentUser, {
            displayName: registerUsername
        })
        setUser(user);

        } catch (error) {
        console.log(error.message);
        }
    }
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            setUser(user);

        } catch (err) {
            console.log(err.message)
        }
    }
    const logout = async () => {
        await signOut(auth);
        setUserAction('sign-in');
    }
    if (!user){
        if (userAction === 'sign-in'){
            return (
                <div id='sign-in-component'>
                    <section id='sign-in-section'>
                        <div className='sign-in-form'>
                        <h1>Sign In</h1>
                            <div className='form'>
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
                                <button id='sign-in-button' onClick={login}>Sign In</button>
                                <a className='sign-up-text' onClick={() => setUserAction('sign-up')}>Don't have an account? Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                //<SignInComponent action={setUserAction} />
            )
        } else {
            return (
                <div className='sign-up-component'>
                    <section id='sign-in-section'>
                        <div className='sign-in-form'>
                        <h1>Sign Up</h1>
                            <div className='form'>
                                <div className='input'>
                                <label htmlFor='username'>Username:</label>
                                <input 
                                    id='username' 
                                    name='username' 
                                    type='text'
                                    onChange={(e) => {setRegisterUsername(e.target.value)}} 
                                />
                                </div>
                                <div className='input'>
                                <label htmlFor='email'>Email:</label>
                                <input 
                                    id='email' 
                                    name='email' 
                                    type='email'
                                    onChange={(e) => {setRegisterEmail(e.target.value)}} 
                                />
                                </div>
                                <div className='input'>
                                <label htmlFor='password'>Password:</label>
                                <input 
                                    id='password' 
                                    name='password' 
                                    type='password' 
                                    onChange={(e) => {setRegisterPassword(e.target.value)}}
                                />
                                </div>
                                <div className='sign-in-actions'>
                                <button id='sign-in-button' onClick={register}>Sign Up</button>
                                <a className='sign-up-text' onClick={() => setUserAction('sign-in')}>Already have an account? Sign In</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                //<SignUpComponent action={setUserAction} />
            )
        }
    }
        return (
            <>
                <h1>THIS IS A PROFILE PAGE</h1>
                <h3>{user?.displayName}</h3>
                <button onClick={logout}>Sign Out</button>
            </>
        )
    
}

export default ProfileComponent
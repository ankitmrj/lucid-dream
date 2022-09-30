import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './Profile.css';

function SignInComponent() {
    const {signIn} = UserAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signIn(loginEmail, loginPassword);
            navigate('/account');
        } catch(e) {
            if (e.message === 'Firebase: Error (auth/wrong-password).'){
                setError('Incorrect Password')
            } else if (e.message === 'Firebase: Error (auth/user-not-found).'){
                setError('User not found')
            }
            console.log(e.message)
        }
    }
    
    return (
        <div id='sign-in-component'>
            <div id='sign-in-section'>
                <div className='sign-in-form'>
                <h1>Sign In</h1>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='input'>
                            <label htmlFor='email'>Email:</label>
                            <input 
                                id='email' 
                                name='email' 
                                type='email'
                                onChange={(e) => {setLoginEmail(e.target.value)}} 
                                required
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor='password'>Password:</label>
                            <input 
                                id='password' 
                                name='password' 
                                type='password'
                                onChange={(e) => {setLoginPassword(e.target.value)}} 
                                required
                            />
                        </div>
                        {error && <p className='error-msg'>{error}</p>}
                        <div className='sign-in-actions'>
                            <button type='submit' id='sign-in-button'>Sign In</button>
                            <Link to='/signup' className='sign-up-text'>
                                Don't have an account? Sign Up
                            </Link>
                            <Link to='/password-reset' className='sign-up-text'>
                                Forgot Your Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInComponent
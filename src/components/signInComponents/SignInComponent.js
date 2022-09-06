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
            setError(e.message);
            console.log(e.message)
        }
    }
    
    return (
        <div id='sign-in-component'>
            <section id='sign-in-section'>
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
                            <button id='sign-in-button'>Sign In</button>
                            <Link to='/signup' className='sign-up-text'>
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignInComponent
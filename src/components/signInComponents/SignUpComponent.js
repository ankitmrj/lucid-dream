import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import './SignIn.css';
import { auth } from '../../firebase-config';

function SignUpComponent(props) {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      updateProfile(auth.currentUser, {
        displayName: registerUsername
      })
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

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
                      <a className='sign-up-text' onClick={() => props.action('sign-in')}>Already have an account? Sign In</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default SignUpComponent
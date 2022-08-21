import React from 'react';
import './SignIn.css';

function SignUpComponent() {
  return (
    <div className='sign-up-component'>
        <section id='sign-in-section'>
            <div className='sign-in-form'>
              <h1>Sign Up</h1>
                <form>
                    <div className='input'>
                      <label htmlFor='username'>Username:</label>
                      <input id='username' name='username' type='text' />
                    </div>
                    <div className='input'>
                      <label htmlFor='email'>Email:</label>
                      <input id='email' name='email' type='email' />
                    </div>
                    <div className='input'>
                      <label htmlFor='password'>Password:</label>
                      <input id='password' name='password' type='password' />
                    </div>
                    <div className='input'>
                      <label htmlFor='confirm-password'>Confirm Password:</label>
                      <input id='confirm-password' name='confirm-password' type='password' />
                    </div>
                    <div className='sign-in-actions'>
                      <button id='sign-in-button'>Sign In</button>
                      <a className='sign-up-text' href='/sign-in'>Already have an account? Sign In</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default SignUpComponent
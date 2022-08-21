import React from 'react';
import './SignIn.css';

function SignInComponent() {
  return (
    <div id='sign-in-component'>
        <section id='sign-in-section'>
            <div className='sign-in-form'>
              <h1>Sign In</h1>
                <form>
                    <div className='input'>
                      <label htmlFor='email'>Email:</label>
                      <input id='email' name='email' type='email' />
                    </div>
                    <div className='input'>
                      <label htmlFor='password'>Password:</label>
                      <input id='password' name='password' type='password' />
                    </div>
                    <div className='sign-in-actions'>
                      <button id='sign-in-button'>Sign In</button>
                      <a className='sign-up-text' href='/sign-up'>Don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default SignInComponent
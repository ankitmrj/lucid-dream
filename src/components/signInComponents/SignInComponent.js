import React from 'react';
import './SignIn.css';

function SignInComponent() {
  return (
    <>
        <section id='sign-in-section'>
            <div className='sign-in-form'>
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
                    <div className='sign-in-actions'>
                      <button id='sign-in-button'>Sign In</button>
                      <a className='sign-up-text' href='/'>Don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default SignInComponent
import React from 'react';
import './SignIn.css';

function SignInComponent() {
  return (
    <>
        <section id='sign-in-section'>
            <div className='sign-in-form'>
                <form>
                    <label htmlFor='username'>Username:</label>
                    <input id='username' name='username' type='text' />
                    <label htmlFor='email'>Email:</label>
                    <input id='email' name='email' type='email' />
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type='password' />
                    <button>Sign In</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default SignInComponent
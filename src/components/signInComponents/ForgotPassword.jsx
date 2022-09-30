import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const auth = getAuth();
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate('/signin')
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div id='sign-in-component'>
            <section id='sign-in-section'>
                <div className='sign-in-form'>
                    <h1>Forgot Password</h1>
                    <p className='forg-pass-desc'>It's okay, it happens to the best of us!</p>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='input'>
                            <label htmlFor='verif-email'>Enter Email:</label>
                            <input
                                id='verif-email'
                                name='verif-email'
                                type='email'
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='sign-in-actions'>
                            <button type='submit' id='sign-in-button'>Send Email</button>
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

export default ForgotPassword
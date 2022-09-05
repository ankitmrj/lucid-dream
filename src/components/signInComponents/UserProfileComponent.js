import React from 'react';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';

function UserProfileComponent(props) {
    const logout = async () => {
        await signOut(auth);
    }

    return (
        <div>USER ACCOUNT</div>
    );
}

export default UserProfileComponent
import React, { useState } from 'react';
import UserProfileComponent from './UserProfileComponent';
import UserAuthComponent from './UserAuthComponent';

function UserContainerComponent() {
    const [user, setUser] = useState(null);
    const footer = document.getElementById('footer');
    footer.style.display = 'none';
        
    return (
        <div>{user ? (<UserProfileComponent />) : (<UserAuthComponent />) }</div>
    )
}

export default UserContainerComponent
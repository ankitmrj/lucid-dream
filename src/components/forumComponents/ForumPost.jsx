import React from 'react'

const ForumPost = ({dream}) => {
    return (
        <div className='post-container'>
            <div className='post-user-info'>
                <img src={dream.userInfo.profilePic} width='50' height='50' alt='profile' />
                <h3>{dream.userInfo.username}</h3>
            </div>
            <div className='post-data'>
                <h2 className='post-dream-title'>{dream.title}</h2>
                <div className='post-tags-container'>
                    <p>Tags:</p>
                    <div className='post-tags'>
                        {dream.tags.map((tag, i) => (
                            <span key={i}>{tag}</span>
                        ))}
                    </div>
                </div>
                <p className='post-dream-text'>{dream.dreamDesc}</p>
            </div>
        </div>
    )
}

export default ForumPost
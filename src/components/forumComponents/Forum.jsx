import { child, get, getDatabase, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './Forum.css';
import ForumPost from './ForumPost';
import LoadingScreen from 'react-loading-screen';

const Forum = () => {
    const [sharedDreams, setSharedDreams] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const dbRef = ref(getDatabase());

        await get(child(dbRef, `/shared-dreams`)).then(snapshot => {
            if (snapshot.exists()) {
                const dreams = snapshot.val()
                Object.values(dreams).forEach(dream => {
                    setSharedDreams(prev => [dream, ...prev])
                })
            }
        }).catch(err => {
            console.error(err);
        })

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <LoadingScreen
            loading={loading}
            bgColor='#E8EBF4'
            spinnerColor='#7336A4'
            text='Loading...'
        >
            <section id='forum-section'>
                <h1>Welcome to the Forums!</h1>
                <p>This is a place where users like yourself can share their dreams! You can start by navigating to your personal dream journal; then when you create your dream, you are given the option to share it to the forum! Sharing and reading other peoples dreams can be beneficial because it can give you inspiration, motivation, or insight.</p>
                {sharedDreams.length > 0 ?
                    <>
                        {sharedDreams.map((dream, index) => (
                            <ForumPost dream={dream} key={index} />
                        ))}
                    </>
                    :
                    <p>No users have shared their dreams!</p>
                }
            </section>
        </LoadingScreen>
    )
}

export default Forum
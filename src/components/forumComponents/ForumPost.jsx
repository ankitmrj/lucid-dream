import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
} from "firebase/database";
import React from "react";
import { useState } from "react";
import { db } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ForumPost = ({ dream }) => {
  const { user } = UserAuth();
  const [likes, setLikes] = useState(dream.postData.likes);
  const [liked, setLiked] = useState('black');
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!user){
      return;
    }
    const dbRef = ref(getDatabase());
    let data = await get(child(dbRef, `${user.uid}/stats/likedPosts`)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            return Object.values(snapshot.val());
          } else {
            return [];
          }
        }
      );
      if (data.includes(dream.uuid)){
        setLiked('#b63030');
      } else {
        setLiked('black')
      }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [likes])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [user])

  const handleLike = async () => {
    if (!user){
      setError('You need to create an account first!');
      setTimeout(() => {
        setError('');
      }, 5000)
      return;
    }
    const dbRef = ref(getDatabase());
    if (user.uid === dream.userInfo.uid){
        setError('You cannot like your own posts!');
        setTimeout(() => {
            setError('')
        }, 5000)
        return;
    }

    let keys = await get(child(dbRef, `${user.uid}/stats/likedPosts`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          return Object.keys(snapshot.val());
        } else {
          return [];
        }
      }
    );

    let data = await get(child(dbRef, `${user.uid}/stats/likedPosts`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        } else {
          return [];
        }
      }
    );

    if (data.includes(dream.uuid)) {
      const index = data.indexOf(dream.uuid);

      await set(ref(db, `${user.uid}/stats/likedPosts/${keys[index]}`), null);

      await set(ref(db, `/shared-dreams/${dream.uuid}/postData`), {
        likes: likes - 1,
      }).catch((err) => console.error(err));

      await set(ref(db, `/${dream.userInfo.uid}/stats`), {
        likes: likes - 1,
      });
      setLikes((prev) => prev - 1);
    } else {
      await push(ref(db, `${user.uid}/stats/likedPosts`), dream.uuid);

      await set(ref(db, `/shared-dreams/${dream.uuid}/postData`), {
        likes: likes + 1,
      }).catch((err) => console.error(err));

      await set(ref(db, `/${dream.userInfo.uid}/stats`), {
        likes: likes + 1,
      });
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <div className="post-container">
      <div className="post-user-info">
        <img
          src={dream.userInfo.profilePic}
          width="50"
          height="50"
          alt="profile"
        />
        <h3>{dream.userInfo.username}</h3>
      </div>
      <div className="post-data">
        <h2 className="post-dream-title">{dream.title}</h2>
        <div className="post-tags-container">
          <p>Tags:</p>
          <div className="post-tags">
            {dream.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
        <p className="post-dream-text">{dream.dreamDesc}</p>
      </div>
      <div className="post-actions">
        <button type="button" onClick={handleLike} className="like-btn">
          <i style={{color: liked}} className="fa-solid fa-heart"></i>
        </button>
        <p>{likes}</p>
        {error && <p className="post-error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default ForumPost;

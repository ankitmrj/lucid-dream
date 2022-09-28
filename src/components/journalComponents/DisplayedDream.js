import React from 'react';
import './DisplayedDream.css';

function DisplayedDream({selectedDream, active, toggleActive}) {
  return (
    <div style={{display: active}} id='displayed-dream-component'>
      <div className='x' onClick={toggleActive}>
      </div>
      <section className='displayed-dream'>
        <h1 className='title'>{selectedDream.title}</h1>
        <p className='date'>{selectedDream.date}</p>
        <p className='tags-title'>Tags:</p>
        <div className='displayed-tags'>
          {selectedDream.tags && selectedDream.tags.map((val, i) => (
            <p key={i}>{val.charAt(0).toUpperCase() + val.slice(1)}</p>
          ))}
        </div>
        <p className='description'>{selectedDream.dreamDesc}</p>
      </section>
    </div>
  )
}

export default DisplayedDream
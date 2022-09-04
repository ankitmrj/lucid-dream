import React from 'react';
import './DisplayedDream.css';

function DisplayedDream(props) {
  return (
    <div style={{display: props.active}} id='displayed-dream-component'>
      <div className='x' onClick={props.toggleActive}>
      </div>
      <section className='displayed-dream'>
        <h1 className='title'>{props.title}</h1>
        <p className='date'>{props.date}</p>
        <p className='description'>{props.dreamDesc}</p>
      </section>
    </div>
  )
}

export default DisplayedDream
import React from 'react';
import './DisplayedDream.css';

function DisplayedDream(props) {
  return (
    <div id='displayed-dream-component'>
      <div className='x'>
        <div className='x-line'></div>
        <div className='x-line'></div>
      </div>
      <section id='displayed-dream'>
        <h1>{props.woof}</h1>
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.dreamDesc}</p>
      </section>
    </div>
  )
}

export default DisplayedDream
import React from 'react';
import './About.css';

function About() {
  return (
    <div className='about'>
        <h1>Blogging App</h1>

        <p>This app was developed using MERN technologies, CRUD functionalities, JWT authentication tokens & much more.</p>

        <p>Wanna see more? checkout my <a href='https://github.com/jubuenor' target="_blank" rel='noreferrer'>github</a>!</p>

        <h3>Juan Andres Bueno Ramirez</h3>
        <p>Systems & Computing engineer student</p>
    </div>
  )
}

export default About;
import React from 'react';

export default function About_project(props) {
    const text_style=({
        
        color: props.mode==='dark'?'white':'black'
    })
    let creator_img={
        name:`Himanshu`,
        img:'./personal.png',
        img_size:120
      };
  return (
    <>
    <div className="container" style={text_style}>
      <h2>About This Web Application</h2>
      <p>
        Welcome to our React.js-based web application! This platform showcases various utility tools that serve different purposes, all integrated into a user-friendly interface.
      </p>
      
      <h3>Features:</h3>
      
      <h4>Random Joke Generator:</h4>
      <p>
        <strong>Description:</strong> This page allows you to fetch random jokes from an API. You can select the type and category of the joke (e.g., Programming, Dark, Misc) to get either single-line jokes or two-part jokes. The application dynamically updates the joke based on your preferences.
      </p>
      <p>
        <strong>Purpose:</strong> Adds a fun and engaging element to the app by letting users enjoy random humor, with full control over the type of joke they want to see.
      </p>
      
      <h4>Live Weather:</h4>
      <p>
        <strong>Description:</strong> Stay updated with the current weather conditions for any city you search for. This feature uses an API to fetch live weather data, including temperature, humidity, and weather conditions.
      </p>
      <p>
        <strong>Purpose:</strong> Provides real-time weather information, making it easy for users to check the weather for their desired locations quickly.
      </p>
      
      <h4>TextUtils:</h4>
      <p>
        <strong>Description:</strong> A powerful text manipulation tool that allows users to transform text into uppercase, lowercase, clear text, or even copy the text to the clipboard. It also provides a character and word count feature, along with a live preview of the text transformation.
      </p>
      <p>
        <strong>Purpose:</strong> Offers quick text formatting options for users who need to manipulate text for documents, messages, or other writing purposes, all in one simple interface.
      </p>
      
      <h3>Technologies Used:</h3>
      <p>
        This web application is built using <strong>React.js</strong>. The components are modular, allowing easy integration and scalability. Each page utilizes APIs to fetch real-time data or perform real-time actions, ensuring that users have a seamless experience.
      </p>
      
      <h3>How to Navigate:</h3>
      <p>
        Use the <strong>navigation bar</strong> at the top of the page to switch between the Random Joke Generator, Live Weather, and TextUtils. Each section is designed to provide specific functionality in a clean and efficient manner.
      </p>
      <h3>Developer</h3>
      <img src={require('./personal.png')} style={{height: creator_img.img_size,width:creator_img.img_size}} name={creator_img.name} alt=''></img>
    </div>
    </>
  );
}

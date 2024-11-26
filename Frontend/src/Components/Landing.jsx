import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router';
import { getAuth, signOut } from "firebase/auth";
import app from './Firebase'

const Landing = () => {
  const auth = getAuth(app);
function goout(){
  signOut(auth).then(() => {
    alert("sign out succesfully")
  }).then(
    a('/')
  )
}
let a=useNavigate()
  function changetofeatures(){
    a('/Features')

  }
  return (
    <div className="Landing-main">
   
      <nav className="landing-nav-main">
        <div className="landing-logo">StockSense</div>
        <ul className="nav-links-main">
          <li><a href="/main">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/Features">Features</a></li>
          <li><a href="#logout" onClick={goout}>Logout</a></li>
        </ul>
      </nav>

      <div className="main-section-writeups">
        <div className="content-text">
          <h1>
            Machine learning-powered inventory management system for efficient item tracking, pricing prediction, and freshness verification in digital enterprises.
          </h1>
          <p>
            Create and deliver intelligent service solutions across inventory management and beyond using machine learning and automation.
          </p>
          <button className="cta-button" onClick={changetofeatures}>Try Our Features</button>
        </div>
        <div className="background-image-inpng">
          <img src="Invo.png" alt="Custom Background" />
        </div>
      </div>
    </div>
  );
};

export default Landing;

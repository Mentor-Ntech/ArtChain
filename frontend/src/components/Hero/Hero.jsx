import React from 'react';
import hero from "../../assets/heroArt.png";
import { Link } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {

  const marketPlace = () => {
    alert("Please connect wallet to explore Art MarketPlace")
  }

  return (
    <div className='hero'>
        <div className='first-hero'>
            <h1><span>Decentralized</span> <br /> Art Marketplace</h1>
            <div className='sub-first-hero'>
              <Link to='/artinfo'>
                <button className='first-button'>Learn More</button>
              </Link>
                <button onClick={marketPlace} className='second-button'>MarketPlace</button>
            </div>
        </div>
        <div className='second-hero'>
            <img src={hero} alt="Hero Art" />
        </div>
    </div>
  );
}

export default Hero;

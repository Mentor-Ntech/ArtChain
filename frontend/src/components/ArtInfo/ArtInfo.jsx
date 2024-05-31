import React from 'react';
import ArtLogo from "../../assets/exploreTwo.png";
// import './ArtInfo.css';

const ArtInfo = () => {
  return (
    <div className="art-info-container">
      <div className="text-overlay">
        <div className='ArtInfo'>
            <div>
                <h1>Monietize Your Art</h1>
                <p>ARTCHAIN</p>
            </div>
            <div className='ArtInfoLogo'>
                <img src={ArtLogo} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArtInfo;

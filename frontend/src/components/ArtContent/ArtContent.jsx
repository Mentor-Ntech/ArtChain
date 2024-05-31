import React from 'react';
import artContent from "../../assets/artContentOne.jpeg";
import artContentTwo from "../../assets/artContentTwo.jpeg";
import artist from "../../assets/artist.webp"
import "./ArtContent.css";

const ArtContent = () => {
  return (
    <div className='artcontent'>
      <div className='artcontent-item'>
        <h1>ARTIST DETAILS</h1>
        <div className='image-container'>
          <img src={artist} alt="Art Content" />
          <div className='overlays'>
            <button>Explore</button>
          </div>
        </div>
      </div>
      <div className='artcontent-item'>
        <h1>ART DETAILS</h1>
        <div className='image-container'>
          <img className='images' src={artContentTwo} alt="Art Content" />
          <div className='overlays'>
            <button>Explore</button>
          </div>
        </div>
      </div>
      <div className='artcontent-item'>
        <h1>ART DETAILS</h1>
        <div className='image-container'>
          <img className='images' src={artContent} alt="Art Content" />
          <div className='overlays'>
            <button>Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtContent;

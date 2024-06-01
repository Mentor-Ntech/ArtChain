import React from "react";
import ArtLogo from "../../assets/exploreTwo.png";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsCon">
      <div className="newBox">
        <div className="nexImg">
          <img src={ArtLogo} alt="" height={110} />
        </div>
        <div className="newText">
          <div className="newPara">
            <h3>Join Our Weekly Digest</h3>
            <p>Get Exclusive Promotions & Updates Straight To Your Inbox.</p>
          </div>
          <div class="🤚">
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="🌴"></div>
            <div class="👍"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

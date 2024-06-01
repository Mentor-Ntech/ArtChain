

import React from 'react';
import { FaTwitter, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  const sections = [
    {
      className: 'footFirst',
      heading: 'ArtMarket Place',
      content: [
        { text: 'NFT marketplace UI created with Anima for Figma.' },
        { text: 'Join our community' }
      ],
      icons: [<FaTwitter key="twitter" />, <FaLinkedin key="linkedin" />, <FaWhatsappSquare key="whatsapp" />],
    },
    {
      className: 'footSec',
      heading: 'Explore',
      content: [
        { text: 'Marketplace', link: '/marketplace' },
        { text: 'Rankings', link: '/rankings' },
        { text: 'Connect a Wallet', link: '/connect a Wallet' }
      ],
      icons: [],
    },
    {
      className: 'footThr',
      heading: 'Join Our Weekly Digest',
      content: [
        { text: 'Get exclusive promotions & updates straight to your inbox.' }
      ],
      icons: [],
      button: <button key="button" className="Btn">Subscribe</button>,
    },
  ];

  return (
    <div className='footerCone'>
      <div className='footerSec'>
        {sections.map((section, index) => (
          <div key={index} className={section.className}>
            <h3>{section.heading}</h3>
            {section.content.map((item, idx) => (
              item.link ? (
                <a key={idx} href={item.link}>
                  <p>{item.text}</p>
                </a>
              ) : (
                <p key={idx}>{item.text}</p>
              )
            ))}
            {section.icons.length > 0 && (
              <div className='footIcon'>
                {section.icons.map((icon) => icon)}
              </div>
            )}
            {section.button && section.button}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;


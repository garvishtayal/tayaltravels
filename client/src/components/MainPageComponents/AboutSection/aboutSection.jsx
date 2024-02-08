// Import the module CSS file
import styles from './aboutSection.module.css';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <>
      <div className={styles.aboutSectionContainer} id='about'>

        <h2 className={styles.aboutHeading}>About</h2>
        <p className={styles.aboutText}>Tayal Travels is a travel blogging site dedicated to undiscovered, unique, and unknown places that will challenge your understanding of our planet. We showcase pleasant, beautiful, and gorgeous locations that reveal the harmony of nature. We promise to deliver and continuously provide the best content. Join us on a journey to discover the extraordinary together.</p>

      </div>

      <div className={styles.aboutMeContainer} id='contact'>
        <img src='/profileImg.jpg' alt="Profile" />
        <span></span>
        <div>

          <p>
            Hello there!<br></br>
            My name is Abhishek Tayal, I am the developer and operator of Tayal Travels.<br></br><br></br>
            I have interest in a lot of different things; travel and web-dev is two of them. So I created Tayal Travels. <br></br>
            I work as a freelancer to create modern, well-functioned websites, which looks and works well.<br></br><br></br>
            If you are planning to start your own business or already have one, a good online presence is a must for you.<br></br>
            Contact me I will be joyed to help you
          </p>

          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/abhishek-tayal-676a30217" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/garvishtayal" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="mailto:garvishtayal@gmail.com">
              <FaEnvelope />
            </a>
            <a href="https://wa.me/+916375332140" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;

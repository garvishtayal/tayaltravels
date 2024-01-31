import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer >
      <div className='footer-head'>
        <img src='/logoImage.svg'></img>
        <h1>TAYAL TRAVELS</h1>
      </div>
      <div className="footer-container">
      <div className="logo-container">
        {/* Add your logo component or image here */}
        <img src="/logoImage.svg" alt="Logo" />
      </div>
      <div className="text-container">
        <p>
          Embark on a journey with us and discover the wonders of the world. 
          From hidden gems to popular destinations, our travel blog 
          brings you stories, tips, and inspiration for your next adventure.
        </p>
        <nav className="footer-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
      </div>
      <div className="join-us-container">
        <h3>Join Us</h3>
        <p>Subscribe to our newsletter for the latest updates.</p>
        <form action="#" method="post" className="subscribe-form">
          <input type="email" name="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
        
      </div>
      </div>
      <p className='footer-right-reserved'>&copy; 2024 Tayal Travels. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

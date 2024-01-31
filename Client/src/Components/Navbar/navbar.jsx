import React, { useState } from 'react';
import './navbar.css';

const Navbar = ({ isScrolled }) => {
  const [isFloatingWindowVisible, setFloatingWindowVisible] = useState(false);

  const handleHover = () => {

    setFloatingWindowVisible(true);
  };

  const handleLeave = () => {
    setFloatingWindowVisible(false);
  };


  return (
    <nav className="navbar">
      <div className={`container ${isScrolled ? 'scrolled' : ''}`}>

        <div id="menuToggle">
          <input type="checkbox" />
          <span className={`toggleIcon ${isScrolled ? 'toggleIconScroll' : ''}`}></span>
          <span className={`toggleIcon ${isScrolled ? 'toggleIconScroll' : ''}`}></span>
          <span className={`toggleIcon ${isScrolled ? 'toggleIconScroll' : ''}`}></span>
          <ul id="menu">
            <li><a href="#">Join Us</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Business Enquiry</a></li>
          </ul>
        </div>

        <div className='logoContainer'>
          <img className='logoImage' src='/logoImage.svg'></img>
          <h4 className='logoText'>TAYAL TRAVELS</h4>
        </div>

        <div className='middleSection'>
          <div
            className='navbarExplore'
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Explore
            {isFloatingWindowVisible && (
              <div className="floatingWindow">
                {/* Add your options or content for the floating window here */}
                <p>Home</p>
                <p>About</p>
                <p>Contact</p>
                <p>Business Enquiry</p>
              </div>
            )}
          </div>
          <div className='navbarDot'>.</div>
          <div
            className='navbarCategories'
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Categories
            {isFloatingWindowVisible && (
              <div className="floatingWindow">
                {/* Add your options or content for the floating window here */}
                <p>Most Recent</p>
                <p>For you</p>
                <p>Trending</p>
                <p>Peace</p>
                <p>Beauty</p>
              </div>
            )}
          </div>

          <div
            className='searchIconContainer'
          >

            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
              <path
                className={isScrolled ? 'searchIconScroll' : ''}
                d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z"></path>
            </svg>


            <div className="floatingWindow">
              <input type="text" placeholder="Type to search..." />
            </div>
          </div>

        </div>

        <div className='rightSection'>
          <button className='joinUsButton'>Join us</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

import styles from './navbar.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { IoCloseOutline } from "react-icons/io5";

const categories = ['trending', 'peace', 'adventure', 'wildlife'];

const Navbar = ({ isScrolled }) => {
  const [isFloatingWindowVisible, setFloatingWindowVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  //For Search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  //For Join
  const [showJoinWindow, setShowJoinWindow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showJoinMessage, setShowJoinMessage] = useState(false);

  const router = useRouter();
  const searchResultsContainerRef = useRef(null);

  const handleForYouClick = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];
    router.push(`/#${randomCategory}`);
  };
  const handleLinkClick = () => {
    setIsChecked(false);
  };

  const handleHover = () => {
    setFloatingWindowVisible(true);
  };

  const handleLeave = () => {
    setFloatingWindowVisible(false);
  };

  const handleSearch = async (searchTerm, pageNumber) => {
    setPageNumber(1);
    console.log(pageNumber);

    if (searchTerm.trim() !== '') {
      try {
        const url = `http://localhost:3001/api/search?searchTerm=${encodeURIComponent(searchTerm)}&pageNumber=${pageNumber}`;

        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.modifiedBlogs);
        setShowResults(true);
        setHasNextPage(data.hasNextPage);

        if (data.message && data.message === 'No blogs found.') {
          setSearchResults([]);
        }

        return data.modifiedBlogs;
      } catch (error) {
        console.error('Error searching:', error);
        return null;
      }
    }
  }

  useEffect(() => {
    const containerRef = searchResultsContainerRef.current; // Store a reference to searchResultsContainerRef.current

    if (containerRef) { // Check if containerRef is not null
      function handleScroll() {
        if (
          containerRef.scrollTop + containerRef.clientHeight === containerRef.scrollHeight
        ) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      }

      containerRef.addEventListener('scroll', handleScroll);

      return () => {
        containerRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [searchResultsContainerRef]);


  useEffect(() => {
    if (searchTerm.trim() !== '') {
      if (!hasNextPage) {

        setPageNumber(1);
        return;
      }

      async function fetchData() {
        try {
          const url = `http://localhost:3001/api/search?searchTerm=${encodeURIComponent(searchTerm)}&pageNumber=${pageNumber}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.message && data.message === 'No blogs found.') {
            setSearchResults([...prevResults]);
          } else {
            setSearchResults(prevResults => [...prevResults, ...data.modifiedBlogs]);
            setHasNextPage(data.hasNextPage);
          }
        } catch (error) {
          console.error('Error searching:', error);
        }
      }

      fetchData();
    }
  }, [pageNumber]); // Run when searchTerm or pageNumber changes

  useEffect(() => {

    function handleClickOutside(event) {
      if (showResults && !event.target.closest(`.${styles.searchIconContainer}`)) {
        setShowResults(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showResults]);


  const handleJoin = async (username, email) => {
    setShowJoinWindow(false);
    setShowJoinMessage(true);
    setTimeout(() => {
      setShowJoinMessage(false);
    }, 3000);
    try {
      const response = await fetch('http://localhost:3001/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email
        })
      });
      const data = await response.json();
      setUsername('');
      setEmail('');
      console.log(data.message);
    } catch (error) {
      console.error('Error joining:', error); // Log the error 
    }
  };



  return (
    <nav className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.menuToggle}>

        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />

        <span className={`${styles.toggleIcon} ${isScrolled ? styles.toggleIconScroll : ''}`}></span>
        <span className={`${styles.toggleIcon} ${isScrolled ? styles.toggleIconScroll : ''}`}></span>
        <span className={`${styles.toggleIcon} ${isScrolled ? styles.toggleIconScroll : ''}`}></span>

        <ul className={styles.menu}>

          <li><a
            className={styles.link}
            onClick={() => { router.push('/'); handleLinkClick(); }}>
            Home</a></li>
          <li><a
            className={styles.link}
            onClick={() => { setShowJoinWindow(true); handleLinkClick(); }}>
            Join us</a></li>
          <li><a
            className={styles.link}
            onClick={() => { handleForYouClick(); handleLinkClick(); }}>
            For you</a></li>
          <li><a
            className={styles.link}
            onClick={() => { router.push('/#about'); handleLinkClick(); }}>
            About</a></li>
          <li><a
            className={styles.link}
            onClick={() => { router.push('/#contact'); handleLinkClick(); }}>
            Contact</a></li>
          <li><a
            className={styles.link}
            onClick={() => { router.push('/#business-enquiry'); handleLinkClick(); }}>
            Business Enquiry</a></li>

        </ul>
      </div>

      <div className={styles.logoContainer}>
        <img className={styles.logoImage} src="/logoImage.svg" alt="Logo" />
        <h4 className={styles.logoText}>TAYAL TRAVELS</h4>
      </div>

      <div className={styles.middleSection}>
        <div
          className={styles.navbarExplore}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Explore
          <div className={styles.floatingWindow}>
            <p onClick={() => router.push(`/`)}>Home</p>
            <p onClick={() => router.push(`/#about`)}>About</p>
            <p onClick={() => router.push(`/#contact`)}>Contact</p>
            <p onClick={() => router.push(`/#business-enquiry`)}>Business Enquiry</p>
          </div>
        </div>
        <div className={styles.navbarDot}>.</div>
        <div
          className={styles.navbarCategories}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Categories
          <div className={styles.floatingWindow}>
            <p onClick={handleForYouClick}>For you</p>
            <p onClick={() => router.push(`/#trending`)}>Trending</p>
            <p onClick={() => router.push(`/#peace`)}>Peace</p>
            <p onClick={() => router.push(`/#adventure`)}>Adventure</p>
            <p onClick={() => router.push(`/#wildlife`)}>Beauty</p>
          </div>
        </div>

        <div
          className={styles.searchIconContainer}
        >

          <div className={`${styles.searchFloatingWindow} ${isScrolled ? styles.searchWindowScroll : ''}`}>
            <input
              name='searchTerm'
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Type Locations..." />
          </div>

          <div ref={searchResultsContainerRef} className={`${styles.searchResults} ${showResults ? styles.searchResultShow : ''} ${isScrolled ? styles.searchResultsScroll : ''}`}>
            {searchResults.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              searchResults.map((result, index) => (
                <div onClick={() => {
                  setShowResults(false);
                  setPageNumber(1);
                  router.push(`/blogs/${result.title}`);
                }}
                  key={index} className={styles.result}>
                  <img src={result.imageUrls[0]} alt='' />
                  <div>
                    <h4>{result.title}</h4>
                    <p>{result.content.contentOne}</p>
                  </div>
                </div>
              ))
            )}
          </div>


          <svg onClick={() => handleSearch(searchTerm, pageNumber)}
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
            <path
              className={`${isScrolled ? styles.searchIconScroll : ''}`}
              d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z"></path>
          </svg>

        </div>

      </div>

      <div className={styles.rightSection}>

        <button onClick={() => setShowJoinWindow(true)}
          className={styles.joinUsButton}>Join us</button>

      </div>

      <div className={`${styles.joinWindow} ${showJoinWindow ? styles.joinWindowShow : ''}`}>

        <img src='/join2.png'></img>

        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          handleJoin(username, email); // Call handleJoin function
        }}>
          <div className={styles.textContainer}>

            <h2>Join Us</h2>
            <p>You will receive a Free Digital welcome-kit from us</p>
            <label>
              Name
              <input
                type="text"
                spellCheck="false"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required // Make name field required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Make email field required
              />
            </label>

            <button type="submit"> 🤝</button>

          </div>
        </form>

        <IoCloseOutline
          className={styles.crossIcon}
          onClick={() => setShowJoinWindow(false)} />

      </div>
      {showJoinMessage &&
        <div className={styles.joinMessage}>Thanks for Joining!</div>
      }
    </nav>
  );
};

export default Navbar;

import styles from './mainAdventureComponent.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainAdventureComponent = () => {
  const [adventureBlogs, setAdventureBlogs] = useState([]);
  const [adventureImageLoaded, setAdventureImageLoaded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchAdventureBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs/c/adventure');
        const data = await response.json();
        setAdventureBlogs(data.slice(startIndex, startIndex + 3));
        setAdventureImageLoaded(false);
      } catch (error) {
        console.error('Error fetching adventure blogs:', error);
      }
    };

    fetchAdventureBlogs();
  }, [startIndex]);

  const handleNextClick = () => {
    const nextIndex = startIndex + 3;
    if (nextIndex <= 9) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = startIndex - 3;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  return (
    <div className={styles.mainAdventureComponentConatiner} id='adventure'>
      <div className={styles.mainAdventureContentContainer}>
        {/* Map over the adventure blogs */}
        {adventureBlogs.map((blog, index) => (
          <div 
          onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}
          key={index} 
          className={styles.mainAdventureItemConatiner}>
            <img
              src={blog.imageUrl}
              alt={blog.imageAlt}
              loading='lazy'
              className={!adventureImageLoaded ? styles.adventureImageLoading : ''}
              onLoad={() => setAdventureImageLoaded(true)}
            />
            <h4>{blog.location}</h4>
            <span></span>
            <p>{blog.content}</p>
          </div>
        ))}

        <div className={styles.mainAdventureTextConatiner}>
          <h2>Risk & Reward Places to Visit </h2>
          <p>Show me what you got, we bring here the most Dangerous & Risky places, but fun-to-do places.</p>

          <div>
            <h3 className={styles.adventureTextHeading}>300+</h3>
            <span style={{ margin: '-5px' }}>Locations</span>
          </div>
          <div>
            <h3 className={styles.adventureTextHeading}>10k+</h3>
            <span>Traffic</span>
          </div>
          <div>
            <h3 className={styles.adventureTextHeading}>100+</h3>
            <span>Blogs</span>
          </div>

          <button onClick={() => router.push(`/blogs/${adventureBlogs[0].title.replace(/\s+/g, '-')}`)}>Discover More</button>

          <div>
            <svg
              className={styles.adventureLeftBtn}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="10"
              viewBox="0 0 10.033 5"
              onClick={handlePrevClick}
            >
              <path
                 className={startIndex >= 3 ? styles.filledPath : styles.buttonFill}
                d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z"
              />
            </svg>

            <svg
              className={styles.adventureRightBtn}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="10"
              viewBox="0 0 10.033 5"
              onClick={handleNextClick}
            >
              <path
                 className={startIndex < 9 ? styles.filledPath : styles.buttonFill}
                d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdventureComponent;

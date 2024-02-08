import styles from './mainPageSecondComponent.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainPageSecondComponent = () => {
  const mainTrendingContentContainer = useRef(null);
  const [blogData, setBlogData] = useState(null);
  const [blogDetails, setBlogDetails] = useState(null);
  const [trendingImageLoaded, setTrendingImageLoaded] = useState(false);
  const [advImageLoaded, setAdvImageLoaded] = useState(false);
  const router = useRouter();

  const handleScroll = (direction) => {
    const container = mainTrendingContentContainer.current;
    const scrollAmount = 393;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    }
  };

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/c/latest`);
      if (response.ok) {
        const data = await response.json();
        setBlogData(data);
        setTrendingImageLoaded(false);
      } else {
        console.error('Failed to fetch blog data');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    const fetchWildlifeBlog = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs/c/wildlife');
        if (!response.ok) {
          throw new Error('Failed to fetch wildlife blog');
        }

        const data = await response.json();
        setBlogDetails(data[0]);
        setAdvImageLoaded(false);
      } catch (error) {
        console.error('Error fetching wildlife blog:', error);
      }
    };

    fetchWildlifeBlog();
  }, []);

  return (
    <div className={styles.mainPageSecondContainer} id='trending'>

      <div className={styles.mainTrendingContainer}>
        <div className={styles.mainTrendingHeading}>
          <div>
            <h3>Trending 2024</h3>
            <p>Most Exciting and Thrilling Content for the Year</p>
          </div>
          <div>
            <button
              className={styles.mainTrendingLeftBtn}
              onClick={() => handleScroll('left')}
            >
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z"  /></svg>
            </button>

            <button
              className={styles.mainTrendingRightBtn}
              onClick={() => handleScroll('right')}
            >
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z"  /></svg>
            </button>
          </div>
        </div>

        {blogData && (
          <div className={styles.mainTrendingContentContainer} ref={mainTrendingContentContainer}>
            {blogData.slice(1, 11).map((blog, index) => (
              <div onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}
              className={styles.mainTrendingItemContainer} 
              key={index}>
                <img
                  className={!trendingImageLoaded ? styles.loading : ''}
                  onLoad={() => setTrendingImageLoaded(true)}
                  loading='lazy'
                  src={blog.imageUrl}
                  alt={blog.imageAlt}
                />
                <h5>{blog.title}</h5>
                <p>{blog.imageAlt}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {blogDetails && (
        <div className={styles.mainLandscapeContentContainer}>
          <div className={styles.mainLandscapeImgConatiner}>
            <img
              className={!advImageLoaded ? styles.loading : ''}
              src={blogDetails.imageUrl}
              alt={blogDetails.imageAlt}
              onLoad={() => setAdvImageLoaded(true)}
              loading='lazy'
            />
          </div>
          <div className={styles.mainLandscapeTextContainer}>
            <p>{blogDetails.imageAlt}</p>
            <h1>{blogDetails.title}</h1>
            <p className={styles.mainLandscapeText}>{blogDetails.content}</p>
            <button onClick={() => router.push(`/blogs/${blogDetails.title.replace(/\s+/g, '-')}`)}>Explore More</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MainPageSecondComponent;

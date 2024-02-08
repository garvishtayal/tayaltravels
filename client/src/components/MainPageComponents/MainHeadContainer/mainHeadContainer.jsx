import styles from './mainHeadContainer.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainHeadContainer = () => {
  const [blogData, setBlogData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageHeadLoaded, setImageHeadLoaded] = useState(false);
  const router = useRouter();

  const fetchBlogData = async (index) => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/c/latest`);
      if (response.ok) {
        const data = await response.json();
        setBlogData(data[index]);
        setImageHeadLoaded(false); // Reset imageLoaded state for smooth transition
      } else {
        console.error('Failed to fetch blog data');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData(currentIndex);
  }, [currentIndex]);

  const handleNextBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 11);
  };

  const handlePrevBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 11) % 11);
  };

  return (
    <div className={styles.mainHeadContainer} id='home'>
      {blogData && (
        <>
          <div className={styles.mainHeadImageContainer}>
            <img
              className={`${styles.mainHeadImage} ${!imageHeadLoaded ? styles.headImgLoading : ''}`}
              onLoad={() => setImageHeadLoaded(true)}
              src={blogData.imageUrl}
              alt={blogData.imageAlt}
              loading='lazy'
            />
          </div>

          {/* Elements positioned on Head image */}
          <h1 className={styles.mainHeadImageTitle}>{blogData.title}</h1>
          <p className={styles.mainHeadImageDescription}>{blogData.imageAlt}</p>

          <svg
            className={styles.headImageLeftBtn}
            onClick={handlePrevBlog}
            version="1.1" id="ios7_x5F_arrows_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" ><g id="_x34__1_"><path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" id="icon_35_" /></g></svg>

          <svg
            className={styles.headImageRightBtn}
            onClick={handleNextBlog}
            version="1.1" id="ios7_x5F_arrows_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" ><g id="_x34__1_"><path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" id="icon_35_" /></g></svg>

          <button
          onClick={() => router.push(`/blogs/${blogData.title.replace(/\s+/g, '-')}`)}
          className={styles.headImageViewBtn}>
            View Blog
          </button>
          <div className={styles.mainHeadWindow}>
            <p>{blogData.content}</p>
          </div>
        </>
      )}
    </div>
  );
};


export default MainHeadContainer;

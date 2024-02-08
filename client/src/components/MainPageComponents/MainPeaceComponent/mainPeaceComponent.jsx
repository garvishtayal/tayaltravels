import styles from './mainPeaceComponent.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainPeaceComponent = () => {
  const [peaceBlogs, setPeaceBlogs] = useState([]);
  const [peaceImageLoaded, setPeaceImageLoaded] = useState(false);
  const [peaceImageOneLoaded, setPeaceImageOneLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPeaceBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs/c/peace');
        const data = await response.json();
        setPeaceBlogs(data);
      } catch (error) {
        console.error('Error fetching peace blogs:', error);
      }
    };

    fetchPeaceBlogs();
  }, []);

  return (
    <div className={styles.mainPeaceContainer} id='peace'>
      <h1>Relax Breathe <br></br>& Read</h1>

      <div className={styles.mainPeaceOneContainer}>
        {/* Map over the first two peace blogs */}
        {peaceBlogs.slice(0, 2).map((blog, index) => (
          <div
          onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}
          key={index} 
          className={styles.mainPeaceOneComponent}>
            <img 
              className={`${styles.mainPeaceContentImg} ${!peaceImageLoaded ? styles.peaceImageLoading : ''}`} 
              src={blog.imageUrl} 
              alt={blog.imageAlt}
              onLoad={() => setPeaceImageLoaded(true)}
              loading='lazy'
            />
            <div className={styles.mainPeaceContentText}>
              <div>
                <p>{blog.imageAlt}</p>
                <h4>{blog.title}</h4>
              </div>
              <img className={styles.peaceArrowIcon} src='/peaceArrow.svg' alt='Arrow' />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainPeaceTwoContainer}>
        {/* Map over the next three peace blogs */}
        {peaceBlogs.slice(2, 5).map((blog, index) => (
          <div onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}
          key={index} 
          className={styles.mainPeaceTwoComponent}>
            <img 
              className={`${styles.mainPeaceContentImg} ${!peaceImageOneLoaded ? styles.peaceImageLoading : ''}`}
              src={blog.imageUrl} 
              alt={blog.imageAlt}
              onLoad={() => setPeaceImageOneLoaded(true)}
              loading='lazy'
            />
            <div className={styles.mainPeaceContentText}>
              <div>
                <p>{blog.imageAlt}</p>
                <h4>{blog.title}</h4>
              </div>
              <img className={styles.peaceArrowIcon} src='/peaceArrow.svg' alt='Arrow' />
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => router.push(`/blogs/${peaceBlogs[0].title.replace(/\s+/g, '-')}`)}>More Destination</button>
    </div>
  );
}

export default MainPeaceComponent;

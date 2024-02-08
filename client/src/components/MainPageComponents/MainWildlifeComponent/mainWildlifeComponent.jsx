import styles from './mainWildlifeComponent.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainWildlifeComponent = () => {
  const [adventureSecondBlogs, setAdventureSecondBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWildlifeBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs/c/wildlife');
        const data = await response.json();
        setAdventureSecondBlogs(data);
      } catch (error) {
        console.error('Error fetching adventure blogs:', error);
      }
    };

    fetchWildlifeBlogs();
  }, []);

  return (
    <div className={styles.mainAdventureSecondComponent} id='wildlife'>

      <h1>Natural Wildlife: Our Real Home</h1>
      <p className={styles.mainAdventureSecondComponentDes}>Do you know A dog's nose is as unique as a human fingerprint?<br />
        Explore the world of War, kill, love, and survival, explore "The Forests"</p>

      <div className={styles.adventureSecondContentContainer}>

        {adventureSecondBlogs.slice(1, 7).map((blog, index) => (
          <div key={index} className={styles.adventureSecondContent}>

            <img src={blog.imageUrl} alt={blog.imageAlt}></img>

            <div className={styles.adventureSecondContentText}>
              <h4>{blog.location}</h4>
              <p>{blog.content}</p>
              <button 
              onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}>view blog</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MainWildlifeComponent;

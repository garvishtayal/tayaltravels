import React, { useState, useEffect, useRef } from 'react';
import mainStyles from '../../MainPageComponents/MainPageSecondComponent/mainPageSecondComponent.module.css';
import moreBlogsStyles from './moreBlogs.module.css';
import { useRouter } from 'next/router';

const styles = {
  ...mainStyles,
  ...moreBlogsStyles,
};

const MoreBlogs = ({category}) => {
  const [moreBlogs, setMoreBlogs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false); 
  const moreBlogsContainer = useRef(null);
  const router = useRouter();

  const fetchBlogData = async (page) => { // Pass page number to the function
    if (!hasNextPage) {
      console.log("no more blogs");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/category?category=${category}&pagenumber=${page}`); // Update endpoint with category and page number
      if (response.ok) {
        const data = await response.json();
        setMoreBlogs(prevBlogs => [...prevBlogs, ...data.blogs]);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
      } else {
        console.error('Failed to fetch blog data');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData(pageNumber); // Fetch data for the initial page
  }, [pageNumber]); // Fetch data whenever pageNumber changes

  const handleScroll = (direction) => {
    const container = moreBlogsContainer.current;
    const scrollAmount = 393;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    }
  };

  const handlePageChange = (direction) => {
    const container = moreBlogsContainer.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
  
    if (direction === 'left' && pageNumber > 1 && container.scrollLeft === 0) {
      setPageNumber(pageNumber - 1);
    } else if (direction === 'right' && container.scrollLeft === maxScrollLeft) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={`${styles.mainTrendingContainer} ${styles.moreBlogsContainer}`}>
      <div className={`${styles.mainTrendingHeading} ${styles.moreBlogsHeading}`}>
        <div>
          <h3>Why Stop?</h3>
          <p>We got Some More Amazing content here You</p>
        </div>
        <div>
          <button
            className={styles.mainTrendingLeftBtn}
            onClick={() => {
              handleScroll('left');
              handlePageChange('left');
            }}
          >
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z" /></svg>
          </button>

          <button
            className={styles.mainTrendingRightBtn}
            onClick={() => {
              handleScroll('right');
              handlePageChange('right');
            }}
          >
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z" /></svg>
          </button>
        </div>
      </div>


        <div className={`${styles.mainTrendingContentContainer} ${styles.moreBlogsItems}`} ref={moreBlogsContainer}>
          {moreBlogs.map((blog, index) => (
            <div
              className={styles.mainTrendingItemContainer}
              key={index}
              onClick={() => router.push(`/blogs/${blog.title.replace(/\s+/g, '-')}`)}
            >
              <img
                loading='lazy'
                src={blog.imageUrl}
                alt={blog.altText}
              />
              <h5>{blog.title}</h5>
              <p>{blog.altText}</p>
            </div>
          ))}
        </div>

        {loading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      )}

    </div>
  );
};

export default MoreBlogs;

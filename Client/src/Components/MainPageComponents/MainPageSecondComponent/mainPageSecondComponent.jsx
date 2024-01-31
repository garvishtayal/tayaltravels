import React, { useState, useRef, useEffect } from 'react';
import './mainPageSecondComponent.css';

const MainPageSecondComponent = () => {

  const mainTrendingContentContainer = useRef(null);
  const [blogData, setBlogData] = useState(null);
  const [blogDetails, setBlogDetails] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScroll = (direction) => {
    const container = mainTrendingContentContainer.current;
    const scrollAmount = 393;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
      console.log(scrollAmount);
    }
  };

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/c/latest`);
      if (response.ok) {
        const data = await response.json();
        setBlogData(data);
        setImageLoaded(false);
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
        setImageLoaded(false);
      } catch (error) {
        console.error('Error fetching wildlife blog:', error);
      }
    };

    fetchWildlifeBlog();
  }, []);


  return (
    <div className='mainPageSecondContainer' id='mainPageSecondContainer'>

      <div className='mainTrendingContainer'>
        <div className='mainTrendingHeading'>
          <div>
            <h3>Trending 2024</h3>
            <p>Most Exciting and Thrilling Content for the Year</p>
          </div>
          <div>

            <button 
            className='mainTrendingLeftBtn'
            onClick={() => handleScroll('left')}
            >
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z"  /></svg>
            </button>

            <button 
            className='mainTrendingRightBtn'
            onClick={() => handleScroll('right')}
            >
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M221.740994 934.737686a51.197491 51.197491 0 1 0 68.502243 76.079472l511.974913-460.777422a51.197491 51.197491 0 0 0 0-76.079472l-511.974913-460.777422A51.197491 51.197491 0 1 0 221.740994 89.262314L691.426779 512 221.740994 934.737686z"  /></svg>
            </button> 

          </div>
        </div>

        {blogData && (

          <div className='mainTrendingContentContainer' ref={mainTrendingContentContainer}>
            {blogData.slice(1, 11).map((blog, index) => (
              <div className='mainTrendingItemContainer' key={index}>
                <img
                  className={`${!imageLoaded ? 'loading' : ''}`}
                  onLoad={() => setImageLoaded(true)}
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

      <div className='mainLandscapeContentContainer'>
        <div className='mainLandscapeImgConatiner'>
        <img 
        className={`${!imageLoaded ? 'loading' : ''}`}
        src={blogDetails.imageUrl} 
        alt={blogDetails.imageAlt}
        onLoad={() => setImageLoaded(true)}
        loading='lazy'
        ></img>
        </div>
        <div className='mainLandscapeTextContainer'>
          <p>{blogDetails.imageAlt}</p>
          <h1>{blogDetails.title}</h1>
          <p className='mainLandscapeText'>{blogDetails.content}</p>
          <button>Explore More</button>
          
        </div>
      </div>
      )}

    </div>
  );
}

export default MainPageSecondComponent;
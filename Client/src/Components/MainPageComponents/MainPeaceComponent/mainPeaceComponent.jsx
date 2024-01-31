import React, { useState, useEffect } from 'react';
import './mainPeaceComponent.css';


const MainPeaceComponent = () => {

  const [peaceBlogs, setPeaceBlogs] = useState([]);
  const [peaceImageLoaded, setPeaceImageLoaded] = useState(false);
  const [peaceImageOneLoaded, setPeaceImageOneLoaded] = useState(false);

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

    <div className='mainPeaceContainer' id='mainPeaceContainer'>
      <h1>Relax Breathe <br></br>& Read</h1>

      <div className='mainPeaceOneContainer'>
        {/* Map over the first two peace blogs */}
        {peaceBlogs.slice(0, 2).map((blog, index) => (
          <div key={index} className='mainPeaceOneComponent'>
            <img 
            className={`mainPeaceContentImg ${!peaceImageLoaded ? 'peaceImageLoading' : ''}`} 
            src={blog.imageUrl} 
            alt={blog.imageAlt}
            onLoad={() => setPeaceImageLoaded(true)}
            loading='lazy'
            />
            <div className='mainPeaceContentText'>
              <div>
                <p>{blog.imageAlt}</p>
                <h4>{blog.title}</h4>
              </div>
              <img className='peaceArrowIcon' src='/peaceArrow.svg' alt='Arrow' />
            </div>
          </div>
        ))}
      </div>

      <div className='mainPeaceTwoContainer'>
        {/* Map over the next three peace blogs */}
        {peaceBlogs.slice(2, 5).map((blog, index) => (
          <div key={index} className='mainPeaceTwoComponent'>
            <img 
            className={`mainPeaceContentImg ${!peaceImageOneLoaded ? 'peaceImageLoading' : ''}`}
            src={blog.imageUrl} 
            alt={blog.imageAlt}
            onLoad={() => setPeaceImageOneLoaded(true)}
            loading='lazy'
            />
            <div className='mainPeaceContentText'>
              <div>
                <p>{blog.imageAlt}</p>
                <h4>{blog.title}</h4>
              </div>
              <img className='peaceArrowIcon' src='/peaceArrow.svg' alt='Arrow' />
            </div>
          </div>
        ))}
      </div>


      <button>More Destination</button>
    </div>

  );
}

export default MainPeaceComponent
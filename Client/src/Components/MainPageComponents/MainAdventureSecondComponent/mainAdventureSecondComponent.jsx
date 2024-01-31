import React, { useState, useEffect } from 'react';
import './mainAdventureSecondComponent.css';


const MainAdventureSecondComponent = () => {
  const [adventureSecondBlogs, setAdventureSecondBlogs] = useState([]);

  useEffect(() => {
    const fetchAdventureBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs/c/wildlife');
        const data = await response.json();
        setAdventureSecondBlogs(data);
      } catch (error) {
        console.error('Error fetching adventure blogs:', error);
      }
    };

    fetchAdventureBlogs();
  }, []);


  return(

    <div className='mainAdventureSecondComponent'>

      <h1>Natural Wildlife: Our Real Home</h1>
      <p className='mainAdventureSecondComponentDes'>Do you know A dog's nose is as unique as a human fingerprint?<br></br>
      Explore the world of War, kill, love and survival, explore "The Forests"</p>

      <div className='adventureSecondContentContainer'>

      {adventureSecondBlogs.slice(1, 7).map((blog, index) => (
        <div key={index} className='adventureSecondContent'>

          <img src={blog.imageUrl} alt={blog.imageAlt}></img>

          <div className='adventureSecondContentText'>
            <h4>{blog.location}</h4>
            <p>{blog.content}</p>
            <button>view blog</button>
          </div>

        </div>
      ))}

      </div>

    </div>

  )
}

export default MainAdventureSecondComponent;
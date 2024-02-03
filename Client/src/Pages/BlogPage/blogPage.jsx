import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom'; // Import useParams
import DOMPurify from 'dompurify';
import './blogPage.css';
import '../BlogUploadPage/uploadBlog.css'

import Navbar from '../../Components/Navbar/navbar';
import Footer from '../../Components/Footer/footer'


const BlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      const isScrolling = window.scrollY > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  // Use the useParams hook to get the blog title from the URL params
  const { title } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Use the title from the URL params
        const response = await fetch(`http://localhost:3001/api/blogs/${title}`);
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setBlogData(data);
        } else {
          setError(data.message || 'Error fetching blog data');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Error fetching blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogData) {
    return <div>No blog data available</div>;
  }



  // Split the headName into words
  const words = blogData.headInfo.headName.split(' ');
  const firstWordStyle = {
    color: 'rgba(0, 0, 0, 0.925)',
  };

  const formattedHeadName = (
    <>
      <span style={firstWordStyle}>{words[0]}</span> {words[1]}
      <br />
      {words.slice(2).join(' ')}
    </>
  );


  return (
    <>
      <Navbar isScrolled={scrolling}/>

      <div className='blogContainer'>

        <div className='blogHeadContainer'>

          <img
            src={blogData.imageUrls[0]}
            alt={blogData.imageAltTexts[0]}
          >
          </img>
          <h1>{formattedHeadName}</h1>
          <span className='customLine'></span>
          <p>{blogData.headInfo.headDescription}</p>

        </div>


        <h2>{blogData.title}</h2>
        <span className='titleUnderline'></span>
        <p className='blogDes'>{blogData.content.contentOne}</p>


        {/* Image Set Container */}
        <div className='blogImageSetContainer'>
          <div className='blogImageSetOne'>
            <div className='imgContainer imageOne'>
              <img
                alt={blogData.imageAltTexts[1]}
                src={blogData.imageUrls[1]}
              />
              <p className='imgCaption'>{blogData.imageAltTexts[1]}</p>
            </div>
            <div className='blogImgTwoThreeContainer'>
              <div className='imgContainer imageTwo'>
                <img
                  alt={blogData.imageAltTexts[2]}
                  src={blogData.imageUrls[2]}
                />
                <p className='imgCaption'>{blogData.imageAltTexts[2]}</p>
              </div>
              <div className='imgContainer imageThree'>
                <img
                  alt={blogData.imageAltTexts[3]}
                  src={blogData.imageUrls[3]}
                />
                <p className='imgCaption'>{blogData.imageAltTexts[3]}</p>
              </div>
            </div>
          </div>

          <p className='contentTwo mobileOnly' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData.content.contentTwo) }}></p>


          <div className='imgContainer imageFour'>
            <img
              alt={blogData.imageAltTexts[4]}
              src={blogData.imageUrls[4]}
            />
            <p className='imgCaption'>{blogData.imageAltTexts[4]}</p>
          </div>

          <div className='blogImgFiveSixContainer'>
            <div className='imgContainer imageFive'>
              <img
                alt={blogData.imageAltTexts[5]}
                src={blogData.imageUrls[5]}
              />
              <p className='imgCaption'>{blogData.imageAltTexts[5]}</p>
            </div>
            <div className='imgContainer imageSix'>
              <img
                alt={blogData.imageAltTexts[6]}
                src={blogData.imageUrls[6]}
              />
              <p className='imgCaption'>{blogData.imageAltTexts[6]}</p>
            </div>
          </div>
        </div>


        <p className='contentTwo desktopOnly' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData.content.contentTwo) }}></p>
        <p className='contentThree' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData.content.contentThree) }}></p>

        {/* Date and Location Components */}
        <div className='blogMetaInfo'>
          <div className='blogDate'>
            <FaCalendarAlt className='icon' />
            <p>{new Date(blogData.createdAt).toLocaleDateString()}</p>
          </div>
          <div className='blogLocation'>
            <FaMapMarkerAlt className='icon' />
            <p>{blogData.location}</p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { sanitize } from 'isomorphic-dompurify';
import blogStyles from './blogPage.module.css';
import imageSetStyles from '../../BlogImageSetContainer/blogImageSetContainer.module.css';

import Navbar from '../../Navbar/navbar';
import Footer from '../../Footer/footer'
import Head from 'next/head';
import MoreBlogs from '../MoreBlogs/moreBlogs';


const styles = {
  ...blogStyles,
  ...imageSetStyles,
};


const BlogPage = ({ blogData }) => {
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


  // Split the headName into words
  const words = blogData.headInfo.headName.split(' ');
  const firstWordStyle = {
    color: 'rgba(0, 0, 0, 0.925)',
  };

  const formattedHeadName = (
    <>
      <span style={firstWordStyle}>{words[0]}</span> {words[1]}
      <br></br>
      {words.slice(2).join(' ')}
    </>
  );


  return (
    <>
      <Navbar isScrolled={scrolling} />

      <div className={styles.blogContainer}>

        <Head>
          <title>{blogData.metaTags.metaTitle}</title>
          <meta name="description" content={blogData.metaTags.metaDescription} />
          <meta name="author" content="Abhishek Tayal" />
          <meta name="keywords" content={blogData.metaTags.keywords.join(',')} />
        </Head>

        <div className={styles.blogHeadContainer}>

          <img
            src={blogData.imageUrls[0]}
            alt={blogData.imageAltTexts[0]}
          />
          <h1>{formattedHeadName}</h1>
          <span className={styles.customLine}></span>
          <p>{blogData.headInfo.headDescription}</p>

        </div>

        <h2>{blogData.title}</h2>
        <span className={styles.titleUnderline}></span>
        <p className={styles.blogDes}>{blogData.content.contentOne}</p>

        {/* Image Set Container */}
        <div className={styles.blogImageSetContainer}>
          <div className={styles.blogImageSetOne}>
            <div className={`${styles.imgContainer} ${styles.imageOne}`}>
              <img
                alt={blogData.imageAltTexts[1]}
                src={blogData.imageUrls[1]}
              />
              <p className={styles.imgCaption}>{blogData.imageAltTexts[1]}</p>
            </div>
            <div className={styles.blogImgTwoThreeContainer}>
              <div className={`${styles.imgContainer} ${styles.imageTwo}`}>
                <img
                  alt={blogData.imageAltTexts[2]}
                  src={blogData.imageUrls[2]}
                />
                <p className={styles.imgCaption}>{blogData.imageAltTexts[2]}</p>
              </div>
              <div className={`${styles.imgContainer} ${styles.imageThree}`}>
                <img
                  alt={blogData.imageAltTexts[3]}
                  src={blogData.imageUrls[3]}
                />
                <p className={styles.imgCaption}>{blogData.imageAltTexts[3]}</p>
              </div>
            </div>
          </div>

          <p className={`${styles.contentTwo} ${styles.mobileOnly}`} dangerouslySetInnerHTML={{ __html: sanitize(blogData.content.contentTwo) }}></p>

          <div className={`${styles.imgContainer} ${styles.imageFour}`}>
            <img
              alt={blogData.imageAltTexts[4]}
              src={blogData.imageUrls[4]}
            />
            <p className={styles.imgCaption}>{blogData.imageAltTexts[4]}</p>
          </div>

          <div className={styles.blogImgFiveSixContainer}>
            <div className={`${styles.imgContainer} ${styles.imageFive}`}>
              <img
                alt={blogData.imageAltTexts[5]}
                src={blogData.imageUrls[5]}
              />
              <p className={styles.imgCaption}>{blogData.imageAltTexts[5]}</p>
            </div>
            <div className={`${styles.imgContainer} ${styles.imageSix}`}>
              <img
                alt={blogData.imageAltTexts[6]}
                src={blogData.imageUrls[6]}
              />
              <p className={styles.imgCaption}>{blogData.imageAltTexts[6]}</p>
            </div>
          </div>
        </div>

        <p className={`${styles.contentTwo} ${styles.desktopOnly}`} dangerouslySetInnerHTML={{ __html: sanitize(blogData.content.contentTwo) }}></p>
        <p className={styles.contentThree} dangerouslySetInnerHTML={{ __html: sanitize(blogData.content.contentThree) }}></p>

        {/* Date and Location Components */}
        <div className={styles.blogMetaInfo}>
          <div className={styles.blogDate}>
            <FaCalendarAlt className={styles.icon} />
            <p>{format(new Date(blogData.createdAt), 'MM/dd/yyyy')}</p>

          </div>
          <div className={styles.blogLocation}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>{blogData.location}</p>
          </div>
        </div>

        <MoreBlogs
        category={blogData.category}
        />

      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

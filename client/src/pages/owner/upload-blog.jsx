import withAuth from '../../utils/withAuth';

import React, { useState } from 'react';
import BlogImageSetContainer from '../../components/BlogImageSetContainer/blogImageSetContainer';
import Navbar from '../../components/Navbar/navbar';
import '../../components/BlogImageSetContainer/blogImageSetContainer.module.css';
import * as eventHandlers from '../../../../client/src/components/BlogImageSetContainer/eventHandlers';
import { useRouter } from 'next/router';
import { FaPowerOff } from "react-icons/fa6";

import imageSetStyles from '../../components/BlogImageSetContainer/blogImageSetContainer.module.css';
import uploadStyles from '../../styles/uploadBlog.module.css';
import panelStyles from '../../styles/panel.module.css';

const styles = {
  ...imageSetStyles,
  ...uploadStyles,
  ...panelStyles,
};

const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    metaTags: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
    },
    category: '',
    location: '',
    title: 'Blog Title',
    headInfo: {
      headName: '',
      headDescription: '',
    },
    content: {
      contentOne: '',
      contentTwo: '',
      contentThree: '',
    },
    imageFiles: [],
    imagePreviews: [],
    imageAltTexts: ['Image about..?', 'Image about..?', 'Image about..?', 'Image about..?', 'Image about..?', 'Image about..?', 'Image about..?'],
  });


  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Add any additional logic or redirection here
    }, 2000);
  };


  return (
    <>

      {/* Header */}
      <div className={`${styles.header} ${styles.uploadHeader}`}>
        <h2>Owner Panel</h2>
        <div>
          <img src='/logoImage.svg'></img>
          <h4>TAYAL TRAVELS</h4>
          <FaPowerOff 
          onClick={() => {
            localStorage.removeItem('token');
            router.replace('/');
          }}
          className={styles.powerOff} size={20}/>
        </div>
      </div>


      <div className={styles.adminPageContainer}>
        <form className={styles.form} onSubmit={(e) => eventHandlers.handleSubmit(e, blogData, setBlogData, handleSuccess)}>

          <div
            className={`${styles.headImage} ${blogData.isDraggedOver === 0 ? styles.uploadImage : ''}`}
            name="image-0"
            onDrop={(e) => eventHandlers.handleImageUpload(e, 0, blogData, setBlogData)}
            onDragOver={(e) => eventHandlers.handleDragEnter(e, 0, blogData, setBlogData)}
            onDragEnter={(e) => eventHandlers.handleDragEnter(e, 0, blogData, setBlogData)}
            onDragLeave={() => eventHandlers.handleDragLeave(blogData, setBlogData)}
          >

            {blogData.imageFiles[0] && eventHandlers.renderImagePreview(0, blogData, setBlogData)}
            {blogData.imageFiles[0] && (
              <div className={styles.imagePreviewContainer}>
                <img
                  className={styles.imagePreview}
                  src={blogData.imagePreviews[0]}
                  alt={blogData.imageAltTexts[0]}
                />
                <div className={styles.altTextOverlay}>
                  <input
                    type="text"
                    className={styles.altTextInput}
                    placeholder="Enter alt text"
                    value={blogData.imageAltTexts[0]}
                    onChange={(e) => eventHandlers.handleAltTextChange(e, 0, setBlogData)}
                  />
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => eventHandlers.handleImageDelete(0, setBlogData)}
                >
                  Delete
                </button>
                <textarea
                  type="text"
                  className={`${styles.textarea} ${styles.headName}`}
                  placeholder='Something About Blog'
                  name="headName"
                  value={blogData.headInfo.headName}
                  onChange={(e) => eventHandlers.handleHeadNameInputChange(e, blogData, setBlogData)}
                />
                <textarea
                  type="text"
                  className={`${styles.textarea} ${styles.headDescription}`}
                  placeholder="What's your Blog about.."
                  name="headDescription"
                  value={blogData.headInfo.headDescription}
                  onChange={(e) => eventHandlers.handleHeadInputChange(e, blogData, setBlogData)}
                />
              </div>
            )}

            {!blogData.imageFiles[0] && (
              <div className={`${styles.uploadImageLabelContainer} ${styles.headImageLabelContainer}`}
              >
                <label className={styles.uploadImageLabel}>
                  +
                  <input
                    className={styles.ImageInput}
                    type="file"
                    name="image-0"
                    onChange={(e) => eventHandlers.handleImageUpload(e, 0, blogData, setBlogData)}
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            )}
          </div>

          <textarea
            className={`${styles.textarea} ${styles.blogTitle}`}
            type="text"
            name="title"
            value={blogData.title}
            onChange={(e) => eventHandlers.handleInputChange(e, blogData, setBlogData)}
            required
          />

          {/* Custom Underline */}
          <div className={styles.customUnderline}> </div>

          <textarea
            className={`${styles.textarea} ${styles.blogContentOne}`}
            type="text"
            name="contentOne"
            placeholder='Blog Description will come here..'
            value={blogData.content.contentOne}
            onChange={(e) => eventHandlers.handleContentChange(e, blogData, setBlogData)}
            required
          />


          {/* 6 Images Component */}
          <BlogImageSetContainer
            handleImageUpload={(e, index) => eventHandlers.handleImageUpload(e, index, blogData, setBlogData)}
            handleDragEnter={(e, index) => eventHandlers.handleDragEnter(e, index, blogData, setBlogData)}
            handleDragLeave={() => eventHandlers.handleDragLeave(blogData, setBlogData)}
            handleAltTextChange={(e, index) => eventHandlers.handleAltTextChange(e, index, setBlogData)}
            handleImageDelete={(index) => eventHandlers.handleImageDelete(index, setBlogData)}
            renderImagePreview={(index) => eventHandlers.renderImagePreview(index, blogData, setBlogData)}
            blogData={blogData}
            setBlogData={setBlogData}
          />

          <textarea
            className={`${styles.textarea} ${styles.blogContentTwo}`}
            name="contentTwo"
            value={blogData.content.contentTwo}
            placeholder='Start writing your Blog Here..'
            onChange={(e) => eventHandlers.handleContentChange(e, blogData, setBlogData)}
            required
          />

          <textarea
            className={`${styles.textarea} ${styles.blogContentThree}`}
            name="contentThree"
            value={blogData.content.contentThree}
            placeholder='Write more Blog content here..'
            onChange={(e) => eventHandlers.handleContentChange(e, blogData, setBlogData)}
            required
          />

          <label className={styles.categoryLabel}>
            Category:
            <select
              name="category"
              className={styles.blogCategory}
              value={blogData.category}
              onChange={(e) => eventHandlers.handleInputChange(e, blogData, setBlogData)}
            >
              <option value="Adventure">Adventure</option>
              <option value="Peace">Peace</option>
              <option value="Beauty">Beauty</option>
              {/* Add more options as needed */}
            </select>
          </label>

          <label className={styles.metaLabel}>
            Location:
            <input
              className={styles.metaInput}
              type="text"
              name="location"
              placeholder='Enter blog Location'
              value={blogData.location}
              onChange={(e) => eventHandlers.handleLocationChange(e, blogData, setBlogData)}
            />
          </label>

          <label className={styles.metaLabel}>
            Meta Title:
            <input
              className={styles.metaInput}
              type="text"
              name="metaTitle"
              value={blogData.metaTags.metaTitle}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>

          <label className={styles.metaLabel}>
            Meta Description:
            <textarea
              className={styles.metaInput}
              name="metaDescription"
              value={blogData.metaTags.metaDescription}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>

          <label className={styles.metaLabel}>
            Keywords (comma-separated):
            <input
              className={styles.metaInput}
              type="text"
              name="keywords"
              value={blogData.metaTags.keywords.join(', ')}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>

          <button type="submit" className={styles.blogSubmit}>Publish Blog</button>
          {/* Success message */}
          {showSuccess && <div className={`${styles.successMessage} ${styles.show}`}>Blog post published successfully!</div>}

        </form>
      </div>
    </>
  );
};

export default withAuth(BlogForm);

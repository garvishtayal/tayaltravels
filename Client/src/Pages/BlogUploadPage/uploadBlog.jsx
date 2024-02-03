import React, { useState } from 'react';
import './uploadBlog.css';
import '../../Components/BlogImageSetContainer/blogImageSetContainer.css';
import BlogImageSetContainer from '../../Components/BlogImageSetContainer/blogImageSetContainer';
import Navbar from '../../Components/Navbar/navbar';
import * as eventHandlers from './eventHandlers';

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

  return (
    <>
      <Navbar />
      <div className='adminPageContainer'>
        <form onSubmit={(e) => eventHandlers.handleSubmit(e, blogData, setBlogData)}>

          <div
            className={`headImage ${blogData.isDraggedOver === 0 ? 'uploadImage' : ''}`}
            name="image-0"
            onDrop={(e) => eventHandlers.handleImageUpload(e, 0, blogData, setBlogData)}
            onDragOver={(e) => eventHandlers.handleDragEnter(e, 0, blogData, setBlogData)}
            onDragEnter={(e) => eventHandlers.handleDragEnter(e, 0, blogData, setBlogData)}
            onDragLeave={() => eventHandlers.handleDragLeave(blogData, setBlogData)}
          >

            {blogData.imageFiles[0] && eventHandlers.renderImagePreview(0, blogData, setBlogData)}
            {blogData.imageFiles[0] && (
              <div className='imagePreviewContainer'>
                <img
                  className="imagePreview"
                  src={blogData.imagePreviews[0]}
                  alt={blogData.imageAltTexts[0]}
                />
                <div className="altTextOverlay">
                  <input
                    type="text"
                    className="altTextInput"
                    placeholder="Enter alt text"
                    value={blogData.imageAltTexts[0]}
                    onChange={(e) => eventHandlers.handleAltTextChange(e, 0, setBlogData)}
                  />
                </div>
                <button
                  className="deleteButton"
                  onClick={() => eventHandlers.handleImageDelete(0, setBlogData)}
                >
                  Delete
                </button>
                <textarea
                  type="text"
                  className='headName'
                  placeholder='Something About Blog'
                  name="headName"
                  value={blogData.headInfo.headName}
                  onChange={(e) => eventHandlers.handleHeadNameInputChange(e, blogData, setBlogData)}
                />
                <textarea
                  type="text"
                  className='headDescription'
                  placeholder="What's your Blog about.."
                  name="headDescription"
                  value={blogData.headInfo.headDescription}
                  onChange={(e) => eventHandlers.handleHeadInputChange(e, blogData, setBlogData)}
                />
              </div>
            )}

            {!blogData.imageFiles[0] && (
              <div className='uploadImageLabelContainer headImageLabelContainer'>
                <label className='uploadImageLabel'>
                  +
                  <input
                    className="ImageInput"
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
            className='blogTitle'
            type="text"
            name="title"
            value={blogData.title}
            onChange={(e) => eventHandlers.handleInputChange(e, blogData, setBlogData)}
            required
          />

          {/* Custom Underline */}
          <div className='customUnderline'> </div>

          <textarea
            className='blogContentOne'
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
            className='blogContentTwo'
            name="contentTwo"
            value={blogData.content.contentTwo}
            placeholder='Start writing your Blog Here..'
            onChange={(e) => eventHandlers.handleContentChange(e, blogData, setBlogData)}
            required
          />

          <textarea
            className='blogContentThree'
            name="contentThree"
            value={blogData.content.contentThree}
            placeholder='Write more Blog content here..'
            onChange={(e) => eventHandlers.handleContentChange(e, blogData, setBlogData)}
            required
          />

          <label className='categoryLabel'>
            Category:
            <select
              name="category"
              className='blogCategory'
              value={blogData.category}
              onChange={(e) => eventHandlers.handleInputChange(e, blogData, setBlogData)}
            >
              <option value="Adventure">Adventure</option>
              <option value="Peace">Peace</option>
              <option value="Beauty">Beauty</option>
              {/* Add more options as needed */}
            </select>
          </label>

          <label className="metaLabel">
            Location:
            <input
              className="metaInput"
              type="text"
              name="location"
              placeholder='Enter blog Location'
              value={blogData.location}
              onChange={(e) => eventHandlers.handleLocationChange(e, blogData, setBlogData)}
            />
          </label>

          <label className="metaLabel">
            Meta Title:
            <input
              className="metaInput"
              type="text"
              name="metaTitle"
              value={blogData.metaTags.metaTitle}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>

          <label className="metaLabel">
            Meta Description:
            <textarea
              className="metaInput"
              name="metaDescription"
              value={blogData.metaTags.metaDescription}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>

          <label className="metaLabel">
            Keywords (comma-separated):
            <input
              className="metaInput"
              type="text"
              name="keywords"
              value={blogData.metaTags.keywords.join(', ')}
              onChange={(e) => eventHandlers.handleMetaInputChange(e, blogData, setBlogData)}
            />
          </label>


          <button type="submit" className='blogSubmit'>Publish Blog</button>
        </form>
      </div>
    </>
  );
};

export default BlogForm;

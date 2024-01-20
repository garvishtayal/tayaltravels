import React, { useState } from 'react';
import './adminPage.css';
import BlogImageSetContainer from '../../Components/BlogImageSetContainer/blogImageSetContainer';
import * as eventHandlers from './eventHandlers';

const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    metaTags: {
      keywords: [],
    },
    category: '',
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
  });

  return (
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

          <div className='uploadImageLabelContainer headImageLabelContainer'>
            {/* Conditionally render Head Image title and Description */}
            {blogData.imageFiles[0] && (
              <>
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
              </>
            )}

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

        <button className='blogExploreButton'>Explore More</button>

        {/* 6 Images Component */}
        <BlogImageSetContainer
          handleImageUpload={(e, index) => eventHandlers.handleImageUpload(e, index, blogData, setBlogData)}
          handleDragEnter={(e, index) => eventHandlers.handleDragEnter(e, index, blogData, setBlogData)}
          handleDragLeave={() => eventHandlers.handleDragLeave(blogData, setBlogData)}
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

        <label>
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

        <button type="submit" className='blogSubmit'>Publish Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;

import React, { useState, useEffect } from 'react';
import './blogImageSetContainer.css';
import '../../Pages/BlogUploadPage/uploadBlog.css'


const BlogImageSetContainer = ({ setBlogData, handleImageUpload, handleDragEnter, handleDragLeave, handleAltTextChange, handleImageDelete, renderImagePreview, blogData }) => {


  return (
    <div className='blogImageSetContainer'>

      <div className='blogImageSetOne'>

        <div
          className={`imageOne ${blogData.isDraggedOver === 1 ? 'uploadImage' : ''}`}
          id='imageOne'
          onDrop={(e) => handleImageUpload(e, 1)}
          onDragOver={(e) => handleDragEnter(e, 1)}
          onDragEnter={(e) => handleDragEnter(e, 1)}
          onDragLeave={handleDragLeave}
        >
          {blogData.imageFiles[1] && renderImagePreview(1)}
          {blogData.imageFiles[1] && (
            <div className='imagePreviewContainer'>
              <img
                className="imagePreview"
                src={blogData.imagePreviews[1]}
                alt={blogData.imageAltTexts[1]}
              />
              <div className="altTextOverlay">
                <input
                  type="text"
                  className="altTextInput"
                  placeholder="Enter alt text"
                  value={blogData.imageAltTexts[1]}
                  onChange={(e) => handleAltTextChange(e, 1)}
                />
              </div>
              <button
                className="deleteButton"
                onClick={() => handleImageDelete(1, setBlogData)}
              >
                Delete
              </button>
            </div>
          )}
          {!blogData.imageFiles[1] && (
            <div className='uploadImageLabelContainer'>
              <label className='uploadImageLabel'>
                +
                <input
                  className="ImageInput"
                  type="file"
                  name="image-1"
                  onChange={(e) => handleImageUpload(e, 1)}
                  accept="image/*"
                  required
                />
              </label>
            </div>
          )}
        </div>

        <div className='blogImgTwoThreeContainer'>
          <div
            className={`imageTwo ${blogData.isDraggedOver === 2 ? 'uploadImage' : ''}`}
            onDrop={(e) => handleImageUpload(e, 2)}
            onDragOver={(e) => handleDragEnter(e, 2)}
            onDragEnter={(e) => handleDragEnter(e, 2)}
            onDragLeave={handleDragLeave}
          >
            {blogData.imageFiles[2] && renderImagePreview(2)}
            {blogData.imageFiles[2] && (
              <div className='imagePreviewContainer'>
                <img
                  className="imagePreview"
                  src={blogData.imagePreviews[2]}
                  alt={blogData.imageAltTexts[2]}
                />
                <div className="altTextOverlay">
                  <input
                    type="text"
                    className="altTextInput"
                    placeholder="Enter alt text"
                    value={blogData.imageAltTexts[2]}
                    onChange={(e) => handleAltTextChange(e, 2)}
                  />
                </div>
                <button
                  className="deleteButton"
                  onClick={() => handleImageDelete(2, setBlogData)}
                >
                  Delete
                </button>
              </div>
            )}
            {!blogData.imageFiles[2] && (
              <div className='uploadImageLabelContainer'>
                <label className='uploadImageLabel'>
                  +
                  <input
                    className="ImageInput"
                    type="file"
                    name="image-2"
                    onChange={(e) => handleImageUpload(e, 2)}
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            )}
          </div>

          <div
            className={`imageThree ${blogData.isDraggedOver === 3 ? 'uploadImage' : ''}`}
            onDrop={(e) => handleImageUpload(e, 3)}
            onDragOver={(e) => handleDragEnter(e, 3)}
            onDragEnter={(e) => handleDragEnter(e, 3)}
            onDragLeave={handleDragLeave}
          >
            {blogData.imageFiles[3] && renderImagePreview(3)}
            {blogData.imageFiles[3] && (
              <div className='imagePreviewContainer'>
                <img
                  className="imagePreview"
                  src={blogData.imagePreviews[3]}
                  alt={blogData.imageAltTexts[3]}
                />
                <div className="altTextOverlay">
                  <input
                    type="text"
                    className="altTextInput"
                    placeholder="Enter alt text"
                    value={blogData.imageAltTexts[3]}
                    onChange={(e) => handleAltTextChange(e, 3)}
                  />
                </div>
                <button
                  className="deleteButton"
                  onClick={() => handleImageDelete(3, setBlogData)}
                >
                  Delete
                </button>
              </div>
            )}
            {!blogData.imageFiles[3] && (
              <div className='uploadImageLabelContainer'>
                <label className='uploadImageLabel'>
                  +
                  <input
                    className="ImageInput"
                    type="file"
                    name="image-3"
                    onChange={(e) => handleImageUpload(e, 3)}
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* image set two */}
      <div
        className={`imageFour ${blogData.isDraggedOver === 4 ? 'uploadImage' : ''}`}
        onDrop={(e) => handleImageUpload(e, 4)}
        onDragOver={(e) => handleDragEnter(e, 4)}
        onDragEnter={(e) => handleDragEnter(e, 4)}
        onDragLeave={handleDragLeave}
      >
        {blogData.imageFiles[4] && renderImagePreview(4)}
        {blogData.imageFiles[4] && (
          <div className='imagePreviewContainer'>
            <img
              className="imagePreview"
              src={blogData.imagePreviews[4]}
              alt={blogData.imageAltTexts[4]}
            />
            <div className="altTextOverlay">
              <input
                type="text"
                className="altTextInput"
                placeholder="Enter alt text"
                value={blogData.imageAltTexts[4]}
                onChange={(e) => handleAltTextChange(e, 4)}
              />
            </div>
            <button
              className="deleteButton"
              onClick={() => handleImageDelete(4, setBlogData)}
            >
              Delete
            </button>
          </div>
        )}
        {!blogData.imageFiles[4] && (
          <div className='uploadImageLabelContainer'>
            <label className='uploadImageLabel'>
              +
              <input
                className="ImageInput"
                type="file"
                name="image-4"
                onChange={(e) => handleImageUpload(e, 4)}
                accept="image/*"
                required
              />
            </label>
          </div>
        )}
      </div>


      {/* image set three */}
      <div className='blogImgFiveSixContainer'>
        <div
          className={`imageFive ${blogData.isDraggedOver === 5 ? 'uploadImage' : ''}`}
          onDrop={(e) => handleImageUpload(e, 5)}
          onDragOver={(e) => handleDragEnter(e, 5)}
          onDragEnter={(e) => handleDragEnter(e, 5)}
          onDragLeave={handleDragLeave}
        >
          {blogData.imageFiles[5] && renderImagePreview(5)}
          {blogData.imageFiles[5] && (
            <div className='imagePreviewContainer'>
              <img
                className="imagePreview"
                src={blogData.imagePreviews[5]}
                alt={blogData.imageAltTexts[5]}
              />
              <div className="altTextOverlay">
                <input
                  type="text"
                  className="altTextInput"
                  placeholder="Enter alt text"
                  value={blogData.imageAltTexts[5]}
                  onChange={(e) => handleAltTextChange(e, 5)}
                />
              </div>
              <button
                className="deleteButton"
                onClick={() => handleImageDelete(5, setBlogData)}
              >
                Delete
              </button>
            </div>
          )}
          {!blogData.imageFiles[5] && (
            <div className='uploadImageLabelContainer'>
              <label className='uploadImageLabel'>
                +
                <input
                  className="ImageInput"
                  type="file"
                  name="image-5"
                  onChange={(e) => handleImageUpload(e, 5)}
                  accept="image/*"
                  required
                />
              </label>
            </div>
          )}
        </div>

        <div
          className={`imageSix ${blogData.isDraggedOver === 6 ? 'uploadImage' : ''}`}
          onDrop={(e) => handleImageUpload(e, 6)}
          onDragOver={(e) => handleDragEnter(e, 6)}
          onDragEnter={(e) => handleDragEnter(e, 6)}
          onDragLeave={handleDragLeave}
        >
          {blogData.imageFiles[6] && renderImagePreview(6)}
          {blogData.imageFiles[6] && (
            <div className='imagePreviewContainer'>
              <img
                className="imagePreview"
                src={blogData.imagePreviews[6]}
                alt={blogData.imageAltTexts[6]}
              />
              <div className="altTextOverlay">
                <input
                  type="text"
                  className="altTextInput"
                  placeholder="Enter alt text"
                  value={blogData.imageAltTexts[6]}
                  onChange={(e) => handleAltTextChange(e, 6)}
                />
              </div>
              <button
                className="deleteButton"
                onClick={() => handleImageDelete(6, setBlogData)}
              >
                Delete
              </button>
            </div>
          )}
          {!blogData.imageFiles[6] && (
            <div className='uploadImageLabelContainer'>
              <label className='uploadImageLabel'>
                +
                <input
                  className="ImageInput"
                  type="file"
                  name="image-6"
                  onChange={(e) => handleImageUpload(e, 6)}
                  accept="image/*"
                  required
                />
              </label>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default BlogImageSetContainer;

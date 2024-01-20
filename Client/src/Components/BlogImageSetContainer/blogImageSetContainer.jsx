import React from 'react';
import './blogImageSetContainer.css';
import '../../Pages/AdminPage/adminPage.css'
import * as eventHandlers from '../../Pages/AdminPage/eventHandlers';


const BlogImageSetContainer = ({ setBlogData, handleImageUpload, handleDragEnter, handleDragLeave, blogData }) => {

  const renderImagePreview = (index) => {
    const file = blogData.imageFiles[index];
    console.log(blogData.imageFiles[index]);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const altText = `Preview for image ${index + 1}`;

        setBlogData((prevData) => {
          const updatedImagePreviews = [...prevData.imagePreviews];
          updatedImagePreviews[index] = imageUrl;

          return {
            ...prevData,
            imagePreviews: updatedImagePreviews,
          };
        });
      };

      reader.readAsDataURL(file);
    }
  };

  
const handleImageDelete = (index, setBlogData) => {
  setBlogData((prevData) => {
    const updatedImageFiles = [...prevData.imageFiles];
    const updatedImagePreviews = [...prevData.imagePreviews];

    // Remove the file and preview at the specified index
    updatedImageFiles[index] = null;
    updatedImagePreviews[index] = null;

    return {
      ...prevData,
      imageFiles: updatedImageFiles,
      imagePreviews: updatedImagePreviews,
    };
  });
};



  return (
    <div className='blogImageSetContainer'>

      <div className='blogImageSetOne'>

        <div
          className={`imageOne ${blogData.isDraggedOver === 1 ? 'uploadImage' : ''}`}
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
              alt={`Preview for image 1`}
            />
            <button 
            className="deleteButton" 
            onClick={() => handleImageDelete(1, setBlogData)}
            >Delete</button>
            </div>
          )}
          {!blogData.imageFiles[1] && (
            <div className='uploadImageLabelContainer'><label
              className='uploadImageLabel'>
              +
              <input className="ImageInput" type="file" name="image-1" onChange={(e) => handleImageUpload(e, 1)} accept="image/*" required
              /></label></div>
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
            <div className='uploadImageLabelContainer'><label className='uploadImageLabel'>+
              <input className="ImageInput" type="file" name="image-2" onChange={(e) => handleImageUpload(e, 2)} accept="image/*" required
              /></label></div>
          </div>
          <div
            className={`imageThree ${blogData.isDraggedOver === 3 ? 'uploadImage' : ''}`}
            onDrop={(e) => handleImageUpload(e, 3)}
            onDragOver={(e) => handleDragEnter(e, 3)}
            onDragEnter={(e) => handleDragEnter(e, 3)}
            onDragLeave={handleDragLeave}
          >
            <div className='uploadImageLabelContainer'><label className='uploadImageLabel'>+
              <input className="ImageInput" type="file" name="image-3" onChange={(e) => handleImageUpload(e, 3)} accept="image/*" required
              /></label></div>
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
        <div className='uploadImageLabelContainer'><label className='uploadImageLabel'>+
          <input className="ImageInput" type="file" name="image-4" onChange={(e) => handleImageUpload(e, 4)} accept="image/*" required
          /></label></div>
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
          <div className='uploadImageLabelContainer'><label className='uploadImageLabel'>+
            <input className="ImageInput" type="file" name="image-5" onChange={(e) => handleImageUpload(e, 5)} accept="image/*" required
            /></label></div>
        </div>
        <div
          className={`imageSix ${blogData.isDraggedOver === 6 ? 'uploadImage' : ''}`}
          onDrop={(e) => handleImageUpload(e, 6)}
          onDragOver={(e) => handleDragEnter(e, 6)}
          onDragEnter={(e) => handleDragEnter(e, 6)}
          onDragLeave={handleDragLeave}
        >
          <div className='uploadImageLabelContainer'><label className='uploadImageLabel'>+
            <input className="ImageInput" type="file" name="image-6" onChange={(e) => handleImageUpload(e, 6)} accept="image/*" required
            /></label></div>
        </div>
      </div>

    </div>
  );
};

export default BlogImageSetContainer;

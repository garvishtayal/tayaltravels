// eventHandlers

export const handleInputChange = (e, prevData, setBlogData) => {
  const { name, value, type } = e.target;

  setBlogData((prevData) => ({
    ...prevData,
    [name]: type === 'file' ? e.target.files : value,
  }));
};

export const handleHeadInputChange = (e, prevData, setBlogData) => {
  const { name, value } = e.target;

  setBlogData((prevData) => ({
    ...prevData,
    headInfo: {
      ...prevData.headInfo,
      [name]: value,
    },
  }));
};

export const handleHeadNameInputChange = (e, prevData, setBlogData) => {
  const characterLimit = 38;
  const inputValue = e.target.value;

  if (inputValue.length <= characterLimit) {
    setBlogData((prevData) => ({
      ...prevData,
      headInfo: {
        ...prevData.headInfo,
        headName: inputValue,
      },
    }));
  }
};

export const handleContentChange = (e, prevData, setBlogData) => {
  const { name, value } = e.target;

  setBlogData((prevData) => ({
    ...prevData,
    content: {
      ...prevData.content,
      [name]: value,
    },
  }));
};

export const handleImageUpload = async (e, index, prevData, setBlogData) => {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

  if (files.length > 0) {
    const file = files[0];

    // Convert the image to WebP format using canvas
    try {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        canvas.toBlob(async (blob) => {
          const webpFile = new File([blob], file.name, { type: 'image/webp' });

          setBlogData((prevData) => {
            const updatedImageFiles = [...prevData.imageFiles];
            updatedImageFiles[index] = webpFile;

            return {
              ...prevData,
              imageFiles: updatedImageFiles,
            };
          });
        }, 'image/webp');
      };
    } catch (error) {
      console.error('Error converting image to WebP:', error);
      // Handle error appropriately
    }
  }
};


export const handleDragEnter = (e, index, prevData, setBlogData) => {
  e.preventDefault();
  setBlogData((prevData) => ({
    ...prevData,
    isDraggedOver: index,
  }));
};

export const handleDragLeave = (prevData, setBlogData) => {
  setBlogData((prevData) => ({
    ...prevData,
    isDraggedOver: null,
  }));
};

export const handleSubmit = async (e, blogData, setBlogData) => {
  e.preventDefault();

  console.log(blogData.metaTags.keywords);

  const formData = new FormData();
  formData.append('category', blogData.category);
  formData.append('title', blogData.title);
  formData.append('contentOne', blogData.content.contentOne);
  formData.append('contentTwo', blogData.content.contentTwo);
  formData.append('contentThree', blogData.content.contentThree);

  formData.append('headName', blogData.headInfo.headName);
  formData.append('headDescription', blogData.headInfo.headDescription);

  formData.append('metaTitle', blogData.metaTags.metaTitle);
  formData.append('metaDescription', blogData.metaTags.metaDescription);

  // Append each image file and alt text to the FormData
  for (let i = 0; i < blogData.imageFiles.length; i++) {
    formData.append(`images`, blogData.imageFiles[i]);
    formData.append(`imageAltTexts`, blogData.imageAltTexts[i] || ''); 
  }
  for (let i = 0; i < blogData.metaTags.keywords.length; i++) {
    formData.append('keywords', blogData.metaTags.keywords[i] || '');
  }

  try {
    const response = await fetch('http://localhost:3001/api/blogs', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Blog post published successfully!');
      // Add any additional logic or redirection here
    } else {
      console.error('Failed to publish blog post');
    }
  } catch (error) {
    console.error('Error publishing blog post:', error);
  }
};

export const renderImagePreview = (index, blogData, setBlogData) => {
  const file = blogData.imageFiles[index];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target.result;

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

export const handleAltTextChange = (e, index, setBlogData) => {
  const newAltText = e.target.value;

  setBlogData((prevData) => {
    const updatedAltTexts = [...prevData.imageAltTexts];
    updatedAltTexts[index] = newAltText || '';

    return {
      ...prevData,
      imageAltTexts: updatedAltTexts,
    };
  });
};

export const handleImageDelete = (index, setBlogData) => {
  setBlogData((prevData) => {
    const updatedImageFiles = [...prevData.imageFiles];
    const updatedImagePreviews = [...prevData.imagePreviews];
    const updatedAltTexts = [...prevData.imageAltTexts];

    // Remove the file, preview, and alt text at the specified index
    updatedImageFiles[index] = null;
    updatedImagePreviews[index] = null;
    updatedAltTexts[index] = 'Image about..?'; // Reset the alt text

    return {
      ...prevData,
      imageFiles: updatedImageFiles,
      imagePreviews: updatedImagePreviews,
      imageAltTexts: updatedAltTexts,
    };
  });
};

export const handleMetaInputChange = (e, prevData, setBlogData) => {
  const { name, value } = e.target;

  setBlogData((prevData) => ({
    ...prevData,
    metaTags: {
      ...prevData.metaTags,
      [name]: name === 'keywords' ? value.split(',').map(keyword => keyword.trim()) : value,
    },
  }));
};
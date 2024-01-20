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

export const handleImageUpload = (e, index, prevData, setBlogData) => {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

  setBlogData((prevData) => {
    const updatedImageFiles = [...prevData.imageFiles];
    updatedImageFiles[index] = files[0];
    return {
      ...prevData,
      imageFiles: updatedImageFiles,
    };
  });
  console.log(files);
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

  const formData = new FormData();
  formData.append('category', blogData.category);
  formData.append('title', blogData.title);
  formData.append('contentOne', blogData.content.contentOne);
  formData.append('contentTwo', blogData.content.contentTwo);
  formData.append('contentThree', blogData.content.contentThree);

  formData.append('headName', blogData.headInfo.headName);
  formData.append('headDescription', blogData.headInfo.headDescription);

  // Append each image file to the FormData
  for (let i = 0; i < blogData.imageFiles.length; i++) {
    formData.append(`images`, blogData.imageFiles[i]);
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

const Blog = require('../Models/blog'); 


// Controller for saving a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, imageUrls } = req.body;

    // Validate if required fields are present
    if (!title || !content || !author || !imageUrls) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newBlogPost = new Blog({
      title,
      content,
      author,
      imageUrls,
    });

    const savedBlogPost = await newBlogPost.save();

    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Controller for editing (updating) a blog post
exports.editBlog = async (req, res) => {
  try {
    const { title, content, author, imageUrls } = req.body;

    // Validate if required fields are present
    if (!title || !content || !author || !imageUrls) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedBlogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        imageUrls,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Controller for deleting a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlogPost = await Blog.findByIdAndRemove(req.params.id);

    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

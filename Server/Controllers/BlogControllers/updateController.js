const Blog = require('../../Models/blog');

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, metaTags, headInfo, category } = req.body;

    // Validate if required fields are present
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: 'All fields (title, content, author, category) are required.' });
    }

    // Retrieve the existing blog post from the database
    const existingBlogPost = await Blog.findById(id);

    if (!existingBlogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    // Update the fields
    existingBlogPost.title = title;
    existingBlogPost.content = content;
    existingBlogPost.author = author;
    existingBlogPost.metaTags = metaTags;
    existingBlogPost.headInfo = headInfo;
    existingBlogPost.category = category;

    // Save the updated blog post
    const updatedBlogPost = await existingBlogPost.save();

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

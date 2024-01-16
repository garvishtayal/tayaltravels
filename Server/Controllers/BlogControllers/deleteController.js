const Blog = require('../../Models/blog');
const AWS = require('aws-sdk');

// AWS SDK Configuration
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00WMRPGWKU6M8Y8FTQ',
  secretAccessKey: 'YrxtYUP36QqqEPT3sB4xrObRKtVxOEgacMWCJadn57E',
});

// Helper function to delete image by title
const deleteImageByTitle = async (title, index) => {
  try {
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const subfolder = `images/${sanitizedTitle}`;

    const deleteParams = {
      Bucket: 'tayaltravels',
      Key: `${subfolder}/_image_${index}.jpg`,
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    throw error;
  }
};

// Helper function to delete blog post and associated images folder
const deleteBlogAndImages = async (blogId) => {
  try {
    // Find the blog post by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error('Blog post not found.');
    }

    // Delete each image in the blog post
    for (let i = 0; i < blog.imageUrls.length; i++) {
      await deleteImageByTitle(blog.title, i + 1);
    }

    // Delete the blog post from the database
    await Blog.findByIdAndDelete(blogId);
  } catch (error) {
    throw error;
  }
};

// Controller to delete blog post and associated images
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Validate if the blog ID is provided
    if (!blogId) {
      return res.status(400).json({ message: 'Blog ID is required.' });
    }

    // Use the helper function to delete the blog post and images
    await deleteBlogAndImages(blogId);

    res.status(200).json({ message: 'Blog post and associated images deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

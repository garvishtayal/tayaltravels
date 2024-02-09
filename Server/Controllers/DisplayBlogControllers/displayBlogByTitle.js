const AWS = require('aws-sdk');
const Blog = require('../../Models/blog');
require('dotenv').config();

// AWS SDK Configuration
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const displayBlogByTitle = async (req, res) => {
  try {
    const title = req.params.title.replace(/-/g, ' ');

    // Retrieve the blog post from the database
    const blog = await Blog.findOne({title});

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    // Create temporary access URLs for the images
    const imageUrlsWithTempAccess = await Promise.all(
      blog.imageUrls.map(async (imageUrl) => {
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/'); // Extract the key from the URL

        // Generate a temporary URL for each image
        const tempUrl = s3.getSignedUrl('getObject', {
          Bucket: 'tayaltravels',
          Key: key,
          Expires: 3600,
        });

        return tempUrl;
      })
    );

    // Construct the response object
    const responseData = {
      title: blog.title,
      headInfo: blog.headInfo,
      content: blog.content,
      category: blog.category,
      imageUrls: imageUrlsWithTempAccess,
      createdAt: blog.createdAt,
      metaTags: blog.metaTags,
      imageAltTexts: blog.imageAltTexts,
      location: blog.location,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error displaying blog post by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { displayBlogByTitle };

const AWS = require('aws-sdk');
const Blog = require('../../Models/blog');

// AWS SDK Configuration
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00WMRPGWKU6M8Y8FTQ',
  secretAccessKey: 'YrxtYUP36QqqEPT3sB4xrObRKtVxOEgacMWCJadn57E',
});

// Helper function to generate temporary access URL for images
const generateImageAccessUrl = (key) => {
  const params = {
    Bucket: 'tayaltravels',
    Key: key,
    Expires: 3600, // URL expiration time in seconds
  };

  return s3.getSignedUrl('getObject', params);
};

// Route to fetch the first image (index 1) and content of all blogs with the same category
const displayBlogByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    // Fetch blogs with the specified category
    const blogs = await Blog.find({ category });

    // Extract first image (index 1) and content for each blog
    const blogDetails = blogs.map((blog) => {
      const imageUrl = blog.imageUrls[0]; // Assuming array is 0-indexed
      const imageUrlParts = imageUrl.split('/');
      const key = imageUrlParts.slice(3).join('/'); // Extract the key from the URL
      const accessUrl = generateImageAccessUrl(key);
      return {
        title: blog.title,
        imageUrl: accessUrl,
        content: blog.content,
      };
    });

    res.status(200).json(blogDetails);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { displayBlogByCategory };

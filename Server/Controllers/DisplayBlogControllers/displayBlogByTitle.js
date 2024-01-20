const AWS = require('aws-sdk');
const Blog = require('../../Models/blog');

// AWS SDK Configuration
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00WMRPGWKU6M8Y8FTQ',
  secretAccessKey: 'YrxtYUP36QqqEPT3sB4xrObRKtVxOEgacMWCJadn57E',
});

const displayBlogByTitle = async (req, res) => {
  try {
    const title = req.params.title.toLowerCase().replace(/[^a-z0-9]/g, '-');

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
          Expires: 3600, // URL expiration time in seconds (1 hour in this example)
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
      // Include other blog properties as needed
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error displaying blog post by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { displayBlogByTitle };

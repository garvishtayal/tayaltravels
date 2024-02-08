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
    Expires: 3600,
  };

  return s3.getSignedUrl('getObject', params);
};
const PAGE_SIZE = 20;

exports.displayAllBlogs = async (req, res) => {
  try {
    const { page } = req.query;
    const pageNumber = parseInt(page, 10) || 1; // Parse the page parameter as an integer, default to 1 if not provided

    const skipCount = (pageNumber - 1) * PAGE_SIZE;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(PAGE_SIZE + 1); // Fetch one extra to check if there are more pages

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found.' });
    }

    const hasNextPage = blogs.length > PAGE_SIZE;
    const blogDetails = hasNextPage ? blogs.slice(0, PAGE_SIZE) : blogs;

    const formattedBlogDetails = blogDetails.map((blog) => {
      const imageUrl = blog.imageUrls[0];
      const imageUrlParts = imageUrl.split('/');
      const key = imageUrlParts.slice(3).join('/');
      const accessUrl = generateImageAccessUrl(key);

      return {
        title: blog.title,
        imageUrl: accessUrl,
        id: blog.id,
      };
    });

    return res.status(200).json({
      hasNextPage,
      blogs: formattedBlogDetails,
    });

  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

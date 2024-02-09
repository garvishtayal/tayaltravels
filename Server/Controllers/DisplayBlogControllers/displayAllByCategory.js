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

// Helper function to generate temporary access URL for images
const generateImageAccessUrl = (key) => {
  const params = {
    Bucket: 'tayaltravels',
    Key: key,
    Expires: 3600,
  };

  return s3.getSignedUrl('getObject', params);
};

const PAGE_SIZE_FIRST_PAGE = 6; // 6 blogs for the first page
const PAGE_SIZE_SUBSEQUENT_PAGES = 5; 

exports.displayAllByCategory = async (req, res) => {
  try {
    const { category, pagenumber } = req.query;
    const pageNumber = parseInt(pagenumber, 10) || 1; // Parse the page number parameter as an integer, default to 1 if not provided

    // Determine page size based on the page number
    const pageSize = pageNumber === 1 ? PAGE_SIZE_FIRST_PAGE : PAGE_SIZE_SUBSEQUENT_PAGES;

    const skipCount = (pageNumber - 1) * pageSize;

    const blogs = await Blog.find({ category })
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(pageSize + 1); // Fetch one extra to check if there are more pages

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for the provided category.' });
    }

    const hasNextPage = blogs.length > pageSize;
    const blogDetails = hasNextPage ? blogs.slice(0, pageSize) : blogs;

    const formattedBlogDetails = blogDetails.map((blog) => {
      const imageUrl = blog.imageUrls[0];
      const imageUrlParts = imageUrl.split('/');
      const key = imageUrlParts.slice(3).join('/');
      const accessUrl = generateImageAccessUrl(key);

      return {
        title: blog.title,
        imageUrl: accessUrl,
        altText: blog.imageAltTexts[0], // Assuming altTexts array is available in your Blog model
        id: blog.id,
      };
    });

    return res.status(200).json({
      hasNextPage,
      blogs: formattedBlogDetails,
    });

  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

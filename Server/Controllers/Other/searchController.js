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

const searchBlogsByTerm = async (req, res) => {
  try {
    // Extracting searchTerm and pageNumber from the query
    const { searchTerm, pageNumber } = req.query;

    // Parsing pageNumber to an integer, defaulting to 1 if not provided or invalid
    const page = parseInt(pageNumber) || 1;

    // Setting the number of items per page
    const perPage = 5;

    // Calculating the number of documents to skip for pagination
    const skip = (page - 1) * perPage;

    // Finding related blogs using a regular expression for case-insensitive search
    const relatedBlogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { 'metaTags.metaTitle': { $regex: searchTerm, $options: 'i' } },
        { 'metaTags.metaDescription': { $regex: searchTerm, $options: 'i' } },
        { 'metaTags.keywords': { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { 'headInfo.headName': { $regex: searchTerm, $options: 'i' } },
        { 'headInfo.headDescription': { $regex: searchTerm, $options: 'i' } },
        { 'content.contentOne': { $regex: searchTerm, $options: 'i' } },
        { 'content.contentTwo': { $regex: searchTerm, $options: 'i' } },
        { 'content.contentThree': { $regex: searchTerm, $options: 'i' } },
        { imageAltTexts: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .skip(skip) // skip documents for pagination
    .limit(perPage + 1) // limit the number of documents returned, fetch one extra to check if there's a next page
    .select('title content.contentOne imageUrls imageAltTexts') // select only required fields
    .lean(); // convert documents to plain JavaScript objects

    const hasNextPage = relatedBlogs.length > perPage;

    // If there's a next page, remove the extra fetched document
    if (hasNextPage) {
      relatedBlogs.pop();
    }

    if (relatedBlogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found.' });
    }

    const modifiedBlogs = await Promise.all(relatedBlogs.map(async (blog) => {

      if (!blog.imageUrls || !blog.imageUrls.length || !blog.imageAltTexts || !blog.imageAltTexts.length) {
        return blog;
      }

      const imageUrl = blog.imageUrls[0]; // Only consider the first image URL
      const imageUrlParts = imageUrl.split('/');
      const key = imageUrlParts.slice(3).join('/'); // Extract the key from the URL
    
      // Generate a temporary URL for the first image
      const tempUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: 'tayaltravels',
        Key: key,
        Expires: 3600,
      });
    
      // Replace the first original image URL with the temporary URL in the blog object
      return {
        ...blog,
        imageUrls: [tempUrl], // Store the temporary URL as an array with a single element
        imageAltTexts: blog.imageAltTexts[0] // Assuming you only need the first alt text
      };
    }));
    
    res.status(200).json({ modifiedBlogs, hasNextPage });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { searchBlogsByTerm };

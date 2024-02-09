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

const displayBlogByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    if (category === 'latest') {
      // Fetch all blogs in descending order of creation date
      const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(11);

      if (latestBlogs.length === 0) {
        return res.status(404).json({ message: 'No blogs found.' });
      }

      const blogDetails = latestBlogs.map((blog) => {
        const imageUrl = blog.imageUrls[0];
        const imageAlt = blog.imageAltTexts[0];
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/');
        const accessUrl = generateImageAccessUrl(key);

        return {
          title: blog.title,
          imageUrl: accessUrl,
          imageAlt: imageAlt,
          content: blog.content.contentOne,
        };
      });

      return res.status(200).json(blogDetails);
    }else if (category === 'wildlife') {
      // Fetch the latest 7 blogs in the "wildlife" category
      const latestWildlifeBlogs = await Blog.find({ category: 'wildlife' })
        .sort({ createdAt: -1 })
        .limit(7);
    
      if (!latestWildlifeBlogs || latestWildlifeBlogs.length === 0) {
        return res.status(404).json({ message: 'No wildlife blogs found.' });
      }
    
      const blogDetails = latestWildlifeBlogs.map((blog) => {
        const imageUrl = blog.imageUrls[0];
        const imageAlt = blog.imageAltTexts[0];
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/');
        const accessUrl = generateImageAccessUrl(key);
    
        return {
          title: blog.title,
          imageUrl: accessUrl,
          imageAlt: imageAlt,
          content: blog.content.contentOne,
          location: blog.location,
        };
      });
    
      return res.status(200).json(blogDetails);
    }
     else if (category === 'adventure') {
      // Fetch the 12 latest blogs in the "adventure" category
      const adventureBlogs = await Blog.find({ category: 'adventure' }).sort({ createdAt: -1 }).limit(12);

      if (adventureBlogs.length === 0) {
        return res.status(404).json({ message: 'No adventure blogs found.' });
      }

      const adventureBlogDetails = adventureBlogs.map((blog) => {
        const imageUrl = blog.imageUrls[4]; // Assuming you want the image at index 4
        const imageAlt = blog.imageAltTexts[4]; // Assuming you want the image alt at index 4
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/');
        const accessUrl = generateImageAccessUrl(key);
    
        return {
          title: blog.title,
          imageUrl: accessUrl,
          imageAlt: imageAlt,
          content: blog.content.contentOne,
          location: blog.location,
        };
      });
    
      return res.status(200).json(adventureBlogDetails);
    } else if (category === 'peace'){
      const peaceBlogs = await Blog.find({ category: 'peace' }).sort({ createdAt: -1 }).limit(5);

      if (peaceBlogs.length === 0) {
        return res.status(404).json({ message: 'No Peace blogs found.' });
      }

      const peaceBlogDetails = peaceBlogs.map((blog) => {
        const imageUrl = blog.imageUrls[0];
        const imageAlt = blog.imageAltTexts[0];
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/');
        const accessUrl = generateImageAccessUrl(key);
    
        return {
          title: blog.title,
          imageUrl: accessUrl,
          imageAlt: imageAlt,
        };
      });
    
      return res.status(200).json(peaceBlogDetails);
    } else {
      // Fetch blogs with the specified category
      const blogs = await Blog.find({ category });

      const blogDetails = blogs.map((blog) => {
        const imageUrl = blog.imageUrls[0];
        const imageUrlParts = imageUrl.split('/');
        const key = imageUrlParts.slice(3).join('/');
        const accessUrl = generateImageAccessUrl(key);
        return {
          title: blog.title,
          imageUrl: accessUrl,
          headInfo: blog.headInfo,
          content: blog.content,
        };
      });

      return res.status(200).json(blogDetails);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { displayBlogByCategory };

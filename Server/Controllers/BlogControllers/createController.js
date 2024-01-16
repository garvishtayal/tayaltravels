const Blog = require('../../Models/blog');
const AWS = require('aws-sdk');

// AWS SDK Configuration
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00WMRPGWKU6M8Y8FTQ',
  secretAccessKey: 'YrxtYUP36QqqEPT3sB4xrObRKtVxOEgacMWCJadn57E',
});

exports.createBlog = async (req, res) => {
  try {
    const { title, content, images, metaTags, headInfo, category } = req.body;

    // Validate if required fields are present
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'All fields (title, content, category) are required.' });
    }

    // Validate if at least one image is provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image must be provided.' });
    }

    // Create a sanitized subfolder name based on the blog title
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const subfolder = `images/${sanitizedTitle}`;

    // Upload images to DigitalOcean Spaces
    const uploadedImageUrls = await Promise.all(
      req.files.map(async (image, index) => {
        const params = {
          Bucket: 'tayaltravels',
          Key: `${subfolder}/_image_${index + 1}.jpg`,
          Body: image.buffer,
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
      })
    );

    const newBlogPost = new Blog({
      title,
      content,
      imageUrls: uploadedImageUrls,
      metaTags,
      headInfo,
      category, // Include category in the new blog post
    });

    const savedBlogPost = await newBlogPost.save();

    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

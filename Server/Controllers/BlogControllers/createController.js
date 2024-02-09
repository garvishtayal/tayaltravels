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
    // Extracting necessary data from request body
    const { title, headName, headDescription, category, imageAltTexts, location } = req.body;
    const { metaTitle, metaDescription, keywords} = req.body;
    const { contentOne, contentTwo, contentThree} = req.body;

    // Validate if required fields are present
    if (!title || !contentOne || !category) {
      return res.status(400).json({ message: 'All fields (title, content, category) are required.' });
    }

    // Check if a blog with the same title already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(400).json({ message: 'A blog with the same title already exists.' });
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
          Key: `${subfolder}/_image_${index + 1}.webp`,
          Body: image.buffer,
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
      })
    );

    // Create new blog post
    const newBlogPost = new Blog({
      title,
      content: {
        contentOne,
        contentTwo,
        contentThree
      },
      imageUrls: uploadedImageUrls,
      metaTags: {
        metaTitle,
        metaDescription,
        keywords
      },
      headInfo: {
        headName,
        headDescription
      },
      imageAltTexts,
      category,
      location,
    });

    // Save the new blog post
    const savedBlogPost = await newBlogPost.save();

    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

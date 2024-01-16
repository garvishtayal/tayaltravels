const AWS = require('aws-sdk');
const Blog = require('../../Models/blog');

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




// Controller to delete image URL from the database
exports.deleteImage = async (req, res) => {
  try {
    const { title, index } = req.body;

    // Validate if required fields are present
    if (!title || !index) {
      return res.status(400).json({ message: 'All fields (title, index) are required.' });
    }

    // Use the help function to delete Image
    await deleteImageByTitle(title, index);


    // Update the blog post after deleting the image
    const existingBlogPost = await Blog.findOne({ title });

    if (!existingBlogPost) {
      throw new Error('Blog post not found.');
    }

    existingBlogPost.imageUrls.splice(index - 1, 1);
    await existingBlogPost.save();

    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Controller to update image in DigitalOcean Spaces and the database
exports.updateImage = async (req, res) => {
  try {
    const { title, index, image } = req.body;

    // Validate if required fields are present
    if (!title || !index) {
      return res.status(400).json({ message: 'All fields (title, index, image) are required.' });
    }

    // Validate if at least one image is provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'provide image to update' });
    }

    // Use the help function to delete Image
    await deleteImageByTitle(title, index);

    // Upload the new image to DigitalOcean Spaces
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const subfolder = `images/${sanitizedTitle}`;

    const uploadParams = {
      Bucket: 'tayaltravels',
      Key: `${subfolder}/_image_${index}.jpg`,
      Body: req.files[0].buffer,
    };

    const uploadResult = await s3.upload(uploadParams).promise();

    res.status(200).json({ message: 'Image updated successfully.', imageUrl: uploadResult.Location });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

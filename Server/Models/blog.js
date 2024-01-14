const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String], // Assuming an array of image URLs
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model using the schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for use in other files
module.exports = Blog;

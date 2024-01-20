const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  metaTags: {
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: {
      type: [String],
    },
  },

  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  headInfo: {
    headName: {
      type: String,
    },
    headDescription: {
      type: String,
    },
  },
  content: {
    contentOne: {
      type: String,
    },
    contentTwo: {
      type: String,
    },
    contentThree: {
      type: String,
    }
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  },
});

// Create a Mongoose model using the schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for use in other files
module.exports = Blog;

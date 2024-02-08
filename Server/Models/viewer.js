const mongoose = require('mongoose');

// Define the schema for the viewer
const viewerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model for the viewer
const Viewer = mongoose.model('Viewer', viewerSchema);
module.exports = Viewer;

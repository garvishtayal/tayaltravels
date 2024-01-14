const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogControllers');

// Routes
router.post('/blogs', blogController.createBlog);
router.put('/blogs/:id', blogController.editBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;

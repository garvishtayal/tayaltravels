const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const createController = require('../Controllers/BlogControllers/createController');
const updateController = require('../Controllers/BlogControllers/updateController');
const deleteController = require('../Controllers/BlogControllers/deleteController');

const displayBlogByTitle = require('../Controllers/DisplayBlogControllers/displayBlogByTitle');
const displayBlogByCategory = require('../Controllers/DisplayBlogControllers/displayBlogbyCategory');
const displayAllTitles = require('../Controllers/DisplayBlogControllers/displayAllTitles');

const imageController = require('../Controllers/BlogControllers/imageController');



// Routes for Blog
router.post('/blogs', upload.array('images'), createController.createBlog);
router.put('/blogs/:id', updateController.updateBlog);
router.delete('/blogs/:id', deleteController.deleteBlog);

// Routes for Fetch Blog
router.get('/blogs/:title', displayBlogByTitle.displayBlogByTitle);
router.get('/blogs/c/:category', displayBlogByCategory.displayBlogByCategory);
router.get('/blogs/title/all', displayAllTitles.displayAllTitlesName);

// Routes to handle Images
router.put('/blogs/image', upload.array('image'), imageController.updateImage);
router.delete('/blogs/image', imageController.deleteImage);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');

const createController = require('../Controllers/BlogControllers/createController');
const updateController = require('../Controllers/BlogControllers/updateController');
const deleteController = require('../Controllers/BlogControllers/deleteController');

const displayBlogByID = require('../Controllers/DisplayBlogControllers/displayBlogById');
const displayBlogByCategory = require('../Controllers/DisplayBlogControllers/displayBlogbyCategory');

const imageController = require('../Controllers/BlogControllers/imageController');


const upload = multer();

// Routes for Blog
router.post('/blogs', upload.array('images'), createController.createBlog);
router.put('/blogs/:id', updateController.updateBlog);
router.delete('/blogs/:id', deleteController.deleteBlog);

// Routes for Fetch Blog
router.get('/blogs/:id', displayBlogByID.displayBlogByID);
router.get('/blogs/c/:category', displayBlogByCategory.displayBlogByCategory);

// Routes to handle Images
router.put('/blogs/image', upload.array('image'), imageController.updateImage);
router.delete('/blogs/image', imageController.deleteImage);

module.exports = router;

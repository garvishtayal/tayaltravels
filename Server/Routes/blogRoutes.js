const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const createController = require('../Controllers/BlogControllers/createController');
const updateController = require('../Controllers/BlogControllers/updateController');
const deleteController = require('../Controllers/BlogControllers/deleteController');

const displayBlogByTitle = require('../Controllers/DisplayBlogControllers/displayBlogByTitle');
const displayBlogByCategory = require('../Controllers/DisplayBlogControllers/displayBlogbyCategory');
const displayAllBlogs = require('../Controllers/DisplayBlogControllers/displayAllBlogs');
const displayAllByCategory = require('../Controllers/DisplayBlogControllers/displayAllByCategory')

const imageController = require('../Controllers/BlogControllers/imageController');

const authController = require('../Controllers/AuthController/authController');
const validateToken = require('../Controllers/AuthController/validateToken')

const searchController = require('../Controllers/Other/searchController')
const joinController = require('../Controllers/Other/joinController');
const viewerData = require('../Controllers/Other/viewerData')

// Routes for Blog
router.post('/blogs', upload.array('images'), createController.createBlog);
router.put('/blogs/:id', updateController.updateBlog);
router.delete('/blogs/:id', deleteController.deleteBlog);

// Routes for Fetch Blog
router.get('/blogs/:title', displayBlogByTitle.displayBlogByTitle);
router.get('/blogs/c/:category', displayBlogByCategory.displayBlogByCategory);
router.get('/all', displayAllBlogs.displayAllBlogs);
router.get('/category', displayAllByCategory.displayAllByCategory);

// Routes to handle Images
router.put('/blogs/image', upload.array('image'), imageController.updateImage);
router.delete('/blogs/image', imageController.deleteImage);

// Route for User Validation
router.post('/owner', authController.login);
router.post('/validate-token', validateToken.validateToken)

//Other Routes
router.get('/search', searchController.searchBlogsByTerm);
router.post('/join', joinController.joinController);
router.get('/viewers', viewerData.getEmailsAndUsernames);

module.exports = router;

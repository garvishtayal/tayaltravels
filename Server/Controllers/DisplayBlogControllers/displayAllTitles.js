const Blog = require('../../Models/blog');

exports.displayAllTitlesName = async (req, res) => {
  try {
    // Retrieve all blog titles from the database
    const allBlogTitles = await Blog.find({}, 'title');

    // Extract titles from the results
    const titles = allBlogTitles.map(blog => blog.title);

    // Respond with the array of titles
    res.status(200).json({ titles });
  } catch (error) {
    console.error('Error displaying all blog titles:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

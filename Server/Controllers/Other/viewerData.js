const Viewer = require('../../Models/viewer');

const getEmailsAndUsernames = async (req, res) => {
  try {
    // Fetch all viewers from the database
    const viewers = await Viewer.find({}, 'username email');

    // Extract emails and usernames
    const emailAndUsernameArray = viewers.map(viewer => ({
      email: viewer.email,
      username: viewer.username
    }));

    res.status(200).json(emailAndUsernameArray);
  } catch (error) {
    console.error('Error fetching emails and usernames:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getEmailsAndUsernames };

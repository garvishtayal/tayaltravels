const jwt = require('jsonwebtoken');
const secretKey = 'myKey';
const User = require('../../Models/user');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User don't exist" });
    }

    // For simplicity, compare passwords directly (not recommended for production)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Wrong Password' });
    }

    // Generate a new JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        // Add other user-related information if needed
      },
      secretKey,
      { expiresIn: '1h' } // Set the expiration time for the token
    );

    // localStorage.setItem('token', token);

    // Send the token in the response
    res.json({ token });

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

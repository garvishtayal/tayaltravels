const jwt = require('jsonwebtoken');
const secretKey = 'myKey';

exports.validateToken = (req, res, next) => {
  try {
    const token = req.body.token; 

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    res.status(200).json({ message: 'Authorized' });
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

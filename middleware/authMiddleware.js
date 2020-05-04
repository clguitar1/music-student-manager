const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  // check for token
  if (!token) {
    // 401 Unauthorized
    return res.status(401).json({ msg: 'No token authorization denied' });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // assign the user from the token payload to req.user so the id can be used in User.findById(req.user.id) in auth.js
    req.user = decoded.user;
    next();
  } catch (err) {
    // 401 Unauthorized
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

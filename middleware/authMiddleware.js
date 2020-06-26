const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // if there is no token return an error message
  if (!token) {
    // 401 Unauthorized
    return res.status(401).json({ msg: 'No token authorization denied' });
  }

  try {
    // if there is a token, verify it and assign the user from the token payload to req.user so the id can be used in User.findById(req.user.id) in auth.js
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    // if the token is not valid, return an error message
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

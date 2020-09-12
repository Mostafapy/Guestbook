const jwt = require('jsonwebtoken');

const logger = require('../utils/logger')('Middlewares:Authentication');

const authenticationMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization;
    if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'No  token, Authorization is denied',
      data: null
      });
    }

    // verfy token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.user;

    next();
  } catch (err) {
    logger.error('isAuthenticated', err.message);

    return res.status(401).json({
      success: false,
      msg: 'Login timed out, Token hs expired, please login again.',
      data: null
    });
  }
};

module.exports = { authenticationMiddleware };
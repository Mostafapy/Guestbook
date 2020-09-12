/* Models */
const UserModel = require('./../models/user.model');

/* Services */
const retrieveUserService = require('./../services/retrieveUser.service');

const logger = require('./../utils/logger')('Controllers:AuthController');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// @desc Register User
// @route POST /api/auth/register
// @access Public
const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const retrievedUser = await retrieveUserService(email);

      if (retrievedUser) {
        return res.status(400).json({
          success: false,
          msg: 'Invalid Credentials user already exists',
          data: null,
        });
      }

      // Create new user
      const user = await UserModel.create({
        name,
        email,
        password,
     });
 
      return res.status(201).json({
        success: true,
        msg: 'Successfully one user created',
        data: { user },
     });

    } catch (err) {
      logger.error('userRegistration', err.message);
  
      return res.status(500).json({
        success: false,
        msg: 'Server Error',
        data: null,
     });
    }
};

// @desc Login
// @route POST /api/auth/login
// @access Private
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const retrievedUser = await retrieveUserService(email);

    if (!retrievedUser) {
        return res.status(400).json({
          success: false,
          msg: 'Invalid Credentials user already exists',
          data: null,
        });
    }

    // check is password
    const isMatch = await bcrypt.compare(password, retrievedUser.password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid Credentials password is not matching',
        data: null,
      });
    }

    const payload = {
      user: {
        id: retrievedUser.id,
      },
    };

    const jwtSign = promisify(jwt.sign);

    const token = await jwtSign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(201).json({
      success: true,
      msg: 'Successfully sign in',
      data: { token },
   });

  } catch (err) {
    logger.error('login', err.message);
  
    return res.status(500).json({
      success: false,
      msg: 'Server Error',
      data: null,
   });
  }
}

module.exports = { userRegistration, login }
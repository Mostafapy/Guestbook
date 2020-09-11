/* Models */
const UserModel = require('./../models/user.model');

const logger = require('./../utils/logger')('Controllers:AuthController');

// @desc Register User
// @route POST /api/auth/register
// @access Public
const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existedUser = await UserModel.findOne({
        email,
      })

      if (existedUser) {
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
      logger.error('userRegistration()', err.message);
  
      return res.status(500).json({
        success: false,
        msg: 'Server Error',
        data: null,
     });
    }
};

module.exports = { userRegistration }
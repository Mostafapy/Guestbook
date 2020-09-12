const UserModel = require('../models/user.model');

/**
 *  Function to retrieve the requested user by the email
 * @param {String} email
 * @returns {Promise | Error}
 */
const retrieveUserByEmail = (email) => new Promise((resolve, reject) => {
    UserModel.findOne({
        email,
      }).then(user => resolve(user)).catch(err => reject(err))
});

/**
 *  Function to retrieve the requested user by the id
 * @param {String} id
 * @returns {Promise | Error}
 */

const retrieveUserById = async id => {
  try {
    const user = await userModel.findById(id).select('-password');

    return Promise.resolve(user);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return Promise.reject(new Error(`No Found Template`));
    }

    return Promise.reject(err);
  }
}

module.exports = { retrieveUserByEmail, retrieveUserById };
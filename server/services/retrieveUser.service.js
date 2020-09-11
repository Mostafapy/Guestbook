const UserModel = require('../models/user.model');

const retrieveUser = (email) => new Promise((resolve, reject) => {
    UserModel.findOne({
        email,
      }).then(user => resolve(user)).catch(err => reject(err))
});

module.exports = retrieveUser;
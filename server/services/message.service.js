const userService = require('./user.service');
const messageModel = require('../models/message.model');
/**
 * function to create new message for user profile
 * @param {String} userId
 * @param {String} messageText
 * @returns {Promise | Error}
 */
const addMessage = async (userId, messageText) => {
  try {
    const user = await userService.retrieveUserById(userId);

    const post = new messageModel({
      text: messageText,
      name: user.name,
      user: userId,
    });

    await post.save();
    return Promise.resolve(post);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Function to get all the messages
 * @returns {Promise | Error}
 */
const getMessages = async () => {
  try {
    const messages = await messageModel.find().sort({ createdAt: -1 });

    return Promise.resolve(messages);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Function to update a message by id
 * @param {String} id
 * @param {String} messageText
 * @returns {Promise | Error}
 */
const updateMessage = async (id, messageText) => {
    try {
      const message = await messageModel.findById(id);
  
      if (!message) {
        return Promise.resolve('not found');
      }
      await message.updateOne({ text: messageText});
  
      return Promise.resolve('successed');
    } catch (err) {
      return Promise.reject(err);
    }
};

/**
 * Function to delete a message by id
 * @param { String } id
 * @returns {Promise | Error}
 */
const deleteMessage = async (id) => {
  try {
    const message = await messageModel.findById(id);

    if (!message) {
      return Promise.resolve('not found');
    }
    await message.remove();

    return Promise.resolve('successed');
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * function to add reply for message
 * @param {String} userId
 * @param {String} messageId
 * @param {String} replyText
 * @returns {Promise | Error}
 */
const addReply = async (userId, messageId, replyText) => {
  try {
    const user = await userService.retrieveUserById(userId);

    const message = await messageModel.findById({ id: messageId });

    const newReply = {
      text: replyText,
      name: user.name,
      user: userId,
    };

    message.replies.unshift(newReply);

    const messageAfterAddingReply = await message.save();

    return Promise.resolve(messageAfterAddingReply);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  addReply,
};
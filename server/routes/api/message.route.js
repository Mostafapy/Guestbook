const express = require('express');
const { authenticationMiddleware } = require('../../middlewares/authentication.middleware');
const { addMessage, 
       retrieveAllMessages, 
       deleteMessageById, 
       updateMessageById, 
       addReplyForMessage 
      } = require('../../controllers/message.controller');

const router = express.Router();

// @desc Add new message
// @route POST /api/message/addMessage
// @access Private
router.post(
  '/addMessage',
  authenticationMiddleware,
  addMessage,
);

// @desc Retrieve all messages
// @route GET /api/message/retrieveAllMessages
// @access Private
router.get('/retrieveAllMessages', authenticationMiddleware, retrieveAllMessages);

// @desc Delete message by id
// @route DELETE api/message/deleteMessage/:messageId
// @access Private
router.delete('/deleteMessage/:messageId', authenticationMiddleware, deleteMessageById);


// @desc Add reply for message
// @route POST api/message/reply/:messageId
// @access Private
router.post(
  '/reply/:messageId',
  authenticationMiddleware,
  addReplyForMessage,
);

// @desc Update message by id
// @route PUT api/message/updateMessage/:messageId
// @access Private
router.put(
  '/updateMessage/:messageId',
  authenticationMiddleware,
  updateMessageById,
);

module.exports = router;
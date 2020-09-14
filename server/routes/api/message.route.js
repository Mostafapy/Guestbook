const express = require('express');
const { authenticationMiddleware } = require('../../middlewares/authentication.middleware');
const { addMessage, 
       retrieveAllMessages, 
       deleteMessageById, 
       updateMessageById, 
       addReplyForMessage,
       isSecret,
       manageMessage,
       verifyOwnerOfMessage,
       getMessageById
      } = require('../../controllers/message.controller');

const router = express.Router();

// @desc Add new message
// @route POST /api/v1/message/addMessage
// @access Private
router.post(
  '/addMessage',
  authenticationMiddleware,
  addMessage,
);

// @desc Retrieve all messages
// @route GET /api/v1/message/retrieveAllMessages
// @access Private
router.get('/retrieveAllMessages', authenticationMiddleware, retrieveAllMessages);

// @desc Delete message by id
// @route DELETE /api/v1/message/deleteMessage/:messageId
// @access Private
router.delete('/deleteMessage/:messageId', authenticationMiddleware, deleteMessageById);


// @desc Add reply for message
// @route POST /api/v1/message/reply/:messageId
// @access Private
router.post(
  '/reply/:messageId',
  authenticationMiddleware,
  addReplyForMessage,
);

// @desc Update message by id
// @route PUT /api/v1/message/updateMessage/:messageId
// @access Private
router.put(
  '/updateMessage/:messageId',
  authenticationMiddleware,
  updateMessageById,
);

// @desc verify that the message is secured
// @route GET /api/v1/v1/message/secret
// @access Private
router.get('/secret', authenticationMiddleware, isSecret);

// @desc manage the message for user
// @route GET /api/v1/message/manage
// @access Private
router.get('/manage', authenticationMiddleware, manageMessage);

// @desc verify the owner of this message
// @route GET /api/v1/message/:id/verify-user
// @access Private
router.get('/:id/verify-user', authenticationMiddleware, verifyOwnerOfMessage);

// @desc Get message by id
// @route GET /api/v1/message/:id
// @access Private
router.get('/:id', authenticationMiddleware, verifyOwnerOfMessage);
module.exports = router;
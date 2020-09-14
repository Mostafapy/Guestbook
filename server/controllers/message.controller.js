const messageModel = require('../models/message.model');
const messageService = require('./../services/message.service');
const logger = require('../utils/logger')('Controllers:MessageController');

// @desc Add new message
// @route POST /api/v1/message/addMessage
// @access Private
const addMessage = async (req, res) => {
  try {
    const message = await messageService.addMessage(req.user.id, req.body.text);

    return res.status(201).json({
        success: true,
        msg: 'Successfully add new message',
        data: { message }
    });
  } catch (err) {
    logger.error('addMessage', err.message);

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
};

// @desc Retrieve all messages
// @route GET /api/v1/message/retrieveAllMessages
// @access Private
const retrieveAllMessages = async (_req, res) => {
  try {
    const retrievedMessages = await messageService.getMessages();

    return res.status(200).json({ success: true, msg: 'successfully all messages retrieved', data: retrievedMessages});
  } catch (err) {
    logger.error('retrieveAllMessages', err.message);

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
};

// @desc Delete message by id
// @route DELETE api/message/deleteMessage/:messageId
// @access Private
const deleteMessageById = async (req, res) => {
  try {
    const operationStatus = await messageService.deleteMessage(req.params.messageId);

    if (operationStatus === 'successed') {
      return res.json({
        success: true,
        msg: `Successfully delete message by id`,
        data: null
      });
    }

    // operationStatus === 'not found'
    return res.status(404).json({
      success: false,
      msg: 'Message is not found',
      data: null,
    });
  } catch (err) {
    logger.error('DeleteMessageById', err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Message is not found',
        data: null,
      });
    }

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
};

// @desc Add reply for message
// @route POST api/v1/message/reply/:messageId
// @access Private
const addReplyForMessage = async (req, res) => {
  try {
    const message = await messageService.addReply(
      req.user.id,
      req.params.messageId,
      req.body.text,
    );

    return res.status(200).json({
        success: true,
        msg: 'Successfully add reply to this message',
        data: { message }
    });
  } catch (err) {
    logger.error('addReplyForMessage', err.message);

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
};

// @desc Update message by id
// @route PUT api/v1/message/updateMessage/:messageId
// @access Private
const updateMessageById = async (req, res) => {
    try {
      const operationStatus = await messageService.updateMessage(req.params.messageId, req.body.text);
  
      if (operationStatus === 'successed') {
        return res.json({
          success: true,
          msg: `Successfully update message by id`,
          data: null
        });
      }
  
      // operationStatus === 'not found'
      return res.status(404).json({
        success: false,
        msg: 'Message is not found',
        data: null,
      });
    } catch (err) {
      logger.error('updateMessageById', err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: 'Message is not found',
          data: null,
        });
      }
  
      return res.status(500).json({ success: false, msg: 'Server Error', data: null });
    }
};

// @desc verify that the message is secured
// @route GET /api/v1/message/secret
// @access Private
const isSecret = (req, res) => {
  res.json({
    success: true,
    msg: `Success`,
    data: { secret: true },
  });
}

// @desc manage the message for user
// @route GET /api/v1/message/manage
// @access Private
const manageMessage = async (req, res) => {
  try {
    const { user } = req;

    const foundMessage = await messageModel.where({ user }).exec();

    return res.status(200).json({
      success: true,
      msg: 'Successfully found message for this user managed',
      data: { foundMessage }
  });

  } catch (err) {
    logger.error('manageMessage', err.message);

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
}

// @desc verify the owner of this message
// @route GET /api/v1/message/:id/verifyUser
// @access Private
const verifyOwnerOfMessage = async (req, res) => {
  try {
    const { user } = req;

    const foundMessage = await messageModel.findById(req.params.id).populate('user');

    if (foundMessage.user.id !== user.id) {
      return res.status(422).json({
         success: false,
         msg: 'Invalid User! You are not message owner',
         data: null
      })
    }

    return res.status(200).json({
      success: true,
      msg: 'Verified user',
      data: { status: 'verified' }
  });

  } catch (err) {
    logger.error('verifyOwnerOfMessage', err.message);

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
}

// @desc Get message by id
// @route GET /api/v1/message/:id
// @access Private
const getMessageById = async (req, res) => {
  try {
    const foundMessage= await messageModel.findById(req.params.id).populate('user');

    return res.status(200).json({
      success: true,
      msg: 'Successfully found message for this user',
      data: { foundMessage }
   });

  } catch (err) {
    logger.error('getMessageById', err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Message is not found',
        data: null,
      });
    }

    return res.status(500).json({ success: false, msg: 'Server Error', data: null });
  }
}
module.exports = {
  addMessage,
  retrieveAllMessages,
  deleteMessageById,
  addReplyForMessage,
  updateMessageById,
  isSecret,
  manageMessage,
  verifyOwnerOfMessage,
  getMessageById
};
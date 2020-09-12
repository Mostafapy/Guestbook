const messageService = require('./../services/message.service');
const logger = require('../utils/logger')('Controllers:MessageController');

// @desc Add new message
// @route POST /api/message/addMessage
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
// @route GET /api/message/retrieveAllMessages
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
// @route POST api/message/reply/:messageId
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
// @route PUT api/message/updateMessage/:messageId
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

module.exports = {
  addMessage,
  retrieveAllMessages,
  deleteMessageById,
  addReplyForMessage,
  updateMessageById,
};
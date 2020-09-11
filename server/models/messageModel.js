const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    text: {
        type: String,
        required: [true, 'Please add a text'],
      },
    name: {
        type: String,
      },
    replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          text: {
            type: String,
            required: [true, 'Please add a text'],
          },
          name: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
     },
}, { versionKey: false });

module.exports = mongoose.model('Message', messageSchema);
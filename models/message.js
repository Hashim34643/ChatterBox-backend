const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
edited: {
    type: Boolean,
    default: false
}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

const Message = require('../models/message');

const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content, userId, roomId } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    message.content = content;
    message.edited = true;
    message.userId = userId;
    message.roomId = roomId;

    const updatedMessage = await message.save();

    res.status(200).json({ success: true, message: 'Message edited successfully', message: updatedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error editing message', error: error.message });
  }
};

module.exports = editMessage

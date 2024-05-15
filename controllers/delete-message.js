const Message = require('../models/message');

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await message.remove();

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting message', error: error.message });
  }
};

module.exports = deleteMessage;

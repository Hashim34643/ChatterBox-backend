const Message = require('../models/message');

const getMessagesByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
  }
};

module.exports = getMessagesByRoomId;

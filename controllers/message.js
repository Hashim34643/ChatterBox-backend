const Message = require('../models/message');

const sendMessage = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const { roomId } = req.params;

    const message = new Message({
      content,
      userId,
      roomId
    });

    const savedMessage = await message.save();
    res.status(201).json({ success: true, message: 'Message sent successfully', messageData: savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};

module.exports = sendMessage;

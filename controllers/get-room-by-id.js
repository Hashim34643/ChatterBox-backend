const Room = require('../models/room');

const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving room', error: error.message });
  }
};

module.exports = getRoomById;

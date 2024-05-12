const Room = require('../models/room');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({ success: true, rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving rooms', error: error.message });
  }
};

module.exports = { getAllRooms };

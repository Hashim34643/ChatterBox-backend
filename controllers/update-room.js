// roomController.js

const Room = require('../models/room');

const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, description } = req.body;

    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    existingRoom.name = name || existingRoom.name;
    existingRoom.description = description || existingRoom.description;

    const updatedRoom = await existingRoom.save();

    res.status(200).json({ success: true, message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating room', error: error.message });
  }
};

module.exports = updateRoom;

const Room = require('../models/room');
const jwt = require('jsonwebtoken');

const createRoom = async (req, res) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userIdFromToken = decodedToken.userId;
    const { userId } = req.params;
    if (userIdFromToken !== userId) {
      return res.status(404).json({ success: false, message: "Unauthorized: You can only update your own information" });
  }

    const { name, description } = req.body;
    const room = new Room({
      name,
      description,
      createdBy: userIdFromToken,
      liveStatus: true
    });

    const newRoom = await room.save();
    res.status(201).json({ success: true, message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating room', error: error.message });
  }
};

module.exports = createRoom;

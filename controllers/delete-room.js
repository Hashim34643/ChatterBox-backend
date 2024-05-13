const Room = require('../models/room');

const deleteRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.status(200).json({ success: true, message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting room', error: error.message });
    }
};

module.exports = deleteRoom;

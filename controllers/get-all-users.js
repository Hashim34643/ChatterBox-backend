const User = require("../models/create-user");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = getUsers;

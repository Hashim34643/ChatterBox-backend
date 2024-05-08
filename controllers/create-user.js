const User = require("../models/create-user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        let { username, firstName, lastName, email, password, confirmPassword, isStreamer, avatar } = req.body;
        const isNewEmail = await User.isThisEmailInUse(email);
        if (!avatar) {
            avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTs4XdD00sHtFKBYeyzKvz1CUHr598N0yrUA&s";
        }
        if (!isNewEmail) {
            return res.status(400).json({success: false, message: "This email is already in use try sign-in"})
        }
        const isNewUsername = await User.isThisUsernameInUse(username);
        if (!isNewUsername) {
            return res.status(400).json({success: false, message: "This username is already in use try sign-in"})
        }
        const newUser = new User({
            username: username.toLowerCase(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            confirmPassword,
            avatar
        });
        await newUser.save();
        res.status(200).json({success: true, message: "User created successfully", userId: newUser._id });
    } catch(error) {
        console.log(error);
        if (error.message.includes("E11000")) {
            res.status(400).json({success: false, message: "This username is already in use try sign-in"})
            return;
        }
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

module.exports = createUser;
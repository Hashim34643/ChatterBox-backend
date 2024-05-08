const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const createUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    avatar: {
        type: String
    },
})

createUserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    }
})

createUserSchema.methods.comparePassword = async function (password) {
    if (!password) {
        throw new Error("Password is missing!");
    };
    try {
        const response = await bcrypt.compare(password, this.password)
        return response;
    } catch (error) {
        return false;
    }
}
// services/userService.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (name, email, password, role) => {
    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();

        return newUser;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw error;
    }
};

const updateUser = async (_id, updatedData) => {
    try {
        return await User.findOneAndUpdate({ _id }, updatedData, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (_id) => {
    try {
        return await User.findOneAndDelete({ _id });
    } catch (error) {
        throw error;
    }
};

// Generar token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    generateToken
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
// 🔧 Helper: Format success response
const sendSuccess = (res, data, message = 'Success') => res.json({ success: true, message, data });
// 🔧 Helper: Format error response
const sendError = (res, status = 500, message = 'An error occurred') => res.status(status).json({ success: false, message });
// 🔧 Helper: Filter allowed fields
const filterUpdates = (body, allowedFields) => Object.entries(body).reduce((acc, [key, value]) => {
    if (allowedFields.includes(key))
        acc[key] = value;
    return acc;
}, {});
// ✅ GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password -__v').lean();
        return sendSuccess(res, users);
    }
    catch (err) {
        console.error('Get all users error:', err);
        return sendError(res, 500, 'Error retrieving users');
    }
};
exports.getAllUsers = getAllUsers;
// ✅ GET user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select('-password -__v').lean();
        if (!user)
            return sendError(res, 404, 'User not found');
        return sendSuccess(res, user);
    }
    catch (err) {
        console.error('Get user by ID error:', err);
        return sendError(res, 500, 'Error retrieving user');
    }
};
exports.getUserById = getUserById;
// ✅ UPDATE user
const updateUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { userId: requesterId, userRole } = req;
        const userToUpdate = await User_1.User.findById(userId);
        if (!userToUpdate)
            return sendError(res, 404, 'User not found');
        const updates = filterUpdates(req.body, ['name', 'email', 'profilePicture']);
        if (Object.keys(updates).length === 0)
            return sendError(res, 400, 'No valid fields to update');
        // Unique email check
        if (updates.email) {
            const existing = await User_1.User.findOne({ email: updates.email, _id: { $ne: userId } });
            if (existing)
                return sendError(res, 400, 'Email already in use');
        }
        const updatedUser = await User_1.User.findByIdAndUpdate(userId, { $set: updates }, {
            new: true,
            runValidators: true,
            select: '-password -__v'
        }).lean();
        return sendSuccess(res, updatedUser, 'User updated');
    }
    catch (err) {
        console.error('Update user error:', err);
        return sendError(res, 500, 'Error updating user');
    }
};
exports.updateUser = updateUser;
// ✅ DELETE user
const deleteUser = async (req, res) => {
    try {
        const deleted = await User_1.User.findByIdAndDelete(req.params.id).lean();
        if (!deleted)
            return sendError(res, 404, 'User not found');
        return sendSuccess(res, null, 'User deleted successfully');
    }
    catch (err) {
        console.error('Delete user error:', err);
        return sendError(res, 500, 'Error deleting user');
    }
};
exports.deleteUser = deleteUser;

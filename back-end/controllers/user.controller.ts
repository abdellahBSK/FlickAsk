import { Request, Response } from 'express';
import { User } from '../models/User';

interface RequestWithUser extends Request {
  userId?: string;
  userRole?: string;
}

// 🔧 Helper: Format success response
const sendSuccess = (res: Response, data: unknown, message = 'Success') =>
  res.json({ success: true, message, data });

// 🔧 Helper: Format error response
const sendError = (res: Response, status = 500, message = 'An error occurred') =>
  res.status(status).json({ success: false, message });

// 🔧 Helper: Filter allowed fields
const filterUpdates = (body: Record<string, any>, allowedFields: string[]) =>
  Object.entries(body).reduce((acc, [key, value]) => {
    if (allowedFields.includes(key)) acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);

// ✅ GET all users
export const getAllUsers = async (req: RequestWithUser, res: Response) => {
  try {
    const users = await User.find().select('-password -__v').lean();
    return sendSuccess(res, users);
  } catch (err) {
    console.error('Get all users error:', err);
    return sendError(res, 500, 'Error retrieving users');
  }
};

// ✅ GET user by ID
export const getUserById = async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v').lean();
    if (!user) return sendError(res, 404, 'User not found');
    return sendSuccess(res, user);
  } catch (err) {
    console.error('Get user by ID error:', err);
    return sendError(res, 500, 'Error retrieving user');
  }
};

// ✅ UPDATE user
export const updateUser = async (req: RequestWithUser, res: Response) => {
  try {
    const { id: userId } = req.params;
    const { userId: requesterId, userRole } = req;

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) return sendError(res, 404, 'User not found');

    const updates = filterUpdates(req.body, ['name', 'email', 'profilePicture']);
    if (Object.keys(updates).length === 0)
      return sendError(res, 400, 'No valid fields to update');

    // Unique email check
    if (updates.email) {
      const existing = await User.findOne({ email: updates.email, _id: { $ne: userId } });
      if (existing) return sendError(res, 400, 'Email already in use');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, {
      new: true,
      runValidators: true,
      select: '-password -__v'
    }).lean();

    return sendSuccess(res, updatedUser, 'User updated');
  } catch (err) {
    console.error('Update user error:', err);
    return sendError(res, 500, 'Error updating user');
  }
};

// ✅ DELETE user
export const deleteUser = async (req: RequestWithUser, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id).lean();

    if (!deleted) return sendError(res, 404, 'User not found');

    return sendSuccess(res, null, 'User deleted successfully');
  } catch (err) {
    console.error('Delete user error:', err);
    return sendError(res, 500, 'Error deleting user');
  }
};

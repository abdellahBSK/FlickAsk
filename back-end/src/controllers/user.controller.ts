import { Request, Response } from 'express';
import { User } from '../models/User';

interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

// Get all users (admin only)
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .lean();

    return res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -__v')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update user
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const requesterId = req.userId;
    const requesterRole = req.userRole;

    // Check if user has permission to update
    if (requesterId !== userId && requesterRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user'
      });
    }

    // Filter allowed update fields
    const allowedUpdates = ['username', 'firstName', 'lastName', 'email', 'profilePicture'];
    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj: Record<string, unknown>, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { 
        new: true,
        runValidators: true,
        select: '-password -__v'
      }
    ).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete user
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      role: { $ne: 'superadmin' } // Prevent deletion of superadmin
    }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or cannot be deleted'
      });
    }

    return res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

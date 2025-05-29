import { Request, Response } from 'express';
import { User } from '../models/User';

interface RequestWithUser extends Request {
  userId?: string;
  userRole?: string;
}

// Get all users (admin only)
export const getAllUsers = async (req: RequestWithUser, res: Response) => {
  try {
    // if (req.userRole !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Access denied: Admin only'
    //   });
    // }

    const users = await User.find().select('-password -__v').lean();

    return res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving users'
    });
  }
};

export const getUserById = async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v').lean();

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

export const updateUser = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.params.id;
    const requesterId = req.userId;
    const requesterRole = req.userRole;

    // if (!requesterId) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Authentication required'
    //   });
    // }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // if (requesterId !== userId && requesterRole !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this user'
    //   });
    // }

    const allowedUpdates = ['name', 'email', 'profilePicture'];
    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj: Record<string, unknown>, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    if (updates.email) {
      const existingUser = await User.findOne({ 
        email: updates.email,
        _id: { $ne: userId }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

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

export const deleteUser = async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      role: { $ne: 'superadmin' }
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


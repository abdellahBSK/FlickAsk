"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const jwt_config_1 = require("../config/jwt.config");
// Register a new user
const registerUser = async (req, res) => {
    try {
        // Validate request body
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body'
            });
        }
        const { name, email, password } = req.body;
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, email, and password are required'
            });
        }
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }
        const newUser = new User_1.User({
            name,
            email,
            password // The password will be hashed by the pre-save middleware
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    }
    catch (err) {
        const error = err;
        console.error('Register error:', {
            name: error?.name || 'Unknown error',
            message: error?.message || 'No error message available',
            stack: error?.stack || 'No stack trace available'
        });
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
// Login user
const loginUser = async (req, res) => {
    try {
        // Validate request body
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body'
            });
        }
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        } // Find user and explicitly include password field
        console.log('Attempting login for email:', email);
        const user = await User_1.User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        console.log('Found user:', user.email);
        // Validate that we have the password field
        if (!user.password) {
            console.error('Password field missing for user:', email);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
        // Log password lengths for debugging (don't log actual passwords)
        console.log('Input password length:', password.length);
        console.log('Stored hashed password length:', user.password.length);
        // Compare password with proper error handling
        try {
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
            console.log('Password comparison result:', isValidPassword);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
        }
        catch (err) {
            const error = err;
            console.error('Password comparison error:', error);
            console.error('Error details:', {
                name: error?.name || 'Unknown error',
                message: error?.message || 'No error message available',
                stack: error?.stack || 'No stack trace available'
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
        // Set up token options using config values
        const accessTokenOptions = {
            expiresIn: jwt_config_1.jwtConfig.expiresIn
        };
        const refreshTokenOptions = {
            expiresIn: jwt_config_1.jwtConfig.refreshExpiresIn
        };
        // Generate access token
        const accessToken = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, jwt_config_1.jwtConfig.secret, accessTokenOptions);
        // Generate refresh token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, jwt_config_1.jwtConfig.refreshSecret, refreshTokenOptions);
        return res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                },
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        });
    }
    catch (err) {
        const error = err;
        console.error('Login error:', {
            name: error?.name || 'Unknown error',
            message: error?.message || 'No error message available',
            stack: error?.stack || 'No stack trace available'
        });
        return res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        // Clear the cookie(s) that hold the token/session
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // set true in prod
            sameSite: 'strict',
            path: '/'
        });
        // If you have another cookie for refresh tokens, clear it too:
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        return res.json({
            success: true,
            message: 'User logged out successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error during logout'
        });
    }
};
exports.logoutUser = logoutUser;

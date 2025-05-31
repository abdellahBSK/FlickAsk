"use strict";
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { User } from '../models/User';
// import dotenv from 'dotenv';
// dotenv.config();
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flickask';
// async function testLogin() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGODB_URI);
//     console.log('Connected to MongoDB');
//     // Create test user
//     const testEmail = 'test@example.com';
//     const testPassword = 'password123';
//     const hashedPassword = await bcrypt.hash(testPassword, 10);
//     // Delete any existing test user
//     await User.deleteOne({ email: testEmail });
//     // Create new test user
//     const user = new User({
//       name: 'Test User',
//       email: testEmail,
//       password: hashedPassword,
//       role: 'user'
//     });
//     await user.save();
//     console.log('Test user created');
//     // Try to find the user
//     const foundUser = await User.findOne({ email: testEmail });
//     console.log('Found user:', foundUser);
//     // Test password comparison
//     if (foundUser) {
//       const isMatch = await bcrypt.compare(testPassword, foundUser.password);
//       console.log('Password match:', isMatch);
//     }
//   } catch (error) {
//     console.error('Test error:', error);
//   } finally {
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   }
// }
// testLogin();

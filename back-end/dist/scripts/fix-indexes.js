"use strict";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flickask';
// async function fixIndexes() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('Connected to MongoDB');
//     const usersCollection = mongoose.connection.collection('users');
//     // Drop the username index
//     await usersCollection.dropIndex('username_1');
//     console.log('Successfully dropped username index');
//     // List remaining indexes
//     const indexes = await usersCollection.indexes();
//     console.log('Current indexes:', indexes);
//   } catch (error) {
//     console.error('Error fixing indexes:', error);
//   } finally {
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   }
// }
// fixIndexes();

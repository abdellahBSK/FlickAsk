"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsers = void 0;
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/askvideoclone';
const testUsers = [
    {
        username: 'taha_dev',
        email: 'taha@example.com',
        password: 'password123', // Updated to meet 6 character minimum
        firstName: 'Taha',
        lastName: 'Developer',
        isActive: true,
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taha'
    },
    {
        username: 'test_user',
        email: 'test@example.com',
        password: 'testuser123', // Updated to meet 6 character minimum
        firstName: 'Test',
        lastName: 'User',
        isActive: true
    },
    {
        username: 'admin_user',
        email: 'admin@example.com',
        password: 'admin123456', // Updated to meet 6 character minimum
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    }
];
exports.testUsers = testUsers;
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('Connected to DB');
        // Clear existing users
        await User_1.User.deleteMany({});
        console.log('Cleared existing users');
        // Create users
        const createdUsers = await Promise.all(testUsers.map(async (userData) => {
            const user = new User_1.User(userData);
            return user.save();
        }));
        console.log(`Created ${createdUsers.length} users:`);
        createdUsers.forEach(user => {
            console.log(`✅ User ${user.username} (${user.email}) created successfully`);
        });
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('Database connection closed');
    }
}
// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
        console.log('Database seeding completed successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Database seeding failed:', error);
        process.exit(1);
    });
}

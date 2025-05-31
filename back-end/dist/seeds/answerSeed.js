"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAnswers = void 0;
exports.seedAnswers = seedAnswers;
const mongoose_1 = __importDefault(require("mongoose"));
const Answer_1 = require("../models/Answer");
const User_1 = require("../models/User");
const Step_1 = require("../models/Step");
const Step_2 = require("../models/Step");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/askvideoclone';
const testAnswers = [
    {
        questionType: Step_2.QuestionType.TEXT,
        answerText: 'This is a test text answer',
        status: 'submitted'
    },
    {
        questionType: Step_2.QuestionType.VIDEO,
        videoUrl: 'https://example.com/video.mp4',
        duration: 120,
        status: 'submitted'
    },
    {
        questionType: Step_2.QuestionType.MULTIPLE_CHOICE,
        selectedOptions: ['Option 1', 'Option 3'],
        status: 'submitted'
    },
    {
        questionType: Step_2.QuestionType.YES_NO,
        answerText: 'yes',
        status: 'submitted'
    }
];
exports.testAnswers = testAnswers;
async function seedAnswers() {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('Connected to DB');
        // Clear existing answers
        await Answer_1.Answer.deleteMany({});
        console.log('Cleared existing answers');
        // Get a user and step for reference
        const user = await User_1.User.findOne({ username: 'taha_dev' });
        if (!user) {
            throw new Error('Required test user not found. Please run userSeed first.');
        } // Create a test step for each answer type
        const steps = await Promise.all(testAnswers.map(async (answer, index) => {
            const stepData = {
                videoAskForm: new mongoose_1.default.Types.ObjectId(), // This would normally reference a real form
                order: index + 1,
                questionText: `Test Question ${index + 1}`,
                questionType: answer.questionType,
            };
            // Add options for multiple choice questions
            if (answer.questionType === Step_2.QuestionType.MULTIPLE_CHOICE) {
                stepData.options = [
                    'Option 1',
                    'Option 2',
                    'Option 3',
                    'Option 4'
                ];
            }
            const step = new Step_1.Step(stepData);
            return step.save();
        }));
        // Create answers linking them to steps and user
        const createdAnswers = await Promise.all(testAnswers.map(async (answerData, index) => {
            const answer = new Answer_1.Answer({
                step: steps[index]._id,
                user: user._id,
                ...answerData,
                metadata: {
                    browser: 'Chrome',
                    platform: 'Windows',
                    ipAddress: '127.0.0.1'
                }
            });
            return answer.save();
        }));
        console.log(`Created ${createdAnswers.length} answers:`);
        createdAnswers.forEach(answer => {
            console.log(`✅ Answer for step ${answer.step} created successfully`);
        });
        return createdAnswers;
    }
    catch (error) {
        console.error('Error seeding answers:', error);
        throw error;
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('Database connection closed');
    }
}
// Run seeding if this file is run directly
if (require.main === module) {
    seedAnswers()
        .then(() => {
        console.log('Answer seeding completed successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Answer seeding failed:', error);
        process.exit(1);
    });
}

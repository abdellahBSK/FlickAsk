import mongoose from 'mongoose';
import { Answer } from '../models/Answer';
import { User } from '../models/User';
import { Step } from '../models/Step';
import { QuestionType } from '../models/Step';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/askvideoclone';

const testAnswers = [
    {
        questionType: QuestionType.TEXT,
        answerText: 'This is a test text answer',
        status: 'submitted'
    },
    {
        questionType: QuestionType.VIDEO,
        videoUrl: 'https://example.com/video.mp4',
        duration: 120,
        status: 'submitted'
    },
    {
        questionType: QuestionType.MULTIPLE_CHOICE,
        selectedOptions: ['Option 1', 'Option 3'],
        status: 'submitted'
    },
    {
        questionType: QuestionType.YES_NO,
        answerText: 'yes',
        status: 'submitted'
    }
];

async function seedAnswers() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to DB');

        // Clear existing answers
        await Answer.deleteMany({});
        console.log('Cleared existing answers');

        // Get a user and step for reference
        const user = await User.findOne({ username: 'taha_dev' });
        if (!user) {
            throw new Error('Required test user not found. Please run userSeed first.');
        }        // Create a test step for each answer type
        const steps = await Promise.all(
            testAnswers.map(async (answer, index) => {
                const stepData: any = {
                    videoAskForm: new mongoose.Types.ObjectId(), // This would normally reference a real form
                    order: index + 1,
                    questionText: `Test Question ${index + 1}`,
                    questionType: answer.questionType,
                };

                // Add options for multiple choice questions
                if (answer.questionType === QuestionType.MULTIPLE_CHOICE) {
                    stepData.options = [
                        'Option 1',
                        'Option 2',
                        'Option 3',
                        'Option 4'
                    ];
                }

                const step = new Step(stepData);
                return step.save();
            })
        );

        // Create answers linking them to steps and user
        const createdAnswers = await Promise.all(
            testAnswers.map(async (answerData, index) => {
                const answer = new Answer({
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
            })
        );

        console.log(`Created ${createdAnswers.length} answers:`);
        createdAnswers.forEach(answer => {
            console.log(`✅ Answer for step ${answer.step} created successfully`);
        });

        return createdAnswers;
    } catch (error) {
        console.error('Error seeding answers:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
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

export { seedAnswers, testAnswers };

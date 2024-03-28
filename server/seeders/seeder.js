
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ashmitharengasamy96:gwJenBY7wv86bDnI@finalproj.l7bz8hb.mongodb.net/FinalProj');

// Function to hash passwords
const hashPasswords = async () => {
    const hashedPassword = await bcrypt.hash('Jman@600113', 10);
    return hashedPassword;
};

// Sample user data
const users = [
    {
        fullName: 'Ash',
        username: 'ash',
        phoneNumber: '1234567890',
        emailID: 'ashmithalaxmi@jmangroup.com',
        department: 'HR',
        password: '',
        role: 'admin'
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Hash passwords
        users[0].password = await hashPasswords();

        // Delete all existing users
        await User.deleteMany();

        // Insert new users
        await User.insertMany(users);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Seed the database
seedDatabase();

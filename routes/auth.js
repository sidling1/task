const express = require('express');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Mock signup
router.post('/signup', async (req, res) => {
    const { name, email } = req.body;
    const token = uuidv4(); // Generate initial token

    try {
        const user = new User({ name, email, token });
        await user.save();
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(500).json({ error: 'Error creating user', details: err.message });
    }
});

// Mock login
router.post('/login', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User authenticated', user });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
});

module.exports = router;

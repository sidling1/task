const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('cron');
const { updateTokens } = require('./utils/updater');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
// makes the body available as the JSON object
// middleware
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);

// Cron Job: Update tokens every hour
const tokenUpdateJob = new cron.CronJob('*/1 * * * *', () => {
    console.log('Running token update job...');
    updateTokens();
});
tokenUpdateJob.start();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

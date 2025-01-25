const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const updateTokens = async () => {
    try {
        const users = await User.find(); // Fetch all users

        for (const user of users) {
            const oldToken = user.token;
            const newToken = uuidv4(); // Generate a new token

            user.token = newToken;
            await user.save();

            // Log the token update
            console.log(`Updated token for user ${user.email}`);
            console.log(`Old Token: ${oldToken}`);
            console.log(`New Token: ${newToken}`);
        }
    } catch (err) {
        console.error('Error updating tokens:', err.message);
    }
};

module.exports = { updateTokens };

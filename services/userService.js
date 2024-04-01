const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

async function registerUser(userData) {
    try {
        const { username, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });

        return { status: 201, message: 'User registered successfully', user };
    } catch (error) {
        console.error('Error registering user:', error);
        return { status: 500, message: 'Internal server error' };
    }
}
async function loginUser(email, password) {
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log(token)
                return { status: 200, message: 'Login successful', user, token };
            } else {
                return { status: 401, message: 'Invalid credentials' };
            }
        } else {
            return { status: 401, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return { status: 500, message: 'Internal server error' };
    }
}

// You can add more service functions as per your requirements

module.exports = { registerUser, loginUser };

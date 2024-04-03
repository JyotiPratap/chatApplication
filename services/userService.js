const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const { Op } = require('sequelize');


async function registerUser(userData) {
    try {
        const { username, email, password } = userData;

        if (!username || !email || !password) {
            throw { message: 'Username, email, and password are required.', status: 400 };
        }
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
        if (existingUser) {
            throw { message: 'Username or email already exists.', status: 409 };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        return { status: 201, message: 'User registered successfully', user };
    } catch (error) {
        console.error('Error registering user:', error);
        return { status: error.status || 500, message: error.message || 'Internal server error' };
    }
}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw { message: 'Invalid credentials', status: 401 };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { message: 'Invalid credentials', status: 401 };
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return { status: 200, message: 'Login successful', user, token };
    } catch (error) {
        console.error('Error logging in user:', error);
        return { status: error.status || 500, message: error.message || 'Internal server error' };
    }
}

module.exports = { registerUser, loginUser };

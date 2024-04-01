// userController.js
const userService = require('../services/userService');
const { validateEmail, validatePassword } = require("../utils/validation");


async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw { status: 400, message: 'Username, email, and password are required.' };
    }
    validateEmail(email);
    validatePassword(password);

    const createUserResponse = await userService.registerUser({ username, email, password });
    res.status(createUserResponse.status).json({
      message: createUserResponse.message,
      user: createUserResponse.user
    });
  } catch (error) {
    console.error('Error in user register:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { status: 400, message: 'email,and password are required.' };
    }

    const loginUserResponse = await userService.loginUser(email, password);
    res.status(loginUserResponse.status).json({
      message: loginUserResponse.message,
      user: loginUserResponse.user,
      token: loginUserResponse.token
    });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { register, login };

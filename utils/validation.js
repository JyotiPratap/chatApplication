const validator = require('email-validator');

// Function to validate email format using email-validator package
function validateEmail(email) {
    if (!validator.validate(email)) {
        throw { status: 400, message: 'Invalid email format.' };
    }
}
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
        throw { status: 400, message: 'Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.' };
    }
}

  
  module.exports = { validateEmail, validatePassword };
  
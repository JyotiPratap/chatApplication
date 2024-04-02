// typing.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

const Typing = sequelize.define('Typing', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isTyping: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Setting default value to false
  },
});

// Add any additional configurations if needed

module.exports = Typing;

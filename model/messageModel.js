const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sender_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  receiver_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Message;

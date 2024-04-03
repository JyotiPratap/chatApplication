const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log // Enable logging
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL database has been established successfully.');
    return sequelize.sync(); // Ensure sync() is called here
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

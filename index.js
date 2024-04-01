const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/route');
const sequelize = require('./config/database');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// User routes ko app ke saath connect karein
app.use('/', route);

// Server ko port par listen karein
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







// const express = require('express');
// const http = require('http');
// const mysql = require('mysql');
// require('dotenv').config(); // .env file ko configure karne ke liye

// // Express app initialize karein
// const app = express();
// const server = http.createServer(app);

// // MySQL database se connect karein
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database as id ' + connection.threadId);
// });

// const PORT = process.env.PORT || 3100;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

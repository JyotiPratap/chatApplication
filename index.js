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
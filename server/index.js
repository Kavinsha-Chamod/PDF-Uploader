const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const auth = require('./routes/auth');
const pdf = require('./routes/pdf');
const { connection } = require('./db');  // Ensure this exists and is correct

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(morgan('combined', { stream: winston.stream.write }));

// Define routes here
app.use('/api/auth', auth);
app.use('/api/pdf', pdf);


app.get('/', (req, res) => {
  res.send({ message: 'API is running...' });
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'request.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

module.exports = app;

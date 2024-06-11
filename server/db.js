const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.DB_LINK);

const connectionResult = mongoose.connection;

connectionResult.on('error', (error) => { 
  console.log('Connection Error:', error); 
});

connectionResult.on('connected', () => {
  console.log('Mongo DB connected Successfully!');
});

module.exports = connectionResult;
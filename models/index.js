const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || localhost:3000);

let Station = require('./station');

module.exports = {
  Station: Station
};

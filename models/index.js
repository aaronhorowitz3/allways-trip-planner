const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/allways_test');

let Station = require('./station');

module.exports = {
  Station: Station
};

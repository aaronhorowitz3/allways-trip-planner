const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/allways_test');

let Station = require('./station');

module.exports = {
  Station: Station
};

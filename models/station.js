let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// album schema
let StationSchema = new Schema({
  name: String,
  abbr: String,
  gtfs_latitude: String,
  gtfs_longitude: String,
  address: String,
  city: String,
  county: String,
  state: String,
  zipcode: String
});

// album model
let Station = mongoose.model('Station', StationSchema);

module.exports = Station;

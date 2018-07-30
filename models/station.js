let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

let Station = mongoose.model('Station', StationSchema);

module.exports = Station;

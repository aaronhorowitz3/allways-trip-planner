var db = require('../models');

// GET /api/station
function index(req, res) {
  // access database and pull out all albums
  db.Station.find({}, function(err, allStations) {
    if(err){res.json(err)}
    res.json(allStations);
  });
};

// CREATE
function create(req, res) {
  var newStationName = req.query.name;
  var newStationAbbrev = req.query.abbrev;
  var newStationLat = req.query.lat;
  var newStationLong = req.query.lng;
  var newStationAddress = req.query.address;
  var newStationCity = req.query.city;
  var newStationCounty = req.query.county;
  var newStationState = req.query.state;
  var newStationZip = req.query.zip;
  db.Station.create({
    name: newStationName,
    abbr: newStationAbbrev,
    gtfs_latitude: newStationLat,
    gtfs_longitude: newStationLong,
    address: newStationAddress,
    city: newStationCity,
    county: newStationCounty,
    state: newStationState,
    zipcode: newStationZip
  }, function(err, station){
    if (err) { return console.log('ERROR', err); }
    console.log("New Station: ", station);
    res.json(station);
  });
};

// SHOW
function show(req, res) {
	var stationId = req.params.station_id;
  db.Station.findById(stationId, (err, station) => {
    res.json(station);
    });
  };

// DESTROY
  function destroy(req, res) {
    db.Station.findByIdAndRemove(req.params.station_id, function(err, deletedStation) {
      if (err) { return console.log('ERROR', err); }
      res.send(200);
    });
  };

// UPDATE
  function update(req, res) {
    db.Station.findById(req.params.station_id, function(err, foundStation) {
      if (err) { return console.log('stationsController.update error', err); }
      foundStation.stationName = req.body.name;
      foundStation.stationAbbrev = req.body.abbr;
      foundStation.stationLat = req.body.gtfs_latitude;
      foundStation.stationLong = req.body.gtfs_longitude;
      foundStation.stationAddress = req.body.address;
      foundStation.stationCity = req.body.city;
      foundStation.stationCounty = req.body.county;
      foundStation.stationState = req.body.state;
      foundStation.stationZip = req.body.zipcode;
      foundStation.save(function(err, savedStation) {
        if (err) { return console.log('couldn\'t update your station, maybe you should think twice before altering a BART station'); }
        res.json(savedStation);
      });
    });
  };

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};

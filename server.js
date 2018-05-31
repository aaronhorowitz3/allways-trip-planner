var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios')

var db = require('./models');
var controllers = require('./controller');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', { root : __dirname });
});

// Creating a JSON with the backend for the frontend to read
app.get('/location', function(req,res){
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.query.lat + "," + req.query.lng + '&radius=1500&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg';
    // console.log(url);
    axios.get(url, {mode: 'cors', headers:{
    'Access-Control-Allow-Origin':'*'
    }
  })
  .then(function(response) {
    console.log(response.data);
    res.json(response.data.results)
  })
  .catch(function(err){
    console.log(err);
    res.json(err)
  })
})


app.get('/travelTime', function(req, res){
// function travelTime(originLat, originLng, destLat, destLng){
  let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + req.query.lat + ',' + req.query.lng + '&destination=' + req.query.destLat + ',' + req.query.destLng + '&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg';
  axios.get(url, {mode: 'cors', dataType: 'json', headers:{
    'Access-Control-Allow-Origin':'*'
    }
  })
  .then(function(response) {
    console.log(response.data);
    res.json(response.data)
  })
  .catch(function(err){
    console.log(err);
    res.json(err)
  })
})

app.get('/destinationPoint', function(req, res){
  let url = 'https://maps.google.com/maps/api/geocode/json?address=San+Mateo,+CA&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'
  axios.get(url, {mode: 'cors', dataType: 'json', headers:{
    'Access-Control-Allow-Origin':'*'
    }
  })
    .then(function(response) {
    console.log(response.data);
    res.json(response.data)
  })
  .catch(function(err){
    console.log(err);
    res.json(err)
  })
})

// app.get('/bartTravel', function(req, res){
  // let url = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' + orig + '&dest=' + dest + '&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y'
// })


app.get('/api/stations', controllers.station.index);

app.listen(process.env.PORT || 3000, function(){
  console.log("A Troy and Aaron Production.")
})

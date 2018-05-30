var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

// Require the models directory in server.js
//var db = require('./models');
// var controllers = require('./controllers');

app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', { root : __dirname });
});

// Creating a JSON with the backend for the frontend to read
app.get('/location', function(req,res){
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.query.lat + "," + req.query.lng + '&radius=1500&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg';
    console.log(url);
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



app.listen(3000, function(){
  console.log("A Troy and Aaron Production.")
})

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.790414399999996,-122.40067540000001&radius=1500&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.5172534,-122.04965449999999&radius=5000000&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg

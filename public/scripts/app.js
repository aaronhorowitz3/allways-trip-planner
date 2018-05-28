// axios.get('/user?ID=12345')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//
// // Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


var bartApiUrl = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=RICH&key=MW9S-E7SL-26DU-VV8V&json=y';


$(document).ready(function() {
  console.log('sanitycheck!');

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 10
  });
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  $.ajax({
    url: bartApiUrl,
    method: 'GET',
    success: function(bart) {
      for(var i = 0; i < bart.root.station.length; i++){
        $('#bartStation').append(bart.root.station[i].name)
      }

    }
  })
})

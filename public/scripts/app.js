let stations = document.getElementById('bartStation');
// let li = document.createElement('li');
// let ul = document.createElement('ul');

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.7749, lng: -122.4194},
  zoom: 10
});
var trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);


navigator.geolocation.getCurrentPosition(function(response){
  var marker = new google.maps.Marker({
    map: map,
    position: {
      lat: parseFloat(response.coords.latitude),
      lng: parseFloat(response.coords.longitude)
    }
  })
  map.setCenter({lat: parseFloat(response.coords.latitude),
    lng: parseFloat(response.coords.longitude)}
  );
})

axios.get('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
.then(function(response) {
  let station = response.data.root.stations.station;
  for(let i = 0; i < station.length; i++) {
    // console.log(station[i].abbr)
      console.log(parseFloat(response.data.root.stations.station[i].gtfs_latitude) + " " + parseFloat(response.data.root.stations.station[i].gtfs_longitude))
    let marker = new google.maps.Marker({
      map: map,
      title: station[i].name,
      position: {
        lat: parseFloat(station[i].gtfs_latitude),
        lng: parseFloat(station[i].gtfs_longitude),
      },
      icon: {
        // railway station by Artdabana@Design from the Noun Project
        url: "../images/railroadBlk.svg",
        scaledSize: {height: 55, width: 55},
      }
    });
  };
})
.catch(function(err){
  console.log(err)
});
console.log("oi!")
let stations = document.getElementById('bartStation');
let stationMenu = document.getElementById('stationList');
// let li = document.createElement('li');
// let ul = document.createElement('ul');


console.log('sanity')

let googleMaps = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg";

let map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.7749, lng: -122.4194},
  zoom: 10
});

let trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);


navigator.geolocation.getCurrentPosition(function(response){
  // console.log(parseFloat(response.coords.latitude) + " " + parseFloat(response.coords.longitude))
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

getBartStations()
// getLocation();

function getBartStations(){
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
          url: "../public/images/railroadBlk.svg",
          scaledSize: {height: 55, width: 55},
        }
      });
      // console.log(station[i].name)
        let node = document.createElement("option");
        let textnode = document.createTextNode(station[i].name)
        node.appendChild(textnode);
        stationMenu.appendChild(node);
    };
  })
  .catch(function(err){
    console.log(err)
  });
}

function nearestBart(urlHere){
  axios.head(urlHere)
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(err){
    console.log(err);
  })
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(response){
    nearestBart('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + parseFloat(response.coords.latitude) + ',' + parseFloat(response.coords.longitude) + '&radius=1500&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg');
  })
}

console.log(nearestBart('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7904035,-122.40076839999999&radius=1500&type=transit_station&keyword=bart&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'))

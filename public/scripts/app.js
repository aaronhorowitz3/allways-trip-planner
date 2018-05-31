// let googleMaps = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg";
console.log("oi!")
let stations = document.getElementById('bartStation');
let stationMenu = document.getElementById('stationList');
// let li = document.createElement('li');
// let ul = document.createElement('ul');
let hailMary = document.getElementById('hailMary')

console.log('sanity')

navigator.geolocation.getCurrentPosition(function(response){
  console.log(parseFloat(response.coords.latitude) + " " + parseFloat(response.coords.longitude))
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

let map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.7749, lng: -122.4194},
  zoom: 10
});

let trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);


displayBartStations()

function displayBartStations(){
  axios.get('/api/stations')
  .then(function(response) {
    // let station = response.data.root.stations.station;
    // console.log(response)
    for(let i = 0; i < response.data.length; i++) {
      // console.log(station[i].abbr)
        // console.log(parseFloat(response.data.root.stations.station[i].gtfs_latitude) + " " + parseFloat(response.data.root.stations.station[i].gtfs_longitude))
      let marker = new google.maps.Marker({
        map: map,
        title: response.data[i].name,
        position: {
          lat: parseFloat(response.data[i].gtfs_latitude),
          lng: parseFloat(response.data[i].gtfs_longitude),
        },
        icon: {
          // railway station by Artdabana@Design from the Noun Project
          url: "images/railroadBlk.svg",
          scaledSize: {height: 55, width: 55},
        }
      });
    };
  })
  .catch(function(err){
    console.log(err)
  });
}


navigator.geolocation.getCurrentPosition(function(response){
  lat = parseFloat(response.coords.latitude)
  lng = parseFloat(response.coords.longitude)
  axios.get ('/location', {
    params: {
      lat: lat,
      lng: lng
    }
  })
  .then(function(response){
    for(let i = 0; i < response.data.length && i < 1; i++) {
      // console.log(response.data[i].name)

      // console.log(lat)
      // console.log(lng)
      let destLat = response.data[i].geometry.location.lat
      let destLng = response.data[i].geometry.location.lng
      // console.log(url);
      let node = document.createElement("option");
      let textnode = document.createTextNode(response.data[i].name)
      node.appendChild(textnode);
      stationMenu.appendChild(node);
      // hailMary.onclick = function(){
      callTravelTime(lat, lng, destLat, destLng);
    }
  })
  .catch(function(err){
    console.log(err)
  })
});

let button = document.getElementById('submit');
let dest = document.getElementById('dest');

submit.onclick = function(e){
  console.log(dest.value);
  e.preventDefault()
  axios.get('/destinationPoint')
  .then(function(response){
    console.log(response.data.results[0].geometry.location.lat)
    console.log(response.data.results[0].geometry.location.lng)
    let latitude = parseFloat(response.data.results[0].geometry.location.lat)
    let longitude = parseFloat(response.data.results[0].geometry.location.lng)
    let marker = new google.maps.Marker({
    map: map,
    // title: response.data.name,
    position: {
      lat: latitude,
      lng: longitude
    },
    icon: {
      url: "images/destination.svg",
      scaledSize: {height: 55, width: 55},
    }
  })
  })
}

function callTravelTime(latit, longit, destLatit, destLongit) {
  axios.get('/travelTime',{
    params: {
    lat: latit,
    lng: longit,
    destLat: destLatit,
    destLng: destLongit
    }
  })
  .then(function(response){
    console.log(response)
    for(let j = 0; j < response.data.routes[0].legs[0].steps.length; j++){
      console.log(response.data.routes[0].legs[0].steps[j].html_instructions + "  " + response.data.routes[0].legs[0].steps[j].distance.text)
      let node = document.createElement("li");
      node.innerHTML = response.data.routes[0].legs[0].steps[j].html_instructions + "  " + response.data.routes[0].legs[0].steps[j].distance.text
      stations.appendChild(node);
    }
  })
}



  // let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + lat + ',' + lng + '&destination=' + response.data[i].geometry.location.lat + ',' + response.data[i].geometry.location.lng + '&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg';
  // console.log(url);
  // // }
//'https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'

// getLocation();
// function report(taco){
//   axios.get('/api/stations')
//   .then(function(response) {
//   for(let i = 0; i < response.data.length; i++){
//       if(taco === response.data[i].name ){
//         console.log(response.data[i].address)
//       }
//     }
//   })
// }

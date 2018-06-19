console.log("oi!")
let stations = document.getElementById('bartStation');
let stationMenu = document.getElementById('stationList');
let stationDest = document.getElementById('stationDest');
let finalDest = document.getElementById('finalDestination');
let hailMary = document.getElementById('hailMary')
let seeDirect = document.getElementById('directionsButton');
let seeFinalDirect = document.getElementById('directionsFinalButton');
let stationSpecifics = document.getElementById('stationSpecs');
let seeSpecifics = document.getElementById('seeSpecs');

seeDirect.onclick = function() {
  stations.classList.toggle('hidden');
};

seeFinalDirect.onclick = function() {
  finalDest.classList.toggle('hidden');
};

seeSpecifics.onclick = function() {
  stationSpecifics.classList.toggle('hidden');
}

navigator.geolocation.getCurrentPosition(function(response){
  console.log(parseFloat(response.coords.latitude) + " " + parseFloat(response.coords.longitude))
  let lat = parseFloat(response.coords.latitude);
  let lng = parseFloat(response.coords.longitude)
  var marker = new google.maps.Marker({
    map: map,
    position: {
      lat: lat,
      lng: lng
    }
  })
  map.setCenter({lat: parseFloat(response.coords.latitude),
    lng: parseFloat(response.coords.longitude)}
  );
  displayBartStations(lat, lng)
})

let map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.7749, lng: -122.4194},
  zoom: 10
});

let trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);



function displayBartStations(lateral, longital){
  axios.get('/api/stations')
  .then(function(response) {
    console.log(response.data.length)
    let info = [];
    for(let i = 0; i < response.data.length/2; i++) {
      let latis = parseFloat(response.data[i].gtfs_latitude);
      let longis = parseFloat(response.data[i].gtfs_longitude);
      let bartStation = response.data[i].name
      // console.log(response.data[i]);
      // console.log(station[i].abbr)
        // console.log(parseFloat(response.data.root.stations.station[i].gtfs_latitude) + " " + parseFloat(response.data.root.stations.station[i].gtfs_longitude))
      let marker = new google.maps.Marker({
        map: map,
        title: bartStation,
        position: {
          lat: latis,
          lng: longis,
        },
        icon: {
          // railway station by Artdabana@Design from the Noun Project
          url: "images/railroadBlk.svg",
          scaledSize: {height: 55, width: 55},
        }
      });
      // Finding Nearest Bart using distance formula
        let dlat = parseFloat(latis - lateral);
        let dlng = parseFloat(longis - longital);
        let distance = Math.sqrt(Math.pow(dlat ,2) + Math.pow(dlng, 2));
        info[i] = {bartStation: bartStation, lat: latis, lng: longis, distance: distance};
      };
      info.sort(findNearestBart);
      for(let j = 0; j < 1; j++) {
        console.log(info[j].bartStation);
        let node = document.createElement("option");
        let textnode = document.createTextNode(info[j].bartStation)
        node.appendChild(textnode);
        stationMenu.appendChild(node);
        callTravelTime(lateral, longital, info[j].lat, info[j].lng, stations);
      }
      // selectedVal(){
    })
  .catch(function(err){
    console.log(err)
  });
}

// function selectedVal(nearestBart){
//   let k = stationMenu.selectedIndex;
//   console.log(nearestBart[k].name);
// }

let submit = document.getElementById('submit');
let dest = document.getElementById('dest');

submit.onclick = function(e){
  e.preventDefault()

  if(dest.value === ""){
    alert("Please enter a destination!")
  }else{
    let cityState = dest.value
    // cityState = cityState.replace(/\s/gi, '+');

    console.log(cityState)
    axios.get('/destinationPoint', {
      params: {
        dest: cityState
      }
    })
    .then(function(response){
      console.log(response.data.results[0].geometry.location.lat)
      console.log(response.data.results[0].geometry.location.lng)
      let latitude = parseFloat(response.data.results[0].geometry.location.lat)
      let longitude = parseFloat(response.data.results[0].geometry.location.lng)
      let destInfo = [];
      let marker = new google.maps.Marker({
      map: map,
      title: response.data.name,
      position: {
        lat: latitude,
        lng: longitude
        },
      icon: {
        url: "images/destination.svg",
        scaledSize: {height: 70, width: 70},
        }
      });
      axios.get('/api/stations')
      .then(function(response){
        // console.log(response.data)
        for(let i = 0; i < response.data.length/2; i++) {
          let latis = parseFloat(response.data[i].gtfs_latitude);
          let longis = parseFloat(response.data[i].gtfs_longitude);
          let bartStation = response.data[i].name
          let dlat = parseFloat(latis - latitude);
          let dlng = parseFloat(longis - longitude);
          let distance = Math.sqrt(Math.pow(dlat ,2) + Math.pow(dlng, 2));
          destInfo[i] = {bartStation: bartStation, lat: latis, lng: longis, distance: distance};
        };
        destInfo.sort(findNearestBart);
        for(let j = 0; j < 1; j++) {
          console.log(destInfo[j].bartStation);
          let node = document.createElement("option");
          let textnode = document.createTextNode(destInfo[j].bartStation)
          node.appendChild(textnode);
          stationDest.appendChild(node);
          callTravelTime(destInfo[j].lat, destInfo[j].lng, latitude, longitude, finalDestination);
        }
        // console.log(destInfo)
      })
    })
    .catch(function(err){
      console.log(err)
    })
  }
}

function callTravelTime(latit, longit, destLatit, destLongit, param) {
  axios.get('/travelTime', {
    params: {
      lat: latit,
      lng: longit,
      destLat: destLatit,
      destLng: destLongit
    }
  })
  .then(function(response){
    // console.log(response)
    for(let j = 0; j < response.data.routes[0].legs[0].steps.length; j++){
      console.log(response.data.routes[0].legs[0].steps[j].html_instructions + "  " + response.data.routes[0].legs[0].steps[j].distance.text)
      // console.log(response.data.routes[0].legs[0]);
      let node = document.createElement("li");
      node.innerHTML = response.data.routes[0].legs[0].steps[j].html_instructions + "  " + response.data.routes[0].legs[0].steps[j].distance.text
      param.appendChild(node);
    }
  })
}
function findNearestBart(a, b) {
  let firstStation = a.distance;
  let secondStation = b.distance;
  let compare = 0;
  if(firstStation > secondStation){
    compare = 1;
  } else if(firstStation < secondStation){
    compare = -1;
  }
  return compare;
}

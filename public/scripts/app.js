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
      callTravelTime(lat, lng, destLat, destLng, stations);
    }
  })
  .catch(function(err){
    console.log(err)
  })
});

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
      axios.get('/location', {
        params: {
          lat: latitude,
          lng: longitude
        }
      })
      .then(function(response){
        for(let i = 0; i < response.data.length && i < 1; i++) {
          console.log(response)
          console.log(response.data[i].name)
          let destLat = response.data[i].geometry.location.lat
          let destLng = response.data[i].geometry.location.lng
          console.log(response.data[i].geometry.location.lat)
          let node = document.createElement("option");
          let textnode = document.createTextNode(response.data[i].name)
          node.appendChild(textnode);
          stationDest.appendChild(node);
          callTravelTime(destLat, destLng, latitude, longitude, finalDestination);
        }
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
      let node = document.createElement("li");
      node.innerHTML = response.data.routes[0].legs[0].steps[j].html_instructions + "  " + response.data.routes[0].legs[0].steps[j].distance.text
      param.appendChild(node);
    }
  })
}

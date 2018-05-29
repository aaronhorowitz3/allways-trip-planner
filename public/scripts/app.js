let url = https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y

axios.get(url)
.then(function(response) {
  console.log(response.root.stations.station)
});
.catch(function(err){
  console.log(err)
});

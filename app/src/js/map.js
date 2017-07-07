
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('gmap'), {
    center: {lat: 45, lng: 5.5 },
    zoom: 8
  });
}
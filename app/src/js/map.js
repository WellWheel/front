var infos = {
    start: undefined,
    end: undefined
}

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 7,
      center: {lat: 45, lng: 5.5 },
    });
    directionsDisplay.setMap(map);


    var onChangeHandlerSearch = function() {
      calculateOriginForSearchAndDisplay(directionsService, directionsDisplay);
    };

    var searchBoxStart = new google.maps.places.SearchBox(document.getElementById('pac-input-start'));
    var searchBoxEnd = new google.maps.places.SearchBox(document.getElementById('pac-input-end'));

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input-start'));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input-end'));

    google.maps.event.addListener(searchBoxStart, 'places_changed', function() {
        searchBoxStart.set('map', null);

        var places = searchBoxStart.getPlaces();

        infos.start = places[0].formatted_address;

        if (typeof infos.end === 'undefined')
            infos.end = places[0].formatted_address;


        onChangeHandlerSearch();
    });


    google.maps.event.addListener(searchBoxEnd, 'places_changed', function() {
        searchBoxEnd.set('map', null);

        var places = searchBoxEnd.getPlaces();

        infos.end = places[0].formatted_address;

        if (typeof infos.start === 'undefined')
            infos.start = places[0].formatted_address;


        onChangeHandlerSearch();
    });
}

function calculateOriginForSearchAndDisplay(directionsService, directionsDisplay) {
    directionsService.route({
      origin: infos.start,
      destination: infos.end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

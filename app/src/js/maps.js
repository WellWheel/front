var GoogleMapsLoader = require('google-maps'); // only for common js environments

GoogleMapsLoader.load(function(google) {
	new google.maps.Map(el, options);
});

GoogleMapsLoader.KEY = 'AIzaSyDkkDlT-oya3OL9Y4XZl_BTsgGWHbAD5Ok ';

GoogleMapsLoader.CLIENT = 'yourclientkey';
GoogleMapsLoader.VERSION = '3.14';

GoogleMapsLoader.LIBRARIES = ['direction'];
GoogleMapsLoader.LANGUAGE = 'fr';

GoogleMapsLoader.REGION = 'GB';

GoogleMapsLoader.release(function() {
	console.log('No google maps api around');
});

GoogleMapsLoader.onLoad(function(google) {
	console.log('I just loaded google maps api');
});
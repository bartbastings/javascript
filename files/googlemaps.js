// variables
var map,
	latlong,
	bound,
	marker,
	image = '/site/img/pointer.png';
// functions
function init() {
	'use strict';
	var isDraggable = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) ? true : false),
		mapElement = document.getElementById("map"),
		position,
		markers,
		btns = document.getElementsByClassName('js-btn-map');
	
	if (mapElement.hasAttribute("data-position")) {
		position = mapElement.getAttribute("data-position").split(",");
		// set dataPosition one location
		latlong = new google.maps.LatLng(parseFloat(position[0]), parseFloat(position[1]));
	} else if (mapElement.hasAttribute("data-markers")) {
		markers = mapElement.getAttribute("data-markers").split("|");
		// set multiple locations
		position = markers[0].split(",");
		latlong = new google.maps.LatLng(parseFloat(position[0]), parseFloat(position[1]));
	} else {
		latlong = new google.maps.LatLng(52.3474, 5.17995);
	}
	// set custom marker see: RWTA
	if (mapElement.hasAttribute("data-image")) {
		image = mapElement.getAttribute("data-image") + 'pointer.png';
	}
	var mapOptions = {
		zoom: 15,
		center: latlong,
		scrollwheel: false,
		disableDefaultUI: true,
		draggable: isDraggable
		/*styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]*/
	};

	map = new google.maps.Map(mapElement, mapOptions);
	if (position.length > 0) {
		
		marker = new google.maps.Marker({
			position: latlong,
			map: map,
			icon: image,
			animation: google.maps.Animation.DROP
		});

	} else if (markers.length > 0) {

		bound = new google.maps.LatLngBounds();
		Array.prototype.forEach.call(markers, function (marker) {
			position = marker.split(",");
			latlong = new google.maps.LatLng(parseFloat(position[0]), parseFloat(position[1]));
			bound.extend(latlong);
			marker = new google.maps.Marker({
				position: latlong,
				map: map,
				icon: image,
				animation: google.maps.Animation.DROP
			});
		});
		map.panTo(bound.getCenter());
	}
	// btn click event map pan to location see: FaberExposize
	if (btns.length > 0) {
		Array.prototype.forEach.call(btns, function (btn) {
			google.maps.event.addDomListener(btn, 'click', function (event) {
				var data = event.currentTarget.getAttribute("data-position").split(","),
					latLng = new google.maps.LatLng(parseFloat(data[0]), parseFloat(data[1]));
				
				marker.setPosition(latLng);
				map.panTo(latLng);
				latlong = latLng;
			});
		});
	}
}
// anonymous functions
var mapResize = function () {
	'use strict';
	if (document.getElementById('map')) {
		google.maps.event.trigger(map, "resize");
		map.panTo(bound.getCenter());
	}
};
var mapCenter = function () {
	'use strict';
	map.setCenter(latlong);
};

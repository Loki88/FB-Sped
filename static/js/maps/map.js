function initialize() {

	document.getElementById('map-canvas').style.background = 'none';


 	var fbSpedLatLng = new google.maps.LatLng(42.682656, 13.740698);

 	var styleArray = [
		{
		    featureType: "all",
		    stylers: [
		      { saturation: -80 }
		    ]
		},{
		    featureType: "road.arterial",
		    elementType: "geometry",
		    stylers: [
		      { hue: "#00ffee" },
		      { saturation: 50 }
		    ]
		},{
		    featureType: "poi.business",
		    elementType: "labels",
		    stylers: [
		      { visibility: "off" }
		    ]
		}
	];

	var mapOptions = {
		center: fbSpedLatLng,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	map.setOptions({styles: styleArray});
	var marker = new google.maps.Marker({
		title: 'FB Sped S.r.l. - Uffici',
		map: map,
                position: fbSpedLatLng,
	});
	marker.setVisible(true);
        map.setCenter(marker.getPosition());
}

function toggleBounce() {

	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
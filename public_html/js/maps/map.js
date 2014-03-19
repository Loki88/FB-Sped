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

	var contentString = '<div id="content" class="infoWindow">'+
		'<div class="header">'+
                '<h4 class="title">Uffici FB Sped</h4>'+
                '</div>'+
		'<p>Via V. Pilotti c\\o Centro Commerciale Gran Sasso, Teramo (TE) 64100</p>'+
		'</div>';
	//FARE IN MODO CHE LA INFOWINDOW RISPONDA ALL'HOVER SUL MARKER E SI POSIZIONI SOPRA AL PUNTATORE DEL MOUSE

	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	map.setOptions({styles: styleArray});

//	var infowindow = new google.maps.InfoWindow({
//	    content: contentString,
//	    position: fbSpedLatLng,
//	    maxWidth: '300px',
//	    disableAutoPan: true,
//	});
//	infowindow.open(map);

	var marker = new google.maps.Marker({
		title: 'FB Sped S.r.l. - Uffici',
		map: map,
                position: fbSpedLatLng,
	});
	marker.setVisible(true);
//        marker.open(map);
        map.setCenter(marker.getPosition());
//	google.maps.event.addListener(infowindow, 'click', function() {
//	    map.setZoom(26);
//	    map.setCenter(infowindow.getPosition());
//	});
//
//	google.maps.event.addListener(infowindow, 'closeclick', function() {
//		marker.setPosition(fbSpedLatLng);
//		marker.setVisible(true);
//	});

	google.maps.event.addListener(marker, 'click', function(){
		this.setVisible(false);
		infowindow.open(this.getMap());
	});
}

function toggleBounce() {

	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}


google.maps.event.addDomListener(window, 'load', initialize);
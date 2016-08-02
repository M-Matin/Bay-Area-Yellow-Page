var locations = [{
    title: 'DVC',
    location: {
        lat: 37.971213,
        lng: -122.068966
    }
}, {
    title: 'Starbucks',
    location: {
        lat: 37.947979,
        lng: -122.060796
    }
}, {
    title: 'Down Town',
    location: {
        lat: 37.944937,
        lng: -122.058814
    }
}, {
    title: 'Gym',
    location: {
        lat: 37.949252,
        lng: -122.061667
    }
}, {
    title: 'Petco',
    location: {
        lat: 37.927421,
        lng: -122.071645
    }
}, {
    title: 'FoodMax',
    location: {
        lat: 37.927421,
        lng: -122.071645
    }
}];

var map;


// Create a new blank array for all the listing markers.
var markers = [];
var locLat = locations[1].location.lat;
var locLng = locations[1].location.lng;
var clientID = "UIINSNNIDSR4AR3G0ONZPXP14JGBLPOUWTTCMJO4YPRMVAET";
var clientSec = "2352X0JFKIBOWJFHALP5JID24KZUZUNC5PV0M2NVX22343TT" ;
//Accessing to third party API called FourSquare and searching with latitude and longitude dynamicaly
//Query String bulding
var fourSquare = "https://api.foursquare.com/v2/venues/search?ll=" +
    locLat + ',' + locLng + "&limit=1" +
    '&client_id='+clientID + '&client_secret='+clientSec + '&v=20130815&query=' +
    locations[1].title;


//Sending Request
 $.ajax({
    url: fourSquare,
    dataType: 'json',
    type: 'get',
    cashe: false,
    success: function(data) {
        //Parsing response
        $(data.response.venues).each(function(index,value){
             results = data.response.venues[0];
             name = results.name;
             street = results.location.formattedAddress[0];
     	     city = results.location.formattedAddress[1];
      	     phone = results.contact.phone;


        })//Json Expression
    }
});



var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();



function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.977978,
            lng: -122.031073
        },
        zoom: 13,
        mapTypeControl: false
    });


    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
} //end initMap



// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent(
            '<div><h1>' + name + "</h1></div>" +
        '<div>' + street + "</div>" +
        '<div>' + city + "</div>" +
        '<div>'+ phone +"</div>");
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker(null);
        });
    }
} //end populateInfoWindow

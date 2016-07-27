var map;

     // Create a new blank array for all the listing markers.
     var markers = [];

     function initMap() {
       // Constructor creates a new map - only center and zoom are required.
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 37.977978, lng: -122.031073},
         zoom: 13,
         mapTypeControl: false
       });

       // These are the real estate listings that will be shown to the user.
       // Normally we'd have these in a database instead.
       var locations = [
         {title: 'DVC', location: {lat: 37.971213, lng: -122.068966}},
         {title: 'Starbucks', location: {lat: 37.947979, lng: -122.060796}},
         {title: 'Down Town', location: {lat: 37.944937,  lng: -122.058814}},
         {title: 'Gym', location: {lat: 37.949252, lng: -122.061667 }},
         {title: 'Petco', location: {lat: 37.927421, lng: -122.071645}},
         {title: 'FoodMax', location: {lat:  37.927421, lng:-122.071645}}
          ];
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
                }

                // This function populates the infowindow when the marker is clicked. We'll only allow
                // one infowindow which will open at the marker that is clicked, and populate based
                // on that markers position.
                function populateInfoWindow(marker, infowindow) {
                  // Check to make sure the infowindow is not already opened on this marker.
                  if (infowindow.marker != marker) {
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + '<h1>'+marker.title+'</h1>'+
                    ' <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' + '</div>');
                    infowindow.open(map, marker);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infowindow.addListener('closeclick',function(){
                      infowindow.setMarker(null);
                    });
                  }
                }

L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXMtbGFuZS1jb25rbGluZyIsImEiOiJ3RHBOc1BZIn0.edCFqVis7qgHPRgdq0WYsA';
var map = L.mapbox.map('map', 'james-lane-conkling.5630f970', {
  center: [41, -95.0],
  zoom: 5,
  minZoom: 5,
  maxBounds: [[20.00,-140.00],[62.00,-54.00]]
  })

// an awkward hack so users don't have to define styles in the geojson file
// see simple style spec: https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
var stops = omnivore.geojson('stops.geojson')
    .on('ready', function(){
        var latLngs = [];

        this.eachLayer(function(marker){
            var p = marker.toGeoJSON().properties;

            if(p.status === 'visited'){
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-color': '#323232'
                }));
            }else{
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-color': '#AA6035'
                }));
            }

            // set popup
            var content = "<h3 class='title'>" + p.title + "</h3>" +
                "<div class='desc'>" + p.text + "</div>" +
                "<div>" +
                    // "<div class='photo'><span class='arrow'></span>click</div>" +
                    "<img src=" + p.photo + " />" +
                "</div>";
            marker.bindPopup(content);

            // collect latlon pairs
            latLngs.push(marker.getLatLng());
        });

        var route = L.polyline(latLngs,{
            color: '#323232',
            weight: 1.4
        }).addTo(map);
    })
    .addTo(map);

// var mail = omnivore.geojson('mail.geojson')
//     .on('ready', function(){
//       this.eachLayer(function(marker){
//         var p = marker.toGeoJSON().properties;

//         marker.setIcon(L.mapbox.marker.icon({
//                     'marker-color': '#ab161a',
//                     'marker-size': 'small'
//                 }));
//         // set popup
//         var content = "<div class='message'>" + p.message + "</div>";
//         marker.bindPopup(content);

//       });
//     })
//     .addTo(map);

